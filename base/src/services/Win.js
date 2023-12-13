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
 * 最小化
 * @param {*} win
 */
const Min = (payload, $current = null, $root = null) => {
  const win = $current.win
  if (win) {
    win.minimize()
  } else {
    throw new Error('win not found')
  }
}
/**
 * 最大化
 * @param {*} win
 */
const Max = (payload, $current = null, $root = null) => {
  const win = $current.win
  if (win) {
    win.maximize()
  } else {
    throw new Error('win not found')
  }
}
const IsMax = (payload, $current = null, $root = null) => {
  const win = $current.win
  if (win) {
    return win.isMaximized()
  } else {
    throw new Error('win not found')
  }
}
/**
 * 切换最大化
 * @param {*} win
 */
const ToggleMax = (payload, $current = null, $root = null) => {
  const win = $current.win
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize()
      // win.restore();
    } else {
      win.maximize()
    }
  } else {
    throw new Error('win not found')
  }
}
/**
 * 关闭
 * @param {*} win
 */
const Close = (payload, $current = null, $root = null) => {
  const win = $current.win
  if (win) {
    win.close()
  } else {
    throw new Error('win not found')
  }
}
/**
 * 窗口移动
 * @param {*} win
 * @param {*} payload
 * @param {*} model
 */
const Move = (payload, $current = null, $root = null) => {
  const { canMoving } = payload
  const win = $current.win
  const model = $current.model
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
  } else {
    throw new Error('win not found')
  }
}

/**
 * 窗体通用事件
 */
module.exports = {
  Min,
  Max,
  IsMax,
  ToggleMax,
  Close,
  Move
}
