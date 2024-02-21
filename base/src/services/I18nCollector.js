const { globSync } = require('glob')
const fs = require('fs')
const p = require('path')
const readline = require('readline')

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

const _isFileExist = function (path) {
  if (path) {
    return fs.existsSync(path)
  } else {
    return false
  }
}
const _createDirIfNotExist = function (path) {
  const pathList = path.split('/')
  const dirPath = pathList.splice(-1, 1).join('/')
  const result = fs.existsSync(dirPath)
  if (result) {
    fs.mkdirSync(dirPath)
  }
}

const _readFileEachLine = function (fReadName) {
  return new Promise((resolve) => {
    let fRead = fs.createReadStream(fReadName)
    let objReadline = readline.createInterface({
      input: fRead
    })
    let arr = new Array()
    objReadline.on('line', (line) => {
      if (line !== '') {
        arr.push(line)
      }
    })
    objReadline.on('close', () => {
      resolve(arr)
    })
  })
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

const ParseContent = async (payload = {}, $current = null, $root = null) => {
  const { text = '', defaultVal = {} } = payload
  let content = defaultVal
  try {
    content = JSON.parse(content)
  } catch (e) {
    content = defaultVal
  }
  return content
}

const ReadContent = async (payload = {}, $current = null, $root = null) => {
  const { path } = payload
  if (_isFileExist(path)) {
    return fs.readFileSync(path)
  } else {
    return ''
  }
}

/**
 * 保存i18nkeylist到指定路径
 * @param {*} payload { path, content }
 * @param {*} $current
 * @param {*} $root
 * @returns
 */
const SaveContent = async (payload = {}, $current = null, $root = null) => {
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
  await SaveContent({ path: savePath, content: allKeyStr })
  return savePath
}

const GetDiffKey = async (payload = {}, $current = null, $root = null) => {
  const { type, left, right, saveDir, saveKey } = payload
  let leftStr = ''
  let rightStr = ''
  if (type === 'FILE') {
    leftStr = ReadContent({ path: left })
    rightStr = ReadContent({ path: right })
  }
  const leftObj = ParseContent({ text: leftStr, defaultVal: {} })
  const rightObj = ParseContent({ text: rightStr, defaultVal: {} })
  const distPath = {
    same: p.join(saveDir, `${saveKey}_same.json`),
    diff: p.join(saveDir, `${saveKey}_diff.json`),
    diffArr: p.join(saveDir, `${saveKey}_diffArr.txt`),
    diffBlank: p.join(saveDir, `${saveKey}_diffBlank.json`)
  }
  const sameObj = {}
  const diffArr = []
  for (const key in leftObj) {
    if (rightObj[key]) {
      sameObj[key] = rightObj[key]
    } else {
      diffArr.push(key)
    }
  }
  const diffObj = {}
  const diffBlankObj = {}
  for (const key of diffArr) {
    diffObj[key] = key
    diffBlankObj[key] = ''
  }
  await SaveContent({
    path: distPath.same,
    content: JSON.stringify(sameObj, null, 2)
  })
  await SaveContent({
    path: distPath.diff,
    content: JSON.stringify(diffObj, null, 2)
  })
  await SaveContent({ path: distPath.diffArr, content: diffArr.join('\n') })
  await SaveContent({
    path: distPath.diffBlank,
    content: JSON.stringify(diffBlankObj, null, 2)
  })
  return distPath
}

module.exports = {
  ParseContent,
  ReadContent,
  SaveContent,
  GetKeyList,
  GetAndSaveFromWorkspace,
  GetDiffKey
}
