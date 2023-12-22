const { default: getMac, isMAC } = require('getmac')

/**
 * 获取mac地址
 * @param {*} payload
 * @param {*} $current
 * @param {*} $root
 * @returns
 */
const GetMAC = (payload = {}, $current = null, $root = null) => {
  const { ethName } = payload
  if (ethName) {
    return getMac(ethName)
  } else {
    return getMac()
  }
}

/**
 * 是否是mac地址
 * @param {*} payload
 * @param {*} $current
 * @param {*} $root
 * @returns
 */
const IsMac = (payload = {}, $current = null, $root = null) => {
  return isMAC(payload.mac)
}

module.exports = {
  GetMAC,
  IsMac
}
