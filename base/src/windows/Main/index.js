const p = require('path')
const fs = require('fs')
const url = require('url')
const { BrowserWindow, ipcMain } = require('electron')
const Services = require('../../services/index')
const PageAction = require('./PageAction')

module.exports = {
  name: 'Home',
  $root: null,
  win: null,
  model: {
    movingInterval: null,
    prevClickTime: null
  },
  subWin: {},
  methods: {
    onHandleServices: async function (event, params) {
      const finalParams = {
        ...params,
        $current: this,
        $root: this.$root
      }
      return await Services.handle(finalParams)
    }
  },
  /**
   * 绑定ipc事件
   */
  loadIpc: function () {
    ipcMain.handle('service', this.methods.onHandleServices.bind(this))
    this.win.on('closed', () => {
      ipcMain.removeHandler('service')
    })
  },
  /**
   * 加载页面
   */
  loadPage: function () {
    if (this.$root.env === 'production') {
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
   * @param {*} $root
   * @param {*} opts
   */
  create: function ($root, opts = {}) {
    this.$root = $root
    this.win = new BrowserWindow({
      show: false,
      titleBarStyle: 'hidden',
      frame: false,
      transparent: true,
      webPreferences: {
        preload: p.join(__dirname, './preload.js'),
        devTools: !!this.$root.devTools
      }
    })
    this.$root.mainWindow = this
    this.loadIpc()
    this.loadPage()
  }
}
