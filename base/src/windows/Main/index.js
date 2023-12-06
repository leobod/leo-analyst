const p = require('path')
const { BrowserWindow, ipcMain, screen } = require('electron')
const WinIPC = require('../../ipc/WinIPC')
const PageIpc = require('./ipc/index')


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
            console.log(params)
            const { type, payload } = params
            switch (type) {
                case 'MIN_WIN': {
                    WinIPC.min(this.win)
                    break
                }
                case 'MAX_WIN': {
                    WinIPC.max(this.win)
                    break
                }
                case 'TOGGLE_MAX_WIN': {
                    WinIPC.toggleMax(this.win)
                    break
                }
                case 'CLOSE_WIN': {
                    WinIPC.close(this.win)
                    break
                }
                case 'MOVE_WIN': {
                    WinIPC.move(this.win, !!payload, this.model)
                    break
                }
            }
            return null
        },
        onHandlePageAction: async function (event, params) {
            return await PageIpc.action(params)
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