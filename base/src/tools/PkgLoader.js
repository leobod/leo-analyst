const fs = require('fs')
const p = require('path')

/**
 * 获取指定工程的package.json信息
 * @param {*} opts
 * @returns
 */
const getPkgInfo = async (opts) => {
  const { path } = opts
  const pkgPath = p.join(path, './package.json')
  const isPkgExist = fs.existsSync(pkgPath)
  if (isPkgExist) {
    const pkgContent = fs.readFileSync(pkgPath, 'utf-8')
    let pkgVal = {}
    try {
      pkgVal = JSON.parse(pkgContent)
      return pkgVal
    } catch (e) {
      pkgVal = {}
      throw new Error('package.json文件解析失败')
    }
  } else {
    throw new Error('未找到package.json文件')
  }
  /*
     const allDeps = { ...pkgVal.dependencies, ...pkgVal.devDependencies }
     for (const key in allDeps) {
         const val = allDeps[key]
         const version = val.replace('^', '').replace('~', '')
         const versionList = version.split('.')
         const majorVersion = versionList && versionList[0] || null
         const minorVersion = versionList && versionList[1] || null
         const patchVersion = versionList && versionList[2] || null
         console.log([majorVersion, minorVersion, patchVersion])
     }
     */
}

module.exports = {
  getPkgInfo
}
