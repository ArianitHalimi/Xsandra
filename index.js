const {app, BrowserWindow,Menu} = require('electron')
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

class Script{
  execute(foo){
    document.addEventListener('DOMContentLoaded',()=>{
      var root = document;
      foo(root)
    })
    return () => {}
  }
}

module.exports.Script = new Script()

class View{
  write(str,color='#e0e0e0'){
    document.write(str.fontcolor(color))
  }
  initialize(){
    document.body.style.margin = 0
    document.body.style.overflow = 'hidden'
    document.body.appendChild(document.createElement('canvas'));
    document.querySelector('canvas').style.margin = 0;
    document.querySelector('canvas').setAttribute('id','mainframe')
    document.getElementById('mainframe').setAttribute('width',window.innerWidth)
    document.getElementById('mainframe').setAttribute('height',window.innerHeight)
  }
  simpleShape(){
    return new SimpleShapes()
  }
}

class SimpleShapes extends View{
  rectangle(height,width,options = {x : 0,y : 0,color:'#FF0000',outline:false,outlineColor:'#FFFFFF',outlineSize:5}){
    var ctx = document.getElementById('mainframe').getContext('2d')
    this.style(ctx,options.color,options.outlineColor,options.outline)
    ctx.fillRect(options.x,options.y,height,width)
    if(options.outline){
      ctx.lineWidth = options.outlineSize
      ctx.strokeRect(options.x,options.y,height,width)
    }
  }

  text(message,options = {x:0,y:0,fontSize: '30px',italic:false,bold:false,fontFamily:'Sans-Serif',fontColor:'#FF0000'}){
    var ctx = document.getElementById('mainframe').getContext('2d')
    var italic = ''
    var bold = ''
    if(options.italic) italic = 'italic '
    if(options.bold) bold = 'bold '
    this.style(ctx,options.fontColor)
    ctx.font = `${italic}${bold}${options.fontSize} ${options.fontFamily}`
    ctx.fillText(message, options.x, options.y);
  }

  imageAsShape(src,options = {x:0,y:0,height,width}){
    var img = new Image()
    img.onload = () => {
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.drawImage(img,options.x,options.y,options.width,options.height)
    }
    img.src = path.join(process.cwd(),src);
    
  }

  style(ctx,styleColor,strokeColor,hasOutline=false){
    ctx.fillStyle = styleColor
    if(hasOutline) ctx.strokeStyle = strokeColor
  }
  path(){
    //to be implemented
  }
  triangle(){
    //to be implemented
  }
  line(){
    //to be implemented
  }
  arcs(){
    //to be implemented
  }
  curve(){
    //to be implemented
  }
}

module.exports.View = new View()
