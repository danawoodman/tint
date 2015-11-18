const fs = require('fs')
const path = require('path')
const electron = require('electron')
const statusbar = require('./status-bar')

const app = electron.app

app.on('ready', () => {

  console.log('Application is ready!')

  // Hide the dock.
  if (app.dock) {
    app.dock.hide()
  }

  // Load the status bar.
  const bar = statusbar(app)

  console.log('Created status bar:')
  console.log(JSON.stringify(bar, null, '  '))
})
