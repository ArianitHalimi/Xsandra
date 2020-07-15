const path = require('path')
const fs = require('fs')
const Utils = require('../utils/utilsFunctions')

class View{
    setMenu(menu = {}){
      if(document.getElementById('mainframe') !== null) document.getElementById('mainframe').remove();
      document.body.style.margin = 0
      document.body.style.overflow = 'hidden'
      document.body.appendChild(document.createElement('canvas'));
      document.querySelector('canvas').style.margin = 0;
      document.querySelector('canvas').setAttribute('id','mainMenu')
      document.getElementById('mainMenu').setAttribute('width',window.innerWidth)
      document.getElementById('mainMenu').setAttribute('height',window.innerHeight)
    }
    initialize(){
      if(document.getElementById('mainMenu') !== null) document.getElementById('mainMenu').remove();
      document.body.style.margin = 0
      document.body.style.overflow = 'hidden'
      document.body.appendChild(document.createElement('canvas'));
      document.querySelector('canvas').style.margin = 0;
      document.querySelector('canvas').setAttribute('id','mainframe')
      document.getElementById('mainframe').setAttribute('width',window.innerWidth)
      document.getElementById('mainframe').setAttribute('height',window.innerHeight)
    }
    setBackground(value){
      if(value.startsWith('rgba') || value.startsWith('#')) document.getElementsByTagName("BODY")[0].style = `background-color: ${value};`
      if(fs.existsSync(path.join(process.cwd(),value))) document.getElementsByTagName("BODY")[0].style = `background: url(${Utils.stringEscape(path.join(process.cwd(),value))}) no-repeat; background-size:100vw 100vh;`
      document.body.style.margin = 0
      document.body.style.overflow = 'hidden'
    }
    clearScreen(){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    }
    simpleShape(){
      return new SimpleShapes()
    }
    complexShape(){
      return new ComplexShapes()
    }
}
  
class SimpleShapes extends View{
    rectangle(height,width,x=1,y=1,color="#FF0000",outline = false,outlineColor = "#FFFFFF",outlineSize = 5){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.save()
      let velocity = { dx:0, dy:0 }
      let rotationAngle = 0, scaleRate = [0,0]
      this.style(ctx,color,outlineColor,outline)
      ctx.fillRect(x,y,width,height)
      if(outline){
        ctx.lineWidth = outlineSize
        ctx.strokeRect(x,y,height,width)
      }
      ctx.restore()
      return { type:"rectangle", height, width, x, y, color, outline, outlineSize, outlineColor, velocity, rotationAngle, scaleRate }
    }

    circle(x,y,radius,color="#FF0000",outline=false,outlineColor = "#FFFFFF"){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.save()
      let velocity = { dx:0, dy:0 }
      let rotationAngle = 0, scaleRate = [0,0]
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI*2,true)
      this.style(ctx,color,outlineColor,outline)
      ctx.fill()
      if(outline) ctx.stroke()
      ctx.closePath()
      ctx.restore()
      return { type:"circle",x,y,radius,color,outline,outlineColor,velocity,scaleRate }
    }

    ellipse(x,y,radiusX,radiusY,color="#FF0000",outline=false,outlineColor = "#FFFFFF"){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.save()
      let velocity = { dx:0, dy:0 }
      let rotationAngle = 0, scaleRate = [0,0]
      ctx.beginPath()
      ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI,true)
      this.style(ctx,color,outlineColor,outline)
      ctx.fill()
      if(options.outline) ctx.stroke()
      ctx.restore()
      return { type:"ellipse",x,y,radiusX,radiusY,color,outline,outlineColor,velocity,rotationAngle }
    }

    triangle(startX,startY,firstPX,firstPY,secondPX,secondPY,color="#FF0000",outline=false,outlineColor = "#FFFFFF"){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.save()
      let velocity = { dx:0, dy:0 }
      let rotationAngle = 0, scaleRate = [0,0]
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(firstPX,firstPY)
      ctx.lineTo(secondPX,secondPY)
      ctx.lineTo(startX,startY)
      this.style(ctx,color,outlineColor,outline)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
      return { type:"triangle",startX,startY,firstPX,firstPY,secondPX,secondPY,color,outline,outlineColor,velocity,rotationAngle }
    }

    text(message,x=1,y=1,fontSize='30px',italic=false,bold=false,fontFamily='Sans-Serif',fontColor="#FF0000"){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.save()
      let velocity = { dx:0, dy:0 }
      let rotationAngle = 0, scaleRate = [0,0]
      var italicF, boldF
      if(italic) italicF = 'italic '
      if(bold) boldF = 'bold '
      this.style(ctx,fontColor)
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top'
      ctx.font = `${italicF}${boldF}${fontSize} ${fontFamily}`
      ctx.fillText(message, x, y)
      var width = ctx.measureText(message).width
      var height = ctx.measureText('M').width
      ctx.restore()
      return { type:"text",message,x,y,fontSize,fontFamily,fontColor,italic,bold,width,height,rotationAngle,velocity }
    }

    line(startX,startY,destinationX,destinationY,color="#FF0000",thickness=1,lineStyle = 'regular'){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.save()
      let velocity = { dx:0, dy:0 }
      let rotationAngle = 0, scaleRate = [0,0]
      ctx.beginPath()
      if(lineStyle=='round') ctx.lineCap = lineStyle
      ctx.moveTo(startX, startY)
      ctx.lineTo(destinationX,destinationY)
      this.style(ctx,color,color,true)
      ctx.lineWidth = thickness < 8 ? thickness : 1
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
      return { type:"line",startX,startY,destinationX,destinationY,color,thickness,lineStyle,velocity,rotationAngle }
    }

    loadAsset(src,x=1,y=1,height,width){
      let velocity = { dx:0, dy:0 }
      let rotationAngle = 0, scaleRate = [0,0]
      var img = new Image()
      img.onload = () => {
        var ctx = document.getElementById('mainframe').getContext('2d')
        ctx.save()
        ctx.drawImage(img,x,y,width,height)
        ctx.restore()
      }
      try{
        if(src.startsWith('http')) img.src = src
        else{
          img.src = path.join(process.cwd(),src)
        }
      }catch(err){
          throw new Error('Error loading the image. Path not found')
      }
      return{ type:"image",src,x,y,height,width,velocity,rotationAngle }
    }

    style(ctx,styleColor,strokeColor,hasOutline=false){
      ctx.fillStyle = styleColor
      if(hasOutline) ctx.strokeStyle = strokeColor
    }
}

class ComplexShapes extends View{
  regularPolygon(centerX,centerY,radius,sides,color="#FF0000"){
    var edgeCoordinates = []
    var ctx = document.getElementById('mainframe').getContext('2d')
    ctx.save()
    if (sides < 3) console.log('Cannot create a polygon without more than 3 sides')
    ctx.beginPath()
    var a = ((Math.PI * 2)/sides)
    ctx.translate(centerX,centerY);
    ctx.moveTo(radius,0)
    for (var i = 1; i < sides; i++) {
      edgeCoordinates.push([radius*Math.cos(a*i),radius*Math.sin(a*i)])
      ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i))
    }
    this.style(ctx,color,color,false)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    return { type:"regularPolygon",centerX,centerY,radius,sides,color }
  }

  unRegularPolygon(startX,startY,edgeCoordinates,color="#FF0000",outline=false,outlineColor="#FF0000",outlineSize = 1){
    var ctx = document.getElementById('mainFrame').getContext('2d')
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    for(var i = 0; i<edgeCoordinates.length;i+=2){
      ctx.lineTo(edgeCoordinates[i],edgeCoordinates[(i+1)>=edgeCoordinates.length ? 0 : (i+1)])
    }
    this.style(ctx,options.color,options.outlineColor,options.outline)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    return { type:"unRegularPolygon",startX,startY,edgeCoordinates,color }
  }

  curve(x,y,radius,startAngle=0,endAngle=Math.PI*2,antiClockWise=true,color="#FF0000",outline=true,outlineColor="#FF0000"){
    //quadratic Bézier curve
    //cubic Bézier curve
    var ctx = document.getElementById('mainframe').getContext('2d')
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, radius, options.startAngle, options.endAngle,options.antiClockWise)
    this.style(ctx,options.color,options.outlineColor,options.outline)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
    return { type:"curve",x,y,startAngle,endAngle,antiClockWise,color,outline,outlineColor }
  }  
}

module.exports = View;