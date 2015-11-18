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

function create() {

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

function show(window, bounds) {

  console.log('Showing window at bounds:')
  console.log(JSON.stringify(bounds, null, '  '))

  const positioner = new Positioner(window)

  const position = positioner.calculate('trayCenter', bounds)

  const x = position.x
  const y = position.y

  console.log(`Setting window position to: ${x}x ${y}y`)

  window.setPosition(x, y)

  window.show()
}

function hide(window) {
  window.hide()
}

function toggleWindow(window, bounds) {

  console.log(`Tray clicked and window is ${window.isVisible() ? 'visible' : 'hidden'}`)

  if (window && window.isVisible()) {
    return hide(window)
  }

  show(window, bounds)
}

function showContextMenu(app, window) {

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

  menu.popup(window)
}

module.exports = (app) => {
  const statusbar = new events.EventEmitter()

  const tray = new Tray(ICON)
  const window = create()

  tray
      .on('click', (e, bounds) => toggleWindow(window, bounds))
      .on('double-click', (e, bounds) => toggleWindow(window, bounds))
      .on('right-click', (e, bounds) => showContextMenu(app, window))

  //statusbar.tray = tray
  //statusbar.window = window

  return statusbar
}
