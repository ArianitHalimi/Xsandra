const path = require('path')
const name = require(path.join(process.cwd(),'package.json'))
const file = require(path.join(process.cwd(),name.entryScript))
try{
    file()
}catch(error){
    throw new Error('Unable to resolve script\nScript must export a function\n')
}


