const fs = require('fs')
const { app } = require('electron')
const SettingsLoader = require('./src/tools/SettingsLoader')
const Home = require('./src/windows/Main/index')
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const root = {
  app: app,
  env: 'production',
  devTools: false,
  settingsPath: {
    group: pkg.group,
    app: pkg.name,
    file: 'settings.json',
    appPath: '',
    filePath: ''
  },
  settings: {
    version: pkg.version
  },
  mainWindow: null,
  db: {
    sqlite: null
  }
}

SettingsLoader.initSettings($root)

app.whenReady().then(() => {
  root.app = app
  Home.create(root)
})

app.on('second-instance', () => {
  /* 监听是否有第二个实例
  if (root.mainWindow) {
    root.mainWindow.win.restore()
    root.mainWindow.win.show()
  }
  */
})
