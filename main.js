const electron = require('electron')
const menubar = require('menubar')
const Menu = electron.Menu

const menu = menubar({
  dir: process.cwd(),
  height: 298,
  icon: 'tint.png',
  preloadWindow: true,
  width: 220,
})


menu.on('ready', () => {
  console.log('App is ready!')

  menu.tray.on('right-click', () => {
    console.log('open context menu')
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit Tint',
        click() {
          console.log('Quitting application...')
          menu.app.quit()
        },
        // about, help, etc...
      },
    ])
    contextMenu.popup(menu.app.window)
  })
})
