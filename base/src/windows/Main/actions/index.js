const ipcResponse = require('../../../utils/ipcResponse.js')
const FileAction = require('../../../actions/FileAction.js')
const WinAction = require('../../../actions/WinAction')
const { getPkgInfo } = require('./getPkgInfo.js')

const PAGE_ACTION = {
    SELECT_DIR: 'SELECT_DIR',
    GET_PKG_INFO: 'GET_PKG_INFO'
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
        const successRes = Object.assign({}, ipcResponse.STATUS_CODE.SUCCESS)
        const unknownErr = Object.assign({}, ipcResponse.STATUS_CODE.UNKNOWN_ERROR)
        const paramErr = Object.assign({}, ipcResponse.STATUS_CODE.PARAM_ERROR)
        const { type, payload } = params
        let result = null
        try {
            switch (type) {
                case PAGE_ACTION.SELECT_DIR: {
                    result = await FileAction.selectDir()
                    break
                }
                case PAGE_ACTION.GET_PKG_INFO: {
                    result = await getPkgInfo(payload.path)
                    break
                }
                default: {
                    result = null
                    return paramErr
                }
            }
            successRes.data = result
            return successRes
        } catch (e) {
            unknownErr.data = e.message
            return unknownErr
        }
    }
}