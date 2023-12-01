/**
 * 窗体通用事件
 */
module.exports = {
    /**
     * 最大化
     * @param {*} win 
     */
    maxWin: (win) => {
        if (win) {
            win.maximize();
        }
    },
    /**
     * 切换最大化
     * @param {*} win 
     */
    toggleMaxWin: (win) => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    },
    /**
     * 最小化
     * @param {*} win 
     */
    minWin: (win) => {
        if (win) {
            win.minimize()
        }
    },
    /**
     * 关闭
     * @param {*} win 
     */
    closeWin: (win) => {
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
    moveWin: (win, canMoving, model = {}) => {
        if (win) {
            if (canMoving) {
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
