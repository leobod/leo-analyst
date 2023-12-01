const p = require('path')
const { BrowserWindow, ipcMain, screen } = require('electron')
const winEvents = require('../../utils/winEvents')


module.exports = {
    name: 'Home',
    root: null,
    win: null,
    model: {
        movingInterval: null
    },
    methods: {
        onHandleMinWin: function () {
            winEvents.minWin(this.win)
        },
        onHandleCloseWin: function () {
            winEvents.closeWin(this.win)
        },
        onHandleMoveWin: function (events, canMoving) {
            winEvents.moveWin(this.win, canMoving, this.model)
        },
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
            webPreferences: {
                preload: p.join(__dirname, './preload.js'),
                devTools: true
            }
        })
        this.root.views.push({ name: this.name, value: this.win })
        this.loadIpc()
        this.loadPage()
    },
    /**
     * 绑定ipc事件
     */
    loadIpc: function () {
        ipcMain.on('min-app', this.methods.onHandleMinWin.bind(this)) /* 最小化 */
        ipcMain.on('close-app', this.methods.onHandleCloseWin.bind(this)) /* 关闭程序 */
        ipcMain.on("window-move-open", this.methods.onHandleMoveWin.bind(this)) /* 移动窗口 */
        this.win.on('closed', () => {
            ipcMain.off('min-app', this.methods.onHandleMinWin.bind(this)) /* 最小化 */
            ipcMain.off('close-app', this.methods.onHandleCloseWin.bind(this)) /* 关闭程序 */
            ipcMain.off("window-move-open", this.methods.onHandleMoveWin.bind(this)) /* 移动窗口 */
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
    }
}