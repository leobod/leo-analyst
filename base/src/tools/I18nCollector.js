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
        console.log(err)
      })
      .finally(() => {
        resolve(null)
      })
  })
}

/**
 * 根据工程路径获取下面所有的i18n关键字
 * @param {*} opts { path:string, absolute: boolean, matchRule: [] }
 * @returns
 */
const getI18nList = async (opts) => {
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
 * @param {*} opts
 * @returns
 */
const saveI18nKeyList = async (opts) => {
  const { path, content } = opts
  if (path) {
    try {
      fs.writeFileSync(path, content)
    } catch (e) {
      throw e
    }
    return null
  } else {
    throw new Error('请填写路径')
  }
}

module.exports = {
  getI18nList,
  saveI18nKeyList
}
