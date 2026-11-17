# Project memory

## Product intent & audience

- System presents **risk indicators** and **similarity indicators** to users.
- Interface language: **Portuguese (pt-BR)**.

## Brand personality & voice

- Direct, informative tone; uses tables and concrete examples to communicate numeric ranges clearly.

## Visual design & UX direction

- Numeric indicators displayed with classification labels and/or percentage formatting.
- Tables used for structured range/classification data.
- Potential UI pattern: percent display from raw 0–1 values (e.g., `0.84` → `84%`).

## Decisions, constraints & rationale

- **Risk indicator** score range: `0–100`, classified as:
  - `0–49` → Baixo
  - `50–74` → Médio
  - `75–100` → Alto
- **Similarity indicator**: raw `0–1` value converted to percentage for display; **no classification bands** (low/medium/high) — shown only as numeric percent.

## Open questions & assumptions

- Similarity may need classification bands in the future; currently undefined.
- Unknown whether indicator ranges are configurable or hardcoded.