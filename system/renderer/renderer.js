const Rectangle = require('./simpleShapes/rectangle')
const Circle = require('./simpleShapes/circle')
const Triangle = require('./simpleShapes/triangle')
const Text = require('./simpleShapes/text')
const Line = require('./simpleShapes/line')
const Asset = require('./complexShapes/assets')
const fs = require('fs')
const path = require('path')
const utils = require('../utils/utils')
const frustrum = require('../utils/culling/frustrum')
const core = require('../core/core')

class Renderer{
    #camera = [0,0]
    #cameraStartPoint = [0,0]
    #cameraWidthAndHeight = [0,0]
    #frame = [0,0]
    #frustrumInterval

    screenSize(){
        return [window.innerWidth,window.innerHeight]
    }

    setFrame(frameX,frameY){
        this.#frame[0] = frameX
        this.#frame[1] = frameY
    }

    setCamera(cameraX,cameraY){
        this.#camera[0] = cameraX
        this.#camera[1] = cameraY
        this.#cameraWidthAndHeight[0] = cameraX
        this.#cameraWidthAndHeight[1] = cameraY
        if(this.#frustrumInterval) return
        this.#frustrumInterval = setInterval(()=>{
            this.#viewFrustrum()
        },1000)
    }

    moveCamera(moveX,moveY){
        if(this.#camera[0]+moveX>this.#frame[0] || this.#cameraStartPoint[0]+moveX<0) return
        if(this.#camera[1]+moveY>this.#frame[1] || this.#cameraStartPoint[1]+moveY<0) return
        this.#camera[0] += moveX
        this.#camera[1] += moveY
        this.#cameraStartPoint[0] += moveX
        this.#cameraStartPoint[1] += moveY
        utils.updateShapes(core.shapesPool,moveX,moveY)
        this.#viewFrustrum()
    }

    setBackground(value){
        if(value.startsWith('rgba') || value.startsWith('#')) document.getElementsByTagName("BODY")[0].style = `background-color: ${value};`
        if(fs.existsSync(path.join(process.cwd(),value))) document.getElementsByTagName("BODY")[0].style = `background: url(${Utils.stringEscape(path.join(process.cwd(),value))}) no-repeat; background-size:100vw 100vh;`
        document.body.style.margin = 0
        document.body.style.overflow = 'hidden'
    }

    rectangle(height,width,x,y){
        var rect = new Rectangle(height,width,x,y)
        core.shapesPool.push(rect)
        return rect
    }

    circle(centerX,centerY,radius){
        var circle = new Circle(centerX,centerY,radius)
        core.shapesPool.push(circle)
        return circle
    }

    triangle(...coordinates){
        var triangle = new Triangle(...coordinates)
        core.shapesPool.push(triangle)
        return triangle
    }
    
    text(message,x,y){
        var text = new Text(message,x,y)
        core.shapesPool.push(text)
        return text
    }
    
    line(x1,y1,x2,y2){
        var line = new Line(x1,y1,x2,y2)
        core.shapesPool.push(line)
        return line
    }

    asset(src,x,y,width,height){
        var asset = new Asset(src,x,y,width,height)
        core.shapesPool.push(asset)
        return asset
    }

    #viewFrustrum = () => {
        core.shapesPool.forEach(shape=>{
            frustrum(shape,this.#cameraWidthAndHeight[0],this.#cameraWidthAndHeight[1])
        })
    }

    destroy(obj){
        for(var i = 0;i< core.shapesPool.length;i++){
            if(core.shapesPool[i].ID==obj.ID) core.shapesPool.splice(i,1)
        }
        for(var i = 0;i< core.collisionPool.length;i++){
            if(core.collisionPool[i].ID==obj.ID) core.collisionPool.splice(i,1)
        }
        obj.__stopAnimationFrame('no warn')
    }
}

module.exports = Renderer