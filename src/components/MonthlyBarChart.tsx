interface MonthlyPoint {
  mes: string;
  base: number;
  recebidos: number;
}

const WIDTH = 720;
const HEIGHT = 280;
const PADDING = { top: 16, right: 16, bottom: 40, left: 40 };

export function MonthlyBarChart({ data }: { data: MonthlyPoint[] }) {
  const innerWidth = WIDTH - PADDING.left - PADDING.right;
  const innerHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const maxValue = Math.max(...data.map((point) => Math.max(point.base, point.recebidos)), 1);
  const groupWidth = innerWidth / data.length;
  const barWidth = Math.min(18, groupWidth * 0.32);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round(maxValue * ratio));

  const yFor = (value: number) => PADDING.top + innerHeight - (value / maxValue) * innerHeight;

  return (
    <svg
      className="bar-chart"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Processos que entraram na base por mês"
    >
      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={PADDING.left}
            x2={WIDTH - PADDING.right}
            y1={yFor(tick)}
            y2={yFor(tick)}
            stroke="#eef0f4"
            strokeWidth={1}
          />
          <text x={PADDING.left - 8} y={yFor(tick) + 4} textAnchor="end" fontSize={11} fill="#5f6674">
            {tick}
          </text>
        </g>
      ))}

      {data.map((point, index) => {
        const groupX = PADDING.left + index * groupWidth + groupWidth / 2;
        const baseHeight = (point.base / maxValue) * innerHeight;
        const recebidosHeight = (point.recebidos / maxValue) * innerHeight;
        return (
          <g key={point.mes}>
            <rect
              className="bar"
              x={groupX - barWidth - 2}
              y={PADDING.top + innerHeight - baseHeight}
              width={barWidth}
              height={baseHeight}
              rx={4}
              fill="#1e3a66"
            >
              <title>{`${point.mes}: ${point.base} processos na base`}</title>
            </rect>
            <rect
              className="bar"
              x={groupX + 2}
              y={PADDING.top + innerHeight - recebidosHeight}
              width={barWidth}
              height={recebidosHeight}
              rx={4}
              fill="#c9a227"
            >
              <title>{`${point.mes}: ${point.recebidos} recebidos pela aplicação`}</title>
            </rect>
            <text x={groupX} y={HEIGHT - 14} textAnchor="middle" fontSize={12} fill="#5f6674">
              {point.mes}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
