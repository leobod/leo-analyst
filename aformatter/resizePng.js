const sharp = require("sharp");
sharp("./origin/蓝莓.png")
  .toFormat("png")
  .resize(256, 256)
  .toFile("./蓝莓256x256.png", (err, info) => {
    // 处理错误或完成后的回调函数
    console.log(err);
  });
