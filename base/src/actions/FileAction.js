const { dialog } = require('electron')
const _ = require('lodash')

module.exports = {
  /**
   * 选择文件夹
   * @param {*} opts
   * @returns
   */
  OPEN_DIRECTORY_DIALOG: async (opts = {}) => {
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
  OPEN_FILE_DIALOG: async (opts = {}) => {
    const defaultOpts = {
      title: '请选择文件',
      buttonLabel: '确定',
      properties: ['openFile'],
      filters: []
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
  SAVE_FILE_DIALOG: async (opts = {}) => {
    const defaultOpts = {
      title: '保存文件',
      buttonLabel: '确定',
      properties: ['openFile', 'promptToCreate'],
      filters: []
    }
    const finalOpts = _.merge({}, opts, defaultOpts)
    if (opts.properties && opts.properties.length > 0) {
      for (const item of opts.properties) {
        if (finalOpts.properties.indexOf(item) === -1) {
          finalOpts.properties.push(item)
        }
      }
    }
    const result = await dialog.showSaveDialog(finalOpts)
    return result
  },
  /**
   * 保存文件
   * @param {*} opts
   */
  SAVE_FILE_MANUAL: async (opts = {}) => {}
}
