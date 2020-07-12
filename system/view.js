const path = require('path')
const fs = require('fs')
const Utils = require('../utils/utilsFunctions')

class View{
    write(str,color='#e0e0e0'){
        //testing method
      document.write(str.fontcolor(color))
    }
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
      if(value.startsWith('rgba') || value.startsWith('#')) document.getElementsByTagName("BODY")[0].style = `background-color: ${value}`
      if(fs.existsSync(path.join(process.cwd(),value))) document.getElementsByTagName("BODY")[0].style = `background: url(${Utils.stringEscape(path.join(process.cwd(),value))}) no-repeat center center fixed; background-size: cover;`
    }
    clearScreen(){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    }
    simpleShape(){
      return new SimpleShapes()
    }
}
  
class SimpleShapes extends View{
    deleteShape(x,y,height,width){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.clearRect(x,y,width,height)
    }

    rectangle(height,width,options = {x : 0,y : 0,color:'#FF0000',outline:false,outlineColor:'#FFFFFF',outlineSize:5}){
      var ctx = document.getElementById('mainframe').getContext('2d')
      this.style(ctx,options.color,options.outlineColor,options.outline)
      ctx.fillRect(options.x,options.y,width,height)
      if(options.outline){
        ctx.lineWidth = options.outlineSize
        ctx.strokeRect(options.x,options.y,height,width)
      }
      return {
        type:'rectangle',
        height:height,
        width:width,
        options:{
          x:options.x,
          y:options.y,
          color:options.color,
          outline: options.outline,
          outlineColor: options.outlineColor,
          outlineSize: options.outlineSize
        }
      }
    }

    circle(x,y,radius,options={color:'#ff0000',outline:false,outlineColor:'#ff0000'}){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI*2,true)
      this.style(ctx,options.color,options.outlineColor,options.outline)
      ctx.fill()
      if(options.outline) ctx.stroke()
      ctx.closePath()
      return{
        type:'circle',
        x:x,
        y:y,
        radius:radius,
        options:{
          color:options.color,
          outline:options.outline,
          outlineColor:options.outlineColor
        }
      }
    }

    ellipse(x,y,radiusX,radiusY,options = {color:"#FF0000",outline:false,outlineColor:"#FF0000"}){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.beginPath();
      ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI,true);
      this.style(ctx,options.color,options.outlineColor,options.outline)
      ctx.fill()
      if(options.outline) ctx.stroke()
      return{
        type:'ellipse',
        x:x,
        y:y,
        radiusX:radiusX,
        radiusY:radiusY,
        options:{
          color:options.color,
          outline:options.outline,
          outlineColor:options.outlineColor
        }
      }
    }

    triangle(startX,startY,firstPX,firstPY,secondPX,secondPY,options={color:'#ff0000',outline:false,outlineColor:'#ff0000'}){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.beginPath()
      ctx.moveTo(startX, startY);
      ctx.lineTo(firstPX,firstPY)
      ctx.lineTo(secondPX,secondPY)
      ctx.lineTo(startX,startY)
      this.style(ctx,options.color,options.outlineColor,options.outline)
      ctx.fill()
      ctx.stroke()
      return{
        type:'triangle',
        startX: startX,
        startY: startY,
        firstPX: firstPX,
        firstPY: firstPY,
        secondPX: secondPX,
        secondPY: secondPY,
        options:{
          color:options.color,
          outline:options.outline,
          outlineColor:options.outlineColor
        }
      }
    }

    regularPolygon(x, y, radius, sides,options={color:"#FF0000"}){
      var edgeCoordinates = []
      var ctx = document.getElementById('mainframe').getContext('2d')
      if (sides < 3) console.log('Cannot create a polygon without more than 3 sides')
      ctx.beginPath();
      var a = ((Math.PI * 2)/sides);
      ctx.translate(x,y);
      ctx.moveTo(radius,0);
      for (var i = 1; i < sides; i++) {
        edgeCoordinates.push([radius*Math.cos(a*i),radius*Math.sin(a*i)])
        ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
      }
      this.style(ctx,options.color,options.color,false)
      ctx.closePath();
      ctx.fill()
      return{
        type:'regularPolygon',
        centerX:x,
        centerY:y,
        radius:radius,
        sides:sides,
        edgeCoordinates:edgeCoordinates,
        options:{
          color:options.color
        }
      }
    }

    imageAsShape(src,options = {x:0,y:0,height,width}){
      var img = new Image()
      img.onload = () => {
        var ctx = document.getElementById('mainframe').getContext('2d')
        ctx.drawImage(img,options.x,options.y,options.width,options.height)
      }
      try{
        if(src.startsWith('http')) img.src = src;
        else{
          img.src = path.join(process.cwd(),src);
        }
      }catch(err){
          throw new Error('Error loading the image. Path not found')
      }
      
      return {
        type:'image',
        src: src,
        height:options.height,
        width:options.width,
        options:{
          x:options.x,
          y:options.y,
          height:options.height,
          width: options.width
        }
      }
    }
  
    text(message,options = {x:0,y:0,fontSize: '30px',italic:false,bold:false,fontFamily:'Sans-Serif',fontColor:'#FF0000'}){
      var ctx = document.getElementById('mainframe').getContext('2d')
      var italic = ''
      var bold = ''
      if(options.italic) italic = 'italic '
      if(options.bold) bold = 'bold '
      this.style(ctx,options.fontColor)
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = `${italic}${bold}${options.fontSize} ${options.fontFamily}`
      ctx.fillText(message, options.x, options.y);
      var width = ctx.measureText(message).width;
      var height = ctx.measureText('M').width;
      return{
        type:'text',
        message: message,
        options: {
          x: options.x,
          y: options.y,
          fontSize: options.fontSize,
          fontFamily: options.fontFamily,
          fontColor: options.fontColor,
          italic: options.italic,
          bold: options.bold,
          width: width,
          height: height
        }
      }
    }
  
    line(startX,startY,destinationX,destinationY,options={color:'#FF0000',thickness:1}){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.beginPath()
      ctx.moveTo(startX, startY);
      ctx.lineTo(destinationX,destinationY)
      this.style(ctx,options.color,options.color,true)
      ctx.lineWidth = options.thickness < 8 ? options.thickness : 1
      ctx.stroke()
      ctx.closePath()
      return{
        type:'line',
        startX:startX,
        startY:startY,
        destinationX:destinationX,
        destinationY:destinationY,
        options: {
          color:options.color,
          thickness: options.thickness
        }
      }
    }

    curve(x,y,radius,options = {startAngle:0,endAngle:Math.PI*2,antiClockWise:true,color:'#ff0000',outline:true,outlineColor:'#ff0000'}){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.beginPath()
      ctx.arc(x, y, radius, options.startAngle, options.endAngle,options.antiClockWise)
      this.style(ctx,options.color,options.outlineColor,options.outline)
      ctx.fill()
      ctx.stroke()
      return {
        type:'curve',
        x:x,
        y:y,
        options:{
          startAngle: options.startAngle,
          endAngle: options.endAngle,
          antiClockWise: options.antiClockWise,
          color:options.color,
          outline:options.outline,
          outlineColor: options.outlineColor
        }
      }
    }

    unRegularPolygon(startX,startY,edgeCoordinates,options = {color:"#FF0000",outline:false,outlineColor:"#FF0000",outlineSize:1}){
      var ctx = document.getElementById('mainFrame').getContext('2d')
      ctx.beginPath()
      ctx.moveTo(startX, startY);
      for(var i = 0; i<edgeCoordinates.length;i+=2){
        ctx.lineTo(edgeCoordinates[i],edgeCoordinates[(i+1)>=edgeCoordinates.length ? 0 : (i+1)])
      }
      this.style(ctx,options.color,options.outlineColor,options.outline)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
      return{
        type:'unRegularPolygon',
        startX:startX,
        startY:startY,
        edgeCoordinates: edgeCoordinates,
        options: options
      }
    }

    style(ctx,styleColor,strokeColor,hasOutline=false){
      ctx.fillStyle = styleColor
      if(hasOutline) ctx.strokeStyle = strokeColor
    }
}

module.exports = View;