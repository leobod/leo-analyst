const {
  getI18nList,
  _getKeyList
} = require('../src/windows/Main/actions/getI18nList')

const params = {
  path: 'D:\\project\\BMRS2.0\\CacheProject\\BMRS2.0Web',
  absolute: true,
  matchRule: ['i18n.global.t']
}

getI18nList(params).then((res) => {
  console.log(res)
})

// const result = []
// const params = {
//   path: 'D:\\project\\BMRS2.0\\CacheProject\\BMRS2.0Web\\src\\layout\\Dialog\\ModifyPwdDialog.vue',
//   absolute: true,
//   matchRule: ['i18n.global.t', '$t']
// }

// _getKeyList(params.path, result, params).then((res) => {
//   console.log(result)
// })
