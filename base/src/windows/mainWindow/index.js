const { BrowserWindow, ipcMain, screen } = require('electron')
const p = require('path')

const mainWindow = {
    root: null,

    bindIpc: function () {
        /* 最大化 */
        ipcMain.on('max-app', () => {
            if (this.root.mainWindow.isMaximized()) {
                this.root.mainWindow.restore();
            } else {
                this.root.mainWindow.maximize();
            }
        })
        /* 最小化 */
        ipcMain.on('min-app', () => {
            if (this.root.mainWindow) {
                this.root.mainWindow.minimize()
            }
        })
        /* 关闭程序 */
        ipcMain.on('close-app', () => {
            if (this.root.mainWindow) {
                this.root.mainWindow.close()
            }
        })
        /* 移动窗口 */
        ipcMain.on("window-move-open", (events, canMoving) => {
            if (canMoving) {
                // 读取原位置
                const winPosition = this.root.mainWindow.getPosition();
                winStartPosition = { x: winPosition[0], y: winPosition[1] };
                mouseStartPosition = screen.getCursorScreenPoint();
                // 清除
                if (movingInterval) {
                    clearInterval(movingInterval);
                }
                // 新开
                movingInterval = setInterval(() => {
                    // 实时更新位置
                    const cursorPosition = screen.getCursorScreenPoint();
                    const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
                    const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
                    this.root.mainWindow.setPosition(x, y, true);
                }, 10);
            } else {
                clearInterval(movingInterval);
                movingInterval = null;
            }
        });
    },

    loadPage: function () {
        if (this.root.config.env === 'production') {
            // 生产环境
            this.root.mainWindow.loadFile(p.join(process.cwd(), './web/index.html'))
        } else {
            // 开发环境  
            this.root.mainWindow.loadURL('http://127.0.0.1:9999')
        }
    },

    create: function (root, opts = {}) {
        this.root = root
        this.root.mainWindow = new BrowserWindow({
            webPreferences: {
                preload: p.join(__dirname, './preload.js'),
                devTools: true
            }
        })
        this.bindIpc()
        this.loadPage()
        this.root.mainWindow.maximize();
    }
}

module.exports = mainWindow