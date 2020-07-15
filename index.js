const {app, BrowserWindow,Menu} = require('electron')
const View = require('./system/view')
const Script = require('./system/script')
const System = require('./system/system')
const Event = require('./system/event')
const Audio = require('./system/audio')
const Transform = require('./system/transform')
const Utils = require('./utils/utilsFunctions')


const path = require('path')

class Xsandra{
  width = 1000
  height = 600
  fullscreen = false

  createWindow(){
    const mainWindow = new BrowserWindow({
      width: this.width,
      height: this.height,
      backgroundColor: '#000000',
      resizable: false,
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname,'/scripts/script.js')
      }
    })
    
    if(this.fullscreen){
      mainWindow.setFullScreen(true)
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
  
  run(){
    app.whenReady().then(() => {
      this.createWindow()
      Menu.setApplicationMenu(null)

      app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    })

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })
  }
}

module.exports.Engine = new Xsandra()
module.exports.Script = new Script()
module.exports.View = module.exports.Renderer = new View()
module.exports.System = new System()
module.exports.Event = new Event()
module.exports.Audio = new Audio()
module.exports.Transform = new Transform()
module.exports.Utils = Utils 
