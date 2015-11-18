const menubar = require('menubar')

const menu = menubar({
  dir: process.cwd(),
  height: 298,
  icon: 'tint.png',
  preloadWindow: true,
  width: 220,
})


menu.on('ready', () => {
  console.log('App is ready!')
  // menu.tray
  // menu.app
})
