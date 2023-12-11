const { app } = require('electron')
const Home = require('./src/windows/Main/index')

const root = {
  app: null,
  config: {
    env: 'production',
    devTools: false
  },
  mainWindow: null,
  db: {
    sqlite: null
  }
}

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
