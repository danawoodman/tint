const path = require('path')
const menubar = require('menubar')
const contextMenu = require('./context-menu')

const menu = menubar({
  dir: __dirname,
  height: 298,
  icon: path.join(__dirname, 'tint.png'),
  preloadWindow: true,
  width: 220,
})

menu.on('ready', () => {
  console.log('App is ready!')

  menu.tray.on('right-click', () => contextMenu(menu.app))
})
