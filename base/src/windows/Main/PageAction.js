const { getPkgInfo } = require('./services/getPkgInfo.js')
const { getI18nList } = require('./services/getI18nList.js')

const PageFn = {
  GET_PKG_INFO: getPkgInfo,
  GET_I18N_LIST: getI18nList
}

module.exports = {
  page: async (params) => {
    const { type, payload } = params
    let result = null
    const fn = PageFn[type]
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
  }
}
