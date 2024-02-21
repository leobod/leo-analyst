const { globSync } = require('glob')
const fs = require('fs')

/**
 * 需要匹配的规则
 */
const MATCH_RULES = {
  $t: {
    match: /\$t\('.+?'\)/g,
    replace: /\$t\('(.+)'\)/g
  },
  'i18n.global.t': {
    match: /i18n\.global\.t\('.+?'\)/g,
    replace: /i18n\.global\.t\('(.+)'\)/g
  }
}

const _isDirExist = function (path) {
  const pathList = path.split('/')
  const dirPath = pathList.splice(-1, 1).join('/')
  const result = fs.existsSync(dirPath)
  return result
}
const _createDirIfNotExist = function (path) {
  const pathList = path.split('/')
  const dirPath = pathList.splice(-1, 1).join('/')
  const result = fs.existsSync(dirPath)
  if (result) {
    fs.mkdirSync(dirPath)
  }
}
/**
 * 根据单个文件路径尝试处理
 * @param {*} path
 * @param {*} i18nList
 * @returns
 */
const _getKeyList = (path, i18nList, opts = {}) => {
  const matchRule = opts.matchRule || []
  return new Promise((resolve) => {
    fs.promises
      .readFile(path, 'utf8')
      .then((content) => {
        for (const key in MATCH_RULES) {
          if (matchRule.indexOf(key) !== -1) {
            const ruleItem = MATCH_RULES[key]
            const matchReg = ruleItem.match
            const replaceReg = ruleItem.replace
            const matchedList = content.match(matchReg) || []
            const matchedkeyList = matchedList.map((item) => {
              return item.replace(replaceReg, '$1')
            })
            for (const keyItem of matchedkeyList) {
              if (i18nList.indexOf(keyItem) === -1) {
                i18nList.push(keyItem)
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log('err: ', err)
      })
      .finally(() => {
        resolve(null)
      })
  })
}

/**
 * 根据工程路径获取下面所有的i18n关键字
 * @param {*} payload { path:string, absolute: boolean, matchRule: [] }
 * @param {*} $current
 * @param {*} $root
 * @returns
 */
const GetKeyList = async (payload = {}, $current = null, $root = null) => {
  const opts = payload
  if (opts.path) {
    const finalOpts = Object.assign({}, opts, { absolute: true })
    let i18nList = []
    const fileList = globSync(['**/*.js', '**/*.vue'], {
      ignore: 'node_modules/**',
      cwd: finalOpts.path,
      absolute: !!finalOpts.absolute
    })
    for (const pathItem of fileList) {
      await _getKeyList(pathItem, i18nList, finalOpts)
    }
    return i18nList
  } else {
    throw new Error('工程路径未设置')
  }
}

/**
 * 保存i18nkeylist到指定路径
 * @param {*} payload { path, content }
 * @param {*} $current
 * @param {*} $root
 * @returns
 */
const SaveFile = async (payload = {}, $current = null, $root = null) => {
  const { path, content } = payload
  if (path) {
    try {
      _createDirIfNotExist(path)
      fs.writeFileSync(path, content)
    } catch (e) {
      throw e
    }
  } else {
    throw new Error('请填写路径')
  }
}

const GetAndSaveFromWorkspace = async (
  payload = {},
  $current = null,
  $root = null
) => {
  const { workspace, matchRule = [], savePath } = payload
  if (!workspace) {
    throw new Error('please set workspace')
  }
  if (!savePath) {
    throw new Error('please set savePath')
  }
  const getOpts = { path: workspace, matchRule: matchRule }
  let allKey = {}
  let keyList = await GetKeyList(getOpts)
  for (const key of keyList) {
    allKey[key] = key
  }
  const allKeyStr = JSON.stringify(allKey, null, 2)
  const saveOpts = { path: savePath, content: allKeyStr }
  await SaveFile(saveOpts)
  return saveOpts.path
}

const GetDiffKey = async (payload = {}, $current = null, $root = null) => {
  const { type, left, right, saveDir, saveKey } = payload
  let leftStr = ''
  let rightStr = ''
  if (type === 'FILE') {
  }
}

module.exports = {
  GetKeyList,
  SaveFile,
  GetAndSaveFromWorkspace,
  GetDiffKey
}
