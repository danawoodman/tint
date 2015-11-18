import { Menu } from 'electron'

export default (app) => {

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

  menu.popup(app.window)
}
