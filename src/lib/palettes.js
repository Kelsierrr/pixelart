export const PRESET_PALETTES = [
    { name: 'Candy Pop', colors: ['#ff3b7b', '#ff9f1a', '#ffd31a', '#19e68c', '#19b5fe'] },
    { name: 'Forest Mist', colors: ['#0b3d2e', '#2a6041', '#7aa884', '#cfe8d5', '#f1fff6'] },
    { name: 'Retro Sun', colors: ['#2e294e', '#541388', '#f1e9da', '#ffd400', '#d90368'] },
    { name: 'Game Boy', colors: ['#0f380f', '#306230', '#8bac0f', '#9bbc0f', '#e0f8cf'] },
    { name: 'Ocean Drive', colors: ['#0f1021', '#2b3a67', '#6e7dab', '#b5b9d9', '#f1f2f6'] },
    { name: 'Heatwave', colors: ['#ff6b6b', '#ff8e72', '#ffd93d', '#ffee93', '#fffad7'] },
  ]
  
  export function randomPreset() {
    return PRESET_PALETTES[Math.floor(Math.random() * PRESET_PALETTES.length)]
  }
  