import React from 'react'

export default function Toolbar({
  size, setSize,
  onClear, onUndo, onRedo, onSave, onLoad, onExport,
  canUndo, canRedo, onRandomPalette
}) {
  return (
    <div className="toolbar">
      <div className="group">
        <label className="label">Canvas</label>
        <div className="segmented">
          {[8, 16, 32].map((s) => (
            <button
              key={s}
              className={`seg ${size === s ? 'active' : ''}`}
              onClick={() => setSize(s)}
            >
              {s}×{s}
            </button>
          ))}
        </div>
      </div>

      <div className="group">
        <label className="label">Actions</label>
        <div className="actions">
          <button className="btn" onClick={onClear}>Clear</button>
          <button className="btn" disabled={!canUndo} onClick={onUndo}>Undo</button>
          <button className="btn" disabled={!canRedo} onClick={onRedo}>Redo</button>
          <button className="btn" onClick={onRandomPalette}>Random palette</button>
        </div>
      </div>

      <div className="group">
        <label className="label">Share</label>
        <div className="actions">
          <button className="btn" onClick={onSave}>Save</button>
          <button className="btn" onClick={onLoad}>Load</button>
          <button className="btn primary" onClick={onExport}>Export PNG</button>
        </div>
      </div>
    </div>
  )
}
