const { dialog } = require('electron')
const _ = require('lodash')

/**
 * 选择文件夹
 * @param {*} payload
 * @param {*} $current
 * @param {*} $root
 * @returns
 */
const OpenDirectoryDialog = async (
  payload = {},
  $current = null,
  $root = null
) => {
  const opts = payload
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
}
/**
 * 选择文件
 * @param {*} payload
 * @param {*} $current
 * @param {*} $root
 * @returns
 */
const OpenFileDialog = async (payload = {}, $current = null, $root = null) => {
  const opts = payload
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
}
/**
 * 保存文件弹框
 * @param {*} payload
 * @param {*} $current
 * @param {*} $root
 * @returns
 */
const OpenSaveFileDialog = async (
  payload = {},
  $current = null,
  $root = null
) => {
  const opts = payload
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
}
/**
 * 保存文件
 * @param {*} payload
 * @param {*} $current
 * @param {*} $root
 */
const SaveFileManual = async (payload = {}, $current = null, $root = null) => {}

module.exports = {
  OpenDirectoryDialog,
  OpenFileDialog,
  OpenSaveFileDialog,
  SaveFileManual
}
