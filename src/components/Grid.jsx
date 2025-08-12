import React from 'react'

export default function Grid({ size, grid, onCellDown, onCellEnter }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {grid.map((color, idx) => (
        <button
          key={idx}
          className="cell"
          title={`Cell ${idx}`}
          style={{ background: color ?? 'transparent' }}
          onMouseDown={(e) => onCellDown(idx, e)}
          onMouseEnter={(e) => onCellEnter(idx, e)}
        />
      ))}
    </div>
  )
}
