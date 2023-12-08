const { dialog } = require('electron')
const _ = require('lodash')

module.exports = {
  /**
   * 选择文件夹
   * @param {*} opts
   * @returns
   */
  OPEN_DIRECTORY: async (opts = {}) => {
    const defaultOpts = {
      title: '请选择文件夹',
      buttonLabel: '确定',
      properties: ['openDirectory']
    }
    const finalOpts = _.merge({}, opts, defaultOpts)
    if (opts.properties && opts.properties.length > 0) {
      for (const item of opts.properties) {
        if (finalOpts.properties.indexOf(item) === -1) {
          finalOpts.properties.push(item)
        }
      }
    }
    const result = await dialog.showOpenDialog(finalOpts)
    return result
  },
  /**
   * 选择文件
   * @param {*} opts
   * @returns
   */
  OPEN_FILE: async (opts = {}) => {
    const defaultOpts = {
      title: '请选择文件',
      buttonLabel: '确定',
      properties: ['openFile', 'promptToCreate']
    }
    const finalOpts = _.merge({}, opts, defaultOpts)
    if (opts.properties && opts.properties.length > 0) {
      for (const item of opts.properties) {
        if (finalOpts.properties.indexOf(item) === -1) {
          finalOpts.properties.push(item)
        }
      }
    }
    const result = await dialog.showOpenDialog(finalOpts)
    return result
  },
  /**
   * 保存文件
   * @param {*} opts
   */
  saveFile: async (opts = {}) => {}
}
