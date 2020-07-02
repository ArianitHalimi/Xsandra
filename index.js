const {app, BrowserWindow,Menu} = require('electron')

class Xsandra{
  width = 1000
  height = 600
  createWindow(){
    const mainWindow = new BrowserWindow({
      width: this.width,
      height: this.height,
      webPreferences: {
        nodeIntegration: true,
      }
    })
    //mainWindow.loadFile(process.cwd() + '/Game.html')
  }
  setWindowSize(width,height){
    if(arguments.length == 1 && arguments[0]=='fullscreen'){
      //do full screen resolution
    }else{
      this.width = width
      this.height = height
    }
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
