/**
渲染器进程到主进程（单向）
ipcMain.on
ipcRenderer.send

渲染器进程到主进程（双向）
ipcMain.handle
ipcRenderer.invoke
 */

/**
 * 窗体通用事件
 */
module.exports = {
    /**
     * 最大化
     * @param {*} win 
     */
    max: (win) => {
        if (win) {
            win.maximize();
        }
    },
    /**
     * 切换最大化
     * @param {*} win 
     */
    toggleMax: (win) => {
        console.log(win.isMaximized())
        if (win.isMaximized()) {
            win.unmaximize();
            // win.restore();
        } else {
            win.maximize();
        }
    },
    /**
     * 最小化
     * @param {*} win 
     */
    min: (win) => {
        if (win) {
            win.minimize()
        }
    },
    /**
     * 关闭
     * @param {*} win 
     */
    close: (win) => {
        if (win) {
            win.close()
        }
    },
    /**
     * 窗口移动
     * @param {*} win 
     * @param {*} canMoving 
     * @param {*} model 
     */
    move: (win, canMoving, model = {}) => {
        if (win) {
            if (canMoving) {
                if (model.prevClickTime) {
                    const current = new Date().getTime()
                    if (current - model.prevClickTime > 500) {
                        console.log(this)
                        this.toggleMax(win)
                    }
                }
                model.prevClickTime = new Date().getTime()
                // 读取原位置
                const winPosition = win.getPosition();
                winStartPosition = { x: winPosition[0], y: winPosition[1] };
                mouseStartPosition = screen.getCursorScreenPoint();
                // 清除
                if (model.movingInterval) {
                    clearInterval(model.movingInterval);
                }
                // 新开
                model.movingInterval = setInterval(() => {
                    // 实时更新位置
                    const cursorPosition = screen.getCursorScreenPoint();
                    const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
                    const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
                    win.setPosition(x, y, true);
                }, 10);
            } else {
                clearInterval(model.movingInterval);
                model.movingInterval = null;
            }
        }
    }
}
