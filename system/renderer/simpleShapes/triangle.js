const utils = require('../../utils/utils')
const {Visibility,Movement,Fade} = require('../../animations/animation')
const AnimationFrame = require('../../animations/animationFrame')

class Triangle{
    ID
    #ctx
    #animationFrame
    type = "triangle"
    subtype = "polygon"
    centerX
    centerY
    color = '#FF0000'
    outline = false
    outlineColor = '#FF00FF'
    coordinates = {x1:0,y1:0,x2:20,y2:20,x3:10,y3:20}
    rotation = false
    rotationAngle = 0 
    visibilityToggle = false
    fadeToggle = false
    velocity = {dx:10,dy:10}
    #render = true
    #continuous = false

    constructor(...coordinates){
        this.#ctx = document.getElementById('mainframe').getContext('2d', { alpha: false })
        this.ID = utils.generateRandomId()
        var j = 0
        for(var i = 0; i<6;i+=2){
            j++
            this.coordinates[`x${j}`] = coordinates[i]
            this.coordinates[`y${j}`] = coordinates[i+1]
        }
        this.centerX = (this.coordinates.x1 + this.coordinates.x2 + this.coordinates.x3) / 3
        this.centerY = (this.coordinates.y1 + this.coordinates.y2 + this.coordinates.y3) / 3
        this.#animationFrame = new AnimationFrame()
        this.#animationFrame.eventLoop.push('1')
        this.#animationFrame.eventFunctions.push(()=> this.display())
        this.#animationFrame.initialize()
        return this
    }

    style(color,outline,outlineColor){
        if(color) this.color = color
        if(outline) this.outline = outline
        if(outlineColor) this.outlineColor = outlineColor
        return this
    }

    display(){
        if(this.#render) return this
        if(this.visibilityToggle) return this
        this.#ctx.save()
        this.#ctx.beginPath()
        this.#ctx.fillStyle = this.color
        if(this.outline) this.#ctx.strokeStyle = this.outlineColor
        this.#ctx.moveTo(this.coordinates['x1'],this.coordinates['y1'])
        for(var i=2;i<=3;i++){
            this.#ctx.lineTo(this.coordinates[`x${i}`],this.coordinates[`y${i}`])
        }
        this.#ctx.lineTo(this.coordinates['x1'],this.coordinates['y1'])
        this.#ctx.fill()
        this.#ctx.restore()
        return this
    }

    resetRotation(){
        this.rotation = false
        this.rotate(-this.rotationAmount)
        this.rotationAmount = 0
        this.rotationAngle = 0
        return this
    }

    rotate(rotationAngle){
        this.rotation = true
        this.rotationAngle = rotationAngle * Math.PI/180
        utils.updateRotationCoordinates(this,this.rotationAngle)
        return this
    }

    translate(vectorX,vectorY){
        this.centerX += vectorX
        this.centerY += vectorY
        utils.updateTranslationCoordiates(this,vectorX,vectorY)
        return this
    }

    visibility(visibilityFunction){
        return Visibility[visibilityFunction](this)
    }

    move(moveFuntion, speed){
        if(Array.isArray(speed) && moveFuntion == 'multiple' && speed.length == 2){
            this.translate(speed[0],speed[1])
            return this
        }
        return Movement[moveFuntion](this,speed)
    }

    continuousMovement(velocity){
        if(velocity){
            this.velocity.dx = velocity[0]
            this.velocity.dy = velocity[1]
        }
        if(!this.#continuous){
            this.#animationFrame.eventLoop.push('2')
            this.#animationFrame.eventFunctions.push(()=>{this.move('multiple',[this.velocity.dx,this.velocity.dy])})
        } 
        this.#continuous = true
        return this
    }

    clearMovement(){
        this.#continuous = false
        let functionCode = this.#animationFrame.eventLoop.indexOf('2')
        this.#animationFrame.eventFunctions.splice(functionCode,1)
        return this
    }

    fade(fadeFunction,duration){
        Fade[fadeFunction](this,duration)
    }

    disableRender(){
        this.#render = false
    }

    enableRender(){
        this.#render = true
    }

    __stopAnimationFrame(flag){
        if(flag!=='no warn') console.warn('This method is used for system only. As long as you dont know what are you doing, dont use this')
        window.cancelAnimationFrame(this.#animationFrame.frameID)
    }
}

module.exports = Triangle