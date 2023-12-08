const _ = require('lodash')

const defaultOpts = {
  title: '请选择文件夹',
  buttonLabel: '确定',
  properties: ['openDirectory']
}

const opts = {
  properties: ['promptToCreate']
}

const finalOpts = _.merge({}, opts, defaultOpts)
if (opts.properties && opts.properties.length > 0) {
  for (const item of opts.properties) {
    if (finalOpts.properties.indexOf(item) === -1) {
      finalOpts.properties.push(item)
    }
  }
}
console.log(finalOpts)
