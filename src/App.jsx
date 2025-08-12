import React, { useEffect, useMemo, useRef, useState } from 'react'
import Grid from './components/Grid.jsx'
import Palette from './components/Palette.jsx'
import Toolbar from './components/Toolbar.jsx'
import { exportPng } from './lib/exportPng.js'
import { PRESET_PALETTES, randomPreset } from './lib/palettes.js'

const LOCAL_KEY = 'pixelart:state:v1'

export default function App() {
  const [size, setSize] = useState(16) // 8, 16, 32
  const [palette, setPalette] = useState(() => randomPreset().colors)
  const [currentColor, setCurrentColor] = useState(() => palette[0])
  const [grid, setGrid] = useState(() => Array(16 * 16).fill(null))

  // Undo/redo stacks
  const [history, setHistory] = useState([])
  const [future, setFuture] = useState([])

  // Track painting state for drag paint
  const isPaintingRef = useRef(false)

  // When size changes, reset grid
  useEffect(() => {
    setGrid(Array(size * size).fill(null))
    setHistory([])
    setFuture([])
  }, [size])

  // Keep currentColor valid if palette changes
  useEffect(() => {
    if (!palette.includes(currentColor)) {
      setCurrentColor(palette[0] || '#000000')
    }
  }, [palette])

  // Global mouseup to end painting when cursor leaves grid
  useEffect(() => {
    const up = () => (isPaintingRef.current = false)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseleave', up)
    return () => {
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseleave', up)
    }
  }, [])

  // Helpers
  const clamp = (i) => Math.max(0, Math.min(grid.length - 1, i))

  const pushHistory = (prev) => {
    setHistory((h) => {
      const next = [...h, prev]
      // limit to last 60 states
      if (next.length > 60) next.shift()
      return next
    })
    setFuture([]) // clear redo stack on new edits
  }

  const paintAt = (index, color) => {
    setGrid((prev) => {
      if (prev[index] === color) return prev
      const snapshot = [...prev]
      snapshot[index] = color
      return snapshot
    })
  }

  const handleCellDown = (index, e) => {
    e.preventDefault()
    // Save previous state for undo
    pushHistory(grid)
    isPaintingRef.current = true

    if (e.altKey) {
      // Eyedropper: pick color from cell
      const picked = grid[index]
      if (picked) setCurrentColor(picked)
      isPaintingRef.current = false
      return
    }

    if (e.button === 2) {
      // Right-click erase
      paintAt(index, null)
      return
    }

    // Left-click paint
    paintAt(index, currentColor)
  }

  const handleCellEnter = (index, e) => {
    if (!isPaintingRef.current) return
    if (e.buttons === 2) {
      // Erase while dragging right button
      paintAt(index, null)
    } else {
      paintAt(index, currentColor)
    }
  }

  const handleMouseUpAnywhere = () => {
    isPaintingRef.current = false
  }

  const clearGrid = () => {
    pushHistory(grid)
    setGrid(Array(size * size).fill(null))
  }

  const undo = () => {
    setHistory((h) => {
      if (h.length === 0) return h
      const prev = h[h.length - 1]
      setFuture((f) => [...f, grid])
      setGrid(prev)
      return h.slice(0, -1)
    })
  }

  const redo = () => {
    setFuture((f) => {
      if (f.length === 0) return f
      const next = f[f.length - 1]
      setHistory((h) => [...h, grid])
      setGrid(next)
      return f.slice(0, -1)
    })
  }

  const saveLocal = () => {
    const payload = { size, palette, currentColor, grid }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(payload))
  }

  const loadLocal = () => {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return
    try {
      const data = JSON.parse(raw)
      if (Array.isArray(data.grid) && typeof data.size === 'number') {
        setSize(data.size)
        setPalette(data.palette || palette)
        setCurrentColor(data.currentColor || currentColor)
        setGrid(data.grid)
        setHistory([])
        setFuture([])
      }
    } catch (_) {}
  }

  const randomizePalette = () => {
    const preset = randomPreset()
    setPalette(preset.colors)
    setCurrentColor(preset.colors[0])
  }

  const handleExport = async () => {
    await exportPng({
      grid,
      size,
      pixelSize: 24, // export scale (pixels per cell)
      background: 'transparent', // or '#ffffff'
      fileName: `pixelart_${size}x${size}.png`,
    })
  }

  const uiState = useMemo(
    () => ({
      size,
      setSize,
      palette,
      setPalette,
      currentColor,
      setCurrentColor,
      canUndo: history.length > 0,
      canRedo: future.length > 0,
    }),
    [size, palette, currentColor, history.length, future.length]
  )

  return (
    <div className="app" onMouseUp={handleMouseUpAnywhere}>
      <header className="header">
        <div className="brand">
          <span className="logo">◼︎</span>
          <h1>Pixel Art Creator</h1>
        </div>
        <span className="hint">Tip: Alt+Click to pick a color • Right-click to erase</span>
      </header>

      <main className="container">
        <section className="panel">
          <Toolbar
            size={size}
            setSize={setSize}
            onClear={clearGrid}
            onUndo={undo}
            onRedo={redo}
            onSave={saveLocal}
            onLoad={loadLocal}
            onExport={handleExport}
            canUndo={history.length > 0}
            canRedo={future.length > 0}
            onRandomPalette={randomizePalette}
          />

          <Palette
            palette={palette}
            setPalette={setPalette}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
          />
        </section>

        <section className="stage">
          <Grid
            size={size}
            grid={grid}
            onCellDown={handleCellDown}
            onCellEnter={handleCellEnter}
          />
        </section>
      </main>

      <footer className="footer">
        <div className="presets">
          <span>Presets:</span>
          {PRESET_PALETTES.map((p) => (
            <button
              key={p.name}
              title={p.name}
              className="preset"
              onClick={() => {
                setPalette(p.colors)
                setCurrentColor(p.colors[0])
              }}
            >
              <span className="preset-name">{p.name}</span>
              <span className="preset-swatches">
                {p.colors.slice(0, 5).map((c, i) => (
                  <i key={i} style={{ background: c }} />
                ))}
              </span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  )
}
