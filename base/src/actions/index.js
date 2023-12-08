const FileAction = require('./FileAction.js')
const WinAction = require('./WinAction')

module.exports = {
  file: async (params) => {
    const { type, payload } = params
    let result = null
    const fn = FileAction[type]
    try {
      if (fn) {
        result = await fn(payload)
      } else {
        throw new Error('暂不支持此方法')
      }
      return result
    } catch (e) {
      throw e
    }
  },
  win: (win, params, model = {}) => {
    const { type, payload } = params
    let result = null
    const fn = WinAction[type]
    if (fn) {
      result = fn(win, payload, model)
    }
    return result
  }
}
