import * as pdfjs from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { createWorker } from 'tesseract.js';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const CNJ_PATTERN = /(\d{7})-?(\d{2})\.?(\d{4})\.?(\d)\.?(\d{2})\.?(\d{4})/;
const COVER_RENDER_SCALE = 2;

export function findProcessNumber(text: string): string | null {
  const match = CNJ_PATTERN.exec(text);
  if (!match) return null;
  const [, sequencia, digito, ano, segmento, tribunal, origem] = match;
  return `${sequencia}-${digito}.${ano}.${segmento}.${tribunal}.${origem}`;
}

async function readTextLayer(page: pdfjs.PDFPageProxy): Promise<string> {
  const content = await page.getTextContent();
  return content.items.map((item) => ('str' in item ? item.str : '')).join(' ');
}

async function recognizeScannedCover(page: pdfjs.PDFPageProxy): Promise<string> {
  const viewport = page.getViewport({ scale: COVER_RENDER_SCALE });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const context = canvas.getContext('2d');
  if (!context) return '';

  await page.render({ canvasContext: context, viewport }).promise;

  const worker = await createWorker('por');
  try {
    const { data } = await worker.recognize(canvas);
    return data.text;
  } finally {
    await worker.terminate();
  }
}

/**
 * Reads the process number from the cover (first page) of a PDF.
 * Uses the text layer when present and falls back to OCR for scanned pages.
 * Returns null when no number can be found.
 */
export async function extractCoverProcessNumber(file: File): Promise<string | null> {
  const data = await file.arrayBuffer();
  const pdfDocument = await pdfjs.getDocument({ data }).promise;
  const page = await pdfDocument.getPage(1);

  const fromText = findProcessNumber(await readTextLayer(page));
  if (fromText) return fromText;

  return findProcessNumber(await recognizeScannedCover(page));
}
