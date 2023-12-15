const sharp = require('sharp')

sharp('defaultUser.svg')
  .png()
  .toFile('defaultUser.png')
  .then(function (info) {
    console.log(info)
  })
  .catch(function (err) {
    console.log(err)
  })
