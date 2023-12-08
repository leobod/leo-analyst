/**
渲染器进程到主进程（单向）
ipcMain.on
ipcRenderer.send

渲染器进程到主进程（双向）
ipcMain.handle
ipcRenderer.invoke
 */

const { screen } = require('electron')

/**
 * 窗体通用事件
 */
module.exports = {
  /**
   * 最小化
   * @param {*} win
   */
  MIN_WIN: (win) => {
    if (win) {
      win.minimize()
    }
  },
  /**
   * 最大化
   * @param {*} win
   */
  MAX_WIN: (win) => {
    if (win) {
      win.maximize()
    }
  },
  IS_MAX_WIN: (win) => {
    return win.isMaximized()
  },
  /**
   * 切换最大化
   * @param {*} win
   */
  TOGGLE_MAX_WIN: (win) => {
    if (win.isMaximized()) {
      win.unmaximize()
      // win.restore();
    } else {
      win.maximize()
    }
  },
  /**
   * 关闭
   * @param {*} win
   */
  CLOSE_WIN: (win) => {
    if (win) {
      win.close()
    }
  },
  /**
   * 窗口移动
   * @param {*} win
   * @param {*} payload
   * @param {*} model
   */
  MOVE_WIN: (win, payload, model = {}) => {
    const { canMoving } = payload
    if (win) {
      if (canMoving) {
        // 读取原位置
        const winPosition = win.getPosition()
        winStartPosition = { x: winPosition[0], y: winPosition[1] }
        mouseStartPosition = screen.getCursorScreenPoint()
        // 清除
        if (model.movingInterval) {
          clearInterval(model.movingInterval)
        }
        // 新开
        model.movingInterval = setInterval(() => {
          // 实时更新位置
          const cursorPosition = screen.getCursorScreenPoint()
          const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x
          const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y
          win.setPosition(x, y, true)
        }, 10)
      } else {
        clearInterval(model.movingInterval)
        model.movingInterval = null
      }
    }
  }
}
