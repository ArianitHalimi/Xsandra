const {Visibility,Movement,Fade} = require('../../animations/animation')
const AnimationFrame = require('../../animations/animationFrame')
const utils = require('../../utils/utils')

class Circle{
    ID
    #ctx
    #animationFrame
    type = 'circle'
    subtype = 'elipse'
    centerX = 50
    centerY = 50
    radius = 10
    color = '#FF0000'
    outline = false
    outlineColor = '#FF0000'
    visibilityToggle = false
    fadeToggle = false
    velocity = {dx:10,dy:10}
    #render = true
    #continuous = false

    constructor(centerX,centerY,radius){
        this.#ctx = document.getElementById('mainframe').getContext('2d', { alpha: false })
        this.ID = utils.generateRandomId()
        if(centerX) this.centerX = centerX
        if(centerY) this.centerY = centerY
        if(radius) this.radius = radius
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
        this.#ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI*2,true)
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

module.exports = Circle