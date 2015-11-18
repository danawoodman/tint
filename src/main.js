const fs = require('fs')
const path = require('path')
const electron = require('electron')
const statusbar = require('./status-bar')

const app = electron.app
const globalShortcut = electron.globalShortcut

// TODO: Make this configurable
const GLOBAL_SHORTCUT = 'Shift+CmdOrCtrl+c'

app.on('ready', () => {

  console.log('Application is ready!')

  // Hide the dock.
  if (app.dock) {
    app.dock.hide()
  }

  // Load the status bar.
  const bar = statusbar(app)

  // Check whether a shortcut is registered.
  console.log('The global shortcut is set?', globalShortcut.isRegistered(GLOBAL_SHORTCUT))

  // Register the global shortcut
  const registrationSuccess = globalShortcut.register(
    GLOBAL_SHORTCUT,
    () => bar.toggleWindow(null)
  )

  if (!registrationSuccess) {
    console.log('Shortcut registration failed')
  }

  app.on('will-quit', () => {

    // Unregister a shortcut.
    globalShortcut.unregister(GLOBAL_SHORTCUT)

    // Unregister all shortcuts.
    globalShortcut.unregisterAll()

    // Close the statusbar cleanly.
    bar.quit()
  })
})

