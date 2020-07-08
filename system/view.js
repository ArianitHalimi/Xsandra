const path = require('path')

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
      ctx.font = `${italic}${bold}${options.fontSize} ${options.fontFamily}`
      ctx.fillText(message, options.x, options.y);
    }

    style(ctx,styleColor,strokeColor,hasOutline=false){
      ctx.fillStyle = styleColor
      if(hasOutline) ctx.strokeStyle = strokeColor
    }
  
    line(startX,startY,destinationX,destinationY,options={color:'#FF0000'}){
      var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.beginPath()
      ctx.moveTo(startX, startY);
      ctx.lineTo(destinationX,destinationY)
      this.style(ctx,options.color,options.color,true)
      ctx.stroke()
    }

    curve(x,y,radius,options = {startAngle:0,endAngle:Math.PI*2,antiClockWise:true,color:'#ff0000',outline:true,outlineColor:'#ff0000'}){
      //testing method
    var ctx = document.getElementById('mainframe').getContext('2d')
      ctx.beginPath()
      ctx.arc(x, y, radius, options.startAngle, options.endAngle,options.antiClockWise)
      this.style(ctx,options.color,options.outlineColor,options.outline)
      ctx.fill()
      ctx.stroke()
    }
}

module.exports = View;