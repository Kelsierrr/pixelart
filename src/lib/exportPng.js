export async function exportPng({ grid, size, pixelSize = 20, background = 'transparent', fileName = 'pixelart.png' }) {
    const canvas = document.createElement('canvas')
    canvas.width = size * pixelSize
    canvas.height = size * pixelSize
    const ctx = canvas.getContext('2d')
  
    if (background && background !== 'transparent') {
      ctx.fillStyle = background
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
      // leave transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  
    grid.forEach((color, idx) => {
      if (!color) return
      const x = idx % size
      const y = Math.floor(idx / size)
      ctx.fillStyle = color
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    })
  
    const link = document.createElement('a')
    link.download = fileName
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
  