export default function GridCell({ x, y, size, char, lineColor, gridStyle, guideColor, fontSize, fontFamily }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={size} height={size} fill="white" stroke={lineColor} strokeWidth="0.2" />
      {gridStyle !== 'none' && (
        <>
          <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke={lineColor} strokeWidth="0.1" strokeDasharray="0.5,0.5" />
          <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke={lineColor} strokeWidth="0.1" strokeDasharray="0.5,0.5" />
          {gridStyle === 'star' && (
            <>
              <line x1={0} y1={0} x2={size} y2={size} stroke={lineColor} strokeWidth="0.1" strokeDasharray="0.5,0.5" />
              <line x1={size} y1={0} x2={0} y2={size} stroke={lineColor} strokeWidth="0.1" strokeDasharray="0.5,0.5" />
            </>
          )}
        </>
      )}
      {char && (
        <text x={size / 2} y={size / 2} dominantBaseline="central" textAnchor="middle" fill={guideColor} fontSize={(size * fontSize) / 100} fontFamily={fontFamily} style={{ pointerEvents: 'none', userSelect: 'none' }}>
          {char}
        </text>
      )}
    </g>
  );
}
