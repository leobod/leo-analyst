const axios = require('axios')
const CryptoJS = require('crypto-js')

// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
// 单次翻译文本长度限定为6000字节以内（汉字约为2000个）每次中文可控制100个为一组
// 中文(zh) 英语(en) 日语(jp) 其他参考帮助文档 https://fanyi-api.baidu.com/doc/21
// 正确情况
// {
//   "from": "en", "to": "zh",
//   "trans_result": [
//       { "src": "apple", "dst": "苹果" }
//   ]
// }

module.exports = {
  /**
   * 使用翻译api
   * @param {*} query
   * @param {*} form
   * @param {*} to
   * @param {*} opts
   * @returns
   */
  useBdFy: async (query, form = 'zh', to = 'en', opts = {}) => {
    const url = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
    const { appid, appsecret } = opts
    const salt = new Date().getTime()
    const str1 = appid + query + salt + appsecret
    const sign = CryptoJS.MD5(str1)
    let result = null
    try {
      result = await axios({
        method: 'get',
        url: url,
        params: {
          q: query,
          appid: appid,
          salt: salt,
          from: from,
          to: to,
          sign: sign
        }
      })
    } catch (e) {
      throw e
    }
    return result
  }
}
