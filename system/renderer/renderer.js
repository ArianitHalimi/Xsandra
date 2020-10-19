const Rectangle = require('./simpleShapes/rectangle')
const Circle = require('./simpleShapes/circle')
const Triangle = require('./simpleShapes/triangle')
const Text = require('./simpleShapes/text')
const Line = require('./simpleShapes/line')
const fs = require('fs')
const path = require('path')

class Renderer{
    screenSize(){
        return [window.innerWidth,window.innerHeight]
    }

    setBackground(value){
        if(value.startsWith('rgba') || value.startsWith('#')) document.getElementsByTagName("BODY")[0].style = `background-color: ${value};`
        if(fs.existsSync(path.join(process.cwd(),value))) document.getElementsByTagName("BODY")[0].style = `background: url(${Utils.stringEscape(path.join(process.cwd(),value))}) no-repeat; background-size:100vw 100vh;`
        document.body.style.margin = 0
        document.body.style.overflow = 'hidden'
    }

    rectangle(height,width,x,y){
        return new Rectangle(height,width,x,y)
    }

    circle(centerX,centerY,radius){
        return new Circle(centerX,centerY,radius)
    }

    triangle(...coordinates){
        return new Triangle(...coordinates)
    }
    
    text(message,x,y){
        return new Text(message,x,y)
    }
    
    line(x1,y1,x2,y2){
        return new Line(x1,y1,x2,y2)
    }
}

module.exports = Renderer