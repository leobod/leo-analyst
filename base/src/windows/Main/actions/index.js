const FileAction = require('../../../actions/FileAction.js')
const WinAction = require('../../../actions/WinAction')
const { getPkgInfo } = require('./getPkgInfo.js')
const { getI18nList } = require('./getI18nList.js')

const PAGE_ACTION = {
  SELECT_DIR: 'SELECT_DIR',
  GET_PKG_INFO: 'GET_PKG_INFO',
  GET_I18N_LIST: 'GET_I18N_LIST'
}

module.exports = {
  win: (params, win, model = {}) => {
    const { type, payload } = params
    switch (type) {
      case 'MIN_WIN': {
        WinAction.min(win)
        break
      }
      case 'MAX_WIN': {
        WinAction.max(win)
        break
      }
      case 'TOGGLE_MAX_WIN': {
        WinAction.toggleMax(win)
        break
      }
      case 'CLOSE_WIN': {
        WinAction.close(win)
        break
      }
      case 'MOVE_WIN': {
        WinAction.move(payload, win, model)
        break
      }
    }
    return
  },
  page: async (params) => {
    const { type, payload } = params
    let result = null
    try {
      switch (type) {
        case PAGE_ACTION.SELECT_DIR: {
          result = await FileAction.selectDir()
          break
        }
        case PAGE_ACTION.GET_PKG_INFO: {
          result = await getPkgInfo(payload)
          break
        }
        case PAGE_ACTION.GET_I18N_LIST: {
          result = await getI18nList(payload)
          break
        }
        default: {
          throw new Error('请求的参数不存在')
        }
      }
      return result
    } catch (e) {
      throw e
    }
  }
}
