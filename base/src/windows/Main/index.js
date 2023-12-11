const p = require('path')
const url = require('url')
const { BrowserWindow, ipcMain } = require('electron')
const CommonAction = require('../../actions/index')
const PageAction = require('./PageAction')

module.exports = {
  name: 'Home',
  root: null,
  win: null,
  model: {
    movingInterval: null,
    prevClickTime: null
  },
  subWin: {},
  methods: {
    onHandleWinAction: function (event, params) {
      return CommonAction.win(this.win, params, this.model)
    },
    onHandleFileAction: async function (event, params) {
      return await CommonAction.file(params)
    },
    onHandlePageAction: async function (event, params) {
      return await PageAction.page(params)
    }
  },
  /**
   * 绑定ipc事件
   */
  loadIpc: function () {
    ipcMain.handle('win:action', this.methods.onHandleWinAction.bind(this))
    ipcMain.handle('file:action', this.methods.onHandleFileAction.bind(this))
    ipcMain.handle('page:action', this.methods.onHandlePageAction.bind(this))
    this.win.on('closed', () => {
      ipcMain.removeHandler('win:action')
      ipcMain.removeHandler('file:action')
      ipcMain.removeHandler('page:action')
    })
  },
  /**
   * 加载页面
   */
  loadPage: function () {
    if (this.root.config.env === 'production') {
      // 生产环境
      this.win.loadURL(
        url.format({
          pathname: p.join(process.cwd(), './assets/web/index.html'),
          protocol: 'file:',
          slashes: true
        })
      )
      // this.win.loadFile(p.join(process.cwd(), './web/index.html'))
    } else {
      // 开发环境
      this.win.loadURL('http://127.0.0.1:9999')
    }
    this.win.on('ready-to-show', () => {
      this.win.show()
      this.win.maximize()
    })
  },
  /**
   * 构建窗体
   * @param {*} root
   * @param {*} opts
   */
  create: function (root, opts = {}) {
    this.root = root
    this.win = new BrowserWindow({
      show: false,
      titleBarStyle: 'hidden',
      frame: false,
      transparent: true,
      webPreferences: {
        preload: p.join(__dirname, './preload.js'),
        devTools: true
      }
    })
    this.root.mainWindow = this
    this.loadIpc()
    this.loadPage()
  }
}
