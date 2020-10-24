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
    #render = true

    constructor(centerX,centerY,radius){
        this.#ctx = document.getElementById('mainframe').getContext('2d', { alpha: false })
        this.ID = utils.generateRandomId()
        if(centerX) this.centerX = centerX
        if(centerY) this.centerY = centerY
        if(radius) this.radius = radius
        this.#animationFrame = new AnimationFrame()
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

    fade(fadeFunction,duration){
        Fade[fadeFunction](this,duration)
    }

    disableRender(){
        this.#render = false
    }

    enableRender(){
        this.#render = true
    }
}

module.exports = Circle