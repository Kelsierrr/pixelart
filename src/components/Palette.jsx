import React, { useState } from 'react'

export default function Palette({ palette, setPalette, currentColor, setCurrentColor }) {
  const [newColor, setNewColor] = useState('#000000')

  const addColor = () => {
    if (!palette.includes(newColor)) {
      setPalette([...palette, newColor])
      setCurrentColor(newColor)
    }
  }

  const removeColor = (c) => {
    // Don’t remove if it’s the last color
    if (palette.length <= 1) return
    const next = palette.filter((x) => x !== c)
    setPalette(next)
    if (currentColor === c) setCurrentColor(next[0])
  }

  return (
    <div className="palette">
      <div className="palette-header">
        <h2>Palette</h2>
        <div className="palette-create">
          <input
            type="color"
            aria-label="Pick color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <button className="btn primary" onClick={addColor}>Add</button>
        </div>
      </div>

      <div className="swatches">
        {palette.map((c) => (
          <div key={c} className={`swatch ${currentColor === c ? 'active' : ''}`}>
            <button
              className="swatch-color"
              style={{ background: c }}
              title={c}
              onClick={() => setCurrentColor(c)}
            />
            <button
              className="swatch-remove"
              title="Remove color"
              onClick={() => removeColor(c)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
