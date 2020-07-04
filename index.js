const {app, BrowserWindow,Menu} = require('electron')
const path = require('path')
const url = require('url')

class Xsandra{
  width = 1000
  height = 600
  fullscreen = false

  createWindow(entryPointUrl){
    const mainWindow = new BrowserWindow({
      width: this.width,
      height: this.height,
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname,'/scripts/script.js')
      }
    })
    
    if(this.fullscreen){
      mainWindow.maximize()
      mainWindow.removeMenu()
    }
    mainWindow.loadFile(path.join(__dirname,'/root/index.html'))
  }

  toggleFullscreen(){
    this.fullscreen = true
  }
  
  setWindowSize(width,height){
    this.width = width
    this.height = height
  }
  
  run(entryPointUrl = './index.js'){
    app.whenReady().then(() => {
      this.createWindow(entryPointUrl)
      Menu.setApplicationMenu(null)

      app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow(entryPointUrl)
      })
    })

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })
  }
}

class Script{
  execute(foo){
    var a =  document.addEventListener('DOMContentLoaded',()=>{
      var root = document;
      foo(root)
    })
    return () => {}
  }
}

module.exports.Engine = new Xsandra()
module.exports.Script = new Script()
