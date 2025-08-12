Pixel Art Creator
A tiny, aesthetic pixel-art editor built with React and plain CSS.
Paint on an 8×8, 16×16, or 32×32 grid, tweak your palette, undo/redo, save to localStorage, and export a crisp PNG.

Features
Interactive canvas: click/drag to paint, right-click to erase, Alt+Click to eyedrop.

Canvas sizes: 8×8, 16×16, 32×32.

Custom palettes: add/remove colors, quick preset palettes, random palette.

History: undo/redo (up to 60 steps).

Persistence: save/load to localStorage.

Export: download transparent PNG at any scale.

Tech Stack
Frontend: React (Vite), JavaScript

Styling: Plain CSS (no frameworks)

State: Local component state + simple history stacks

Export: HTML Canvas API

Screenshots

![Editor]docs/pixelartSS.jpeg

Getting Started
Prerequisites
Node.js 18+ and npm
Check versions:

bash
Copy
Edit
node -v
npm -v
Install & Run (Local)
bash
Copy
Edit
# clone or open the folder
npm install
npm run dev
Vite will print a local URL (e.g., http://localhost:5173).

Build (Production)
bash
Copy
Edit
npm run build
The production bundle is generated in dist/.

Project Structure
bash
Copy
Edit
pixelart/
  index.html
  package.json
  vite.config.js
  /src
    App.jsx
    main.jsx
    styles.css
    /components
      Grid.jsx
      Palette.jsx
      Toolbar.jsx
    /lib
      exportPng.js
      palettes.js
Key Files
src/components/Grid.jsx – the interactive pixel grid (DOM buttons).

src/components/Palette.jsx – manage/select colors.

src/components/Toolbar.jsx – canvas size, undo/redo, save/load, export.

src/lib/exportPng.js – draws your grid to a hidden <canvas> and triggers a PNG download.

src/lib/palettes.js – preset palettes + randomizer.

Usage Tips
Paint: left-click (drag to draw).

Erase: right-click (or right-drag).

Eyedrop: hold Alt + click a colored cell.

Undo/Redo: toolbar buttons.

Save/Load: stores JSON to localStorage under pixelart:state:v1.

Export PNG: transparent PNG with perfect pixel edges.

Configuration
Default grid size: src/App.jsx → const [size, setSize] = useState(16).

Export scale: src/lib/exportPng.js → pixelSize.

Palettes: edit/add presets in src/lib/palettes.js.

History depth: App.jsx (keeps last 60 states).

Accessibility
Cells are buttons (keyboard-focusable).

Title/tooltip per cell.

Consider adding keyboard painting in a future iteration (see Roadmap).

Engineering Notes
State model: grid is a flat array of length size*size; each entry is null or a hex color.

History: two stacks (history, future) to support undo/redo.

Export: converts grid to canvas rectangles, optional background, downloads via toDataURL.

Persistence: single localStorage object { size, palette, currentColor, grid }.

Roadmap
Shareable URLs (serialize grid to query string)

Keyboard painting (arrow keys + space)

Simple server gallery (MERN add-on)

PNG import → grid sampler

Scripts
bash
Copy
Edit
npm run dev     # start Vite dev server
npm run build   # production build to /dist
npm run preview # preview the production build
License
MIT © You