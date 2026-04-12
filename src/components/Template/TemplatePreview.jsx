import { useMemo } from 'react';
import GridCell from '../shared/GridCell';
import { PAPER_DIMS, MARGINS } from '../../util/hanzi';

export default function TemplatePreview({ data }) {
  const layout = useMemo(() => {
    const dim = PAPER_DIMS[data.paperSize];
    const cellSize = (dim.w - MARGINS.left - MARGINS.right) / data.columns;
    const rowHeight = cellSize + data.rowGap;
    const numRows = Math.floor((dim.h - MARGINS.top - MARGINS.bottom) / rowHeight);
    return { dim, cellSize, rowHeight, numRows };
  }, [data.paperSize, data.columns, data.rowGap]);

  const getChar = (row, col) => {
    if (!data.text) return '';
    const rawLines = data.text.split('\n');
    const lastIdx = rawLines.findLastIndex((l) => l.trim() !== '');
    const lines = lastIdx === -1 ? [] : rawLines.slice(0, lastIdx + 1);
    const lineIndex = data.insertGapRows ? (row % 2 !== 0 ? -1 : row / 2) : row;
    if (lineIndex === -1 || lineIndex >= lines.length) return '';
    const line = lines[lineIndex];
    return data.repeatText ? line[col % line.length] : line[col] || '';
  };

  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 w-full">
      <div className="w-full max-w-[850px] bg-white shadow-2xl shadow-slate-200/50 rounded-lg overflow-hidden border border-slate-100 print:shadow-none print:border-none ring-1 ring-slate-100">
        <svg viewBox={`0 0 ${layout.dim.w} ${layout.dim.h}`} className="w-full h-auto block">
          {Array.from({ length: layout.numRows }).map((_, r) => (
            <g key={r}>
              {Array.from({ length: data.columns }).map((_, c) => (
                <GridCell
                  key={`${r}-${c}`}
                  x={MARGINS.left + c * layout.cellSize}
                  y={MARGINS.top + r * layout.rowHeight}
                  size={layout.cellSize}
                  char={getChar(r, c)}
                  lineColor={data.lineColor}
                  gridStyle={data.gridStyle}
                  guideColor={data.guideColor}
                  fontSize={data.fontSize}
                  fontFamily={data.fontFamily}
                />
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
