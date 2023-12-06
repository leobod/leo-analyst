/**
 * $t一键读取方案
 */

const fs = require('fs')
const path = require('path')

const queue = {
  dir: [],
  file: [],
  dtKey: [],
}

const getAllDirsAndFiles = () => {
  const rootPath = 'D:\\src'
  if (fs.existsSync(rootPath)) {
    getSubDirsAndFiles(rootPath)
      .then(async () => {
        /* 先目录后文件 */
        while (queue.dir.length > 0) {
          const dirItem = queue.dir.shift()
          await getSubDirsAndFiles(dirItem)
        }
        for (const filePath of queue.file) {
          await getDtKeys(filePath)
        }
        console.log(queue.dtKey)
      })
  } else {
    console.warn('指定目录不存在')
  }
}

const getSubDirsAndFiles = (currentPath) => {
  return new Promise((resolve) => {
    fs.promises.readdir(currentPath, { withFileTypes: true })
      .then((files) => {
        for (const file of files) {
          if (['api', 'assets', 'icons', 'lang', 'router', 'styles'].indexOf(file.name) !== -1) {
            continue
          }
          if (file.isDirectory()) {
            queue.dir.push(path.join(currentPath, file.name))
          } else {
            queue.file.push(path.join(currentPath, file.name))
          }
        }
      })
      .catch((err) => {
        console.warn('readdir', err)
      })
      .finally(() => {
        resolve(null)
      })
  })
}



const getDtKeys = (dtPath) => {
  console.log(dtPath)
  return new Promise((resolve) => {
    // const dtPath = '/views/Notify/WeChatTemplate.vue'
    fs.promises.readFile(dtPath, 'utf8')
      .then((content) => {
        // console.log(content)
        // const reg = new RegExp('\\$t\\(.+\\)', 'g')
        const reg = new RegExp('\\$t\\(\'.+?\'\\)', 'g')
        const keyListWithDT = content.match(reg) || []
        const keyList = keyListWithDT.map(item => {
          const reg2 = new RegExp('\\$t\\(\'(.+)\'\\)', 'g')
          const val = item.replace(reg2, '$1')
          return val
        })
        for (const key of keyList) {
          if (queue.dtKey.indexOf(key) === -1) {
            queue.dtKey.push(key)
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

const main = () => {
  getAllDirsAndFiles()
}

main()
