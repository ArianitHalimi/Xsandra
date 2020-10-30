const {Visibility,Movement,Fade} = require('../../animations/animation')
const AnimationFrame = require('../../animations/animationFrame')
const utils = require('../../utils/utils')

class Ellipse{
    ID
    #ctx
    #animationFrame
    type = 'ellipse'
    subtype = 'ellipse'
    centerX = 50
    centerY = 50
    radiusX = 10
    radiusY = 20
    color = '#FF0000'
    outline = false
    outlineColor = '#FFFFFF'
    visibilityToggle = false
    fadeToggle = false
    rotation = false
    rotationAngle = 0
    rotationAmount = 0
    velocity = {dx:10,dy:10}
    #render = true
    #continuous = false

    constructor(centerX, centerY, radiusX, radiusY){
        this.#ctx = document.getElementById('mainframe').getContext('2d', { alpha: false })
        this.ID = utils.generateRandomId()
        if(centerX) this.centerX = centerX
        if(centerY) this.centerY = centerY
        if(radiusX) this.radiusX = radiusX
        if(radiusY) this.radiusY = radiusY
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
        if(!this.#render) return this
        if(this.visibilityToggle) return this
        this.#ctx.save()
        this.#ctx.beginPath()
        this.#ctx.fillStyle = this.color
        if(this.outline) this.#ctx.strokeStyle = this.outlineColor
        this.#ctx.ellipse(this.centerX, this.centerY, this.radiusX, this.radiusY, this.rotationAngle, 0, Math.PI*2 ,true)
        this.#ctx.fill()
        if(this.outline) this.#ctx.stroke()
        this.#ctx.restore()
        return this
    }

    translate(vectorX,vectorY){
        this.centerX += vectorX
        this.centerY += vectorY
        return this
    }

    visibility(visibilityFunction){
        return  Visibility[visibilityFunction](this)
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

    resetRotation(){
        this.rotation = false
        this.rotate(-this.rotationAmount)
        this.rotationAmount = 0
        this.rotationAngle = 0
        return this
    }

    rotate(rotationAngle){
        this.rotation = true
        this.rotationAmount += rotationAngle
        if(this.rotationAmount > 360) this.rotationAmount = this.rotationAmount - 360
        this.rotationAngle = this.rotationAmount * Math.PI/180
        return this
    }

    updateCenter(centerX,centerY){
        this.centerX = centerX
        this.centerY = centerY
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

module.exports = Ellipse