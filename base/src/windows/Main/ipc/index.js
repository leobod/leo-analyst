const ipcResponse = require('../../../utils/ipcResponse')
const FileIPC = require('../../../ipc/FileIPC')
const { getPkgInfo } = require('./getPkgInfo.js')

const PAGE_ACTION = {
    SELECT_DIR: 'SELECT_DIR',
    GET_PKG_INFO: 'GET_PKG_INFO'
}

module.exports = {
    action: async (params) => {
        const successRes = Object.assign({}, ipcResponse.STATUS_CODE.SUCCESS)
        const unknownErr = Object.assign({}, ipcResponse.STATUS_CODE.UNKNOWN_ERROR)
        const paramErr = Object.assign({}, ipcResponse.STATUS_CODE.PARAM_ERROR)
        const { type, payload } = params
        console.log(params)
        let result = null
        try {
            switch (type) {
                case PAGE_ACTION.SELECT_DIR: {
                    result = await FileIPC.selectDir()
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