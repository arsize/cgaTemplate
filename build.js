var Git = require("nodegit");
var path = require("path")
var fs = require("fs")

fs.writeFileSync('./catch.txt', '', "UTF-8")

async function printgit() {
    const repo = await Git.Repository.open(path.resolve(__dirname, '.git'));
    const diff = await Git.Diff.indexToWorkdir(repo, null, {
        flags: Git.Diff.OPTION.SHOW_UNTRACKED_CONTENT | Git.Diff.OPTION.RECURSE_UNTRACKED_DIRS | Git.Diff.OPTION.INCLUDE_UNMODIFIED
    });
    diff.patches().then((patches) => {
        let temp = []
        patches.forEach((patch) => {
            let pth = patch.newFile().path()
            console.log(pth)
            if (pth.indexOf("/") != -1 && pth.indexOf(".github/") == -1 && pth.indexOf(".husky/") == -1) {
                if (!temp.includes(pth.split("/")[0])) {
                    temp.push(pth.split("/")[0])
                }
            }
        });
        return
        temp.map(res => {
            fs.appendFileSync("./catch.txt", res + ";", "UTF-8", { 'flags': 'a+' })
        })

    })
    return diff
}

printgit().then(res => { })