const fs = require("fs")
const shell = require("shelljs")
var text = fs.readFileSync("./catch.txt", "utf-8")
text = text.split(";")
text.map(res => {
    if (res) {
        shell.exec(`zip -qr ${res}.zip ./${res}`)
        shell.exec(`mv ./${res}.zip /usr/template/package/zip/${res}.zip`)
    }
})