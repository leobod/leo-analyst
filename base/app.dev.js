const fs = require('fs')
const { app } = require('electron')
const SettingsLoader = require('./src/services/SettingsLoader')
const Home = require('./src/windows/Main/index')
const {
  default: installExtension,
  VUEJS_DEVTOOLS
} = require('electron-devtools-installer')
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const $root = {
  app: app,
  env: 'development',
  devTools: true,
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

SettingsLoader.InitSettings({}, null, $root)

app.whenReady().then(() => {
  if ($root.env === 'development') {
    installExtension(VUEJS_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))
  }
  Home.create($root)
})
