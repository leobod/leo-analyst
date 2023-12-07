const p = require('path')
const { BrowserWindow, ipcMain } = require('electron')
const $actions = require('./actions/index')


module.exports = {
    name: 'Home',
    root: null,
    win: null,
    model: {
        movingInterval: null,
        prevClickTime: null
    },
    methods: {
        onHandleWinAction: function (event, params) {
            return $actions.win(params, this.win, this.model)
        },
        onHandlePageAction: async function (event, params) {
            return await $actions.page(params)
        }
    },
    /**
     * 绑定ipc事件
     */
    loadIpc: function () {
        ipcMain.handle('win:action', this.methods.onHandleWinAction.bind(this))
        ipcMain.handle('page:action', this.methods.onHandlePageAction.bind(this))
        this.win.on('closed', () => {
            ipcMain.removeHandler('win:action')
            ipcMain.removeHandler('page:action')
        })
    },
    /**
     * 加载页面
     */
    loadPage: function () {
        if (this.root.config.env === 'production') {
            // 生产环境
            this.win.loadFile(p.join(process.cwd(), './web/index.html'))
        } else {
            // 开发环境
            this.win.loadURL('http://127.0.0.1:9999')
        }
    },
    /**
     * 构建窗体
     * @param {*} root 
     * @param {*} opts 
     */
    create: function (root, opts = {}) {
        this.root = root
        this.win = new BrowserWindow({
            titleBarStyle: 'hidden',
            frame: false,
            transparent: true,
            webPreferences: {
                preload: p.join(__dirname, './preload.js'),
                devTools: true
            }
        })
        this.root.views.push({ name: this.name, value: this.win })
        this.loadIpc()
        this.loadPage()
    }
}