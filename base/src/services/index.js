const File = require('./File')
const Win = require('./Win')
const BaiduFy = require('./BaiduFy')
const I18nCollector = require('./I18nCollector')
const PkgLoader = require('./PkgLoader')
const SettingsLoader = require('./SettingsLoader')

const serviceList = {
  Win,
  File,
  BaiduFy,
  I18nCollector,
  PkgLoader,
  SettingsLoader
}

const getFn = (type) => {
  let fn = null
  const typeList = type.split('/')
  for (const item of typeList) {
    fn = serviceList[item]
    if (!fn) {
      return null
    }
  }
  return fn
}

const handle = async (params) => {
  const { type, payload, $current, $root } = params
  let result = null
  const fn = getFn(type)
  try {
    if (fn) {
      result = await fn(payload, $current, $root)
    } else {
      throw new Error('暂不支持此方法')
    }
    return result
  } catch (e) {
    throw e
  }
}

module.exports = {
  handle
}
