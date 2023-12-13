const { getPkgInfo } = require('../../services/PkgLoader.js')
const { getI18nList, saveI18nKeyList } = require('../../services/I18nCollector.js')

const PageFn = {
  GET_PKG_INFO: getPkgInfo,
  GET_I18N_LIST: getI18nList,
  SAVE_I18N_KEYLIST: saveI18nKeyList
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
