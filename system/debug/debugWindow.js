const path = require('path')
const fs = require('fs')
const util = require('util')

class Debug{
    openDebugWindow(){
        const {remote} = require('electron')
        const { BrowserWindow } = remote;
        let count = BrowserWindow.getAllWindows()
        .filter(b => {
          return b.isVisible()
        })
        .length
        if(count < 2){
            this.clear()
            let debugWindow = new BrowserWindow({
                width:600,
                height:500,
                title: 'Xsandra Debugger',
                webPreferences: {
                    nodeIntegration: false,
                    preload: path.join(__dirname,'/debugLog/debuglog.js')
                }
            })
            debugWindow.loadFile(path.join(__dirname,'../../root/index.html'))
            //Menu.setApplicationMenu(null)
        }
    }
    log(message){
        var file = fs.readFileSync(path.join(__dirname,'./debuglog/debugLog.txt')).toString()
        fs.writeFileSync(path.join(__dirname,'/debugLog/debugLog.txt'),file + util.inspect(message, {showHidden: false, depth: null}) + '\n')
    }
    clear(){
        fs.writeFileSync(path.join(__dirname,'/debugLog/debugLog.txt'),'')
    }
}

module.exports = Debug