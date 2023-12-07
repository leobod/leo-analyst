const fs = require("fs");
const toIco = require("to-ico");

const files = [fs.readFileSync("./origin/蓝莓512x512.png")];

toIco(files).then((buf) => {
  fs.writeFileSync("favicon.ico", buf);
});
