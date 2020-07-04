const path = require('path')
const name = require(path.join(process.cwd(),'package.json'))
const file = require(path.join(process.cwd(),name.entryScript))
file()

