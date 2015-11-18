const fs = require('fs')
const path = require('path')
const extend = require('extend')
const events = require('events')
const electron = require('electron')
const Positioner = require('electron-positioner')

const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const Tray = electron.Tray

const HEIGHT = 298
const WIDTH = 220
const ROOT = __dirname
const INDEX = path.join(ROOT, 'index.html')
const ICON = path.join(ROOT, 'images', 'tint.png')

if (!fs.existsSync(ICON)) {
  throw Error(`Icon file "${ICON}" does not exist!`)
}

if (!fs.existsSync(INDEX)) {
  throw Error(`index.html file "${INDEX}" does not exist!`)
}

function createWindow() {

  console.log(`Creating window sized ${WIDTH}x${HEIGHT} pixels.`)

  const window = new BrowserWindow({
    frame: false,
    height: HEIGHT,
    show: false,
    //transparent: true,
    width: WIDTH,
  })

  window.setVisibleOnAllWorkspaces(true)

  console.log('Loading URL to HTML file:', INDEX)

  window.loadURL('file://' + INDEX)

  return window
}

function createMenu(app) {

  console.log('Opening the context menu...')

  const menu = Menu.buildFromTemplate([
    {
      label: 'Quit Tint',
      click() {
        console.log('Quitting application...')
        app.quit()
      },
      // about, help, etc...
    },
  ])

  return menu
}

module.exports = (app) => {

  const statusbar = {}
  statusbar.app = app
  statusbar.tray = new Tray(ICON)
  statusbar.window = createWindow()
  statusbar.menu = createMenu(statusbar.app)

  statusbar.tray.setToolTip('Tint color picker')

  statusbar.show = (bounds) => {

    // Load passed in bounds or fallback to cached bounds.
    statusbar.bounds = bounds || statusbar.bounds

    console.log('Showing window at bounds:')
    console.log(JSON.stringify(statusbar.bounds, null, '  '))

    const positioner = new Positioner(statusbar.window)

    const position = positioner.calculate('trayCenter', statusbar.bounds)

    const x = position.x || 0
    const y = position.y || 0

    console.log(`Setting window position to: ${x} x by ${y} y`)

    statusbar.window.setPosition(x, y)

    statusbar.window.show()
  }

  statusbar.hide = () => {
    statusbar.window.hide()
  }

  statusbar.quit = () => {
    statusbar.tray.destroy()
    statusbar.window.close()
    statusbar.app.quit()
  }

  statusbar.toggleWindow = (bounds) => {

    console.log(`Tray clicked and window is ${statusbar.window.isVisible() ? 'visible' : 'hidden'}`)

    if (statusbar.window && statusbar.window.isVisible()) {
      return statusbar.hide()
    }

    statusbar.show(bounds)
  }

  statusbar.app.on('browser-window-blur', (event, win) => statusbar.hide(win))

  statusbar.tray
      .on('click', (e, bounds) => statusbar.toggleWindow(bounds))
      .on('double-click', (e, bounds) => statusbar.toggleWindow(bounds))
      .on('right-click', (e, bounds) => statusbar.menu.popup(statusbar.window))

  return statusbar
}
