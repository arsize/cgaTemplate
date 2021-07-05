// read catchlist<catch.txt
// zip -qr vue2_default.zip ./vue2_default
// mv ./vue2_default.zip /usr/template/package/zip/vue2_default.zip

const fs = require("fs")
const shell = require("shelljs")
var text = fs.readFileSync("./catch.txt", "utf-8")
text = text.split(";")
text.map(res => {
    shell.exec(`zip -qr ${res}.zip ./${res}`)
    shell.exec(`mv /usr/template/package/zip/${res}.zip ./${res}.zip`)
})