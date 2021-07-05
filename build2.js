var Git = require("nodegit");
var path = require("path")
var fs = require("fs")

async function main() {
    const nodegit = require('nodegit');
    const repo = await nodegit.Repository.open(path.resolve(__dirname, '.git'));

    const from = await repo.getCommit("04e30cb6988de9241b16fb3b5e293b8e278580fc");
    const fromTree = await from.getTree();

    const to = await repo.getCommit("b9a740cb0527dc57af1645245976d0c2afa7aabb");
    const toTree = await to.getTree();

    const diff = await toTree.diff(fromTree);
    const patches = await diff.patches();

    for (const patch of patches) {
        console.log(patch.newFile().path());
    }
}
main()
