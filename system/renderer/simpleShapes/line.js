const utils = require('../../utils/utils')
const {Visibility,Movement,Fade} = require('../../animations/animation')
const AnimationFrame = require('../../animations/animationFrame')

class Line{
    ID
    #ctx
    #animationFrame
    type = "line"
    subtype = 'polygon'
    coordinates = {x1:0,y1:0,x2:100,y2:100}
    color= "#FF0000"
    centerX = 50
    centerY = 50
    thickness = 1
    rotation = false
    rotationAngle = 0
    rotationAmount = 0
    visibilityToggle = false
    fadeToggle = false
    #render = true

    constructor(x1,y1,x2,y2){
        this.#ctx = document.getElementById('mainframe').getContext('2d', { alpha: false })
        this.ID = utils.generateRandomId()
        if(x1) this.coordinates.x1 = x1
        if(y1) this.coordinates.y1 = y1
        if(x2) this.coordinates.x2 = x2
        if(y2) this.coordinates.y2 = y2
        this.centerX = (this.coordinates.x1 + this.coordinates.x2) / 2
        this.centerY = (this.coordinates.y1 + this.coordinates.y2) / 2
        this.#animationFrame = new AnimationFrame()
        this.#animationFrame.eventFunctions.push(()=> this.display())
        this.#animationFrame.initialize()
        return this
    }

    style(color,thickness){
        if(color) this.color = color
        if(thickness) this.thickness = thickness
        return this
    }

    display(){
        if(!this.#render) return this
        if(this.visibilityToggle) return this
        this.#ctx.save()
        this.#ctx.beginPath()
        this.#ctx.strokeStyle = this.color
        this.#ctx.moveTo(this.coordinates.x1,this.coordinates.y1)
        this.#ctx.lineTo(this.coordinates.x2,this.coordinates.y2)
        this.#ctx.lineWidth = this.thickness < 3 ? this.thickness : 1
        this.#ctx.stroke()
        this.#ctx.restore()
        return this
    }

    rotate(rotationAngle){
        if(rotationAngle) this.rotation = true
        this.rotationAmount += rotationAngle
        if(this.rotationAmount > 360) this.rotationAmount = this.rotationAmount - 360
        if(rotationAngle) this.rotationAngle = rotationAngle * Math.PI/180
        utils.updateRotationCoordinates(this,this.rotationAngle)
        return this
    }

    translate(vectorX,vectorY){
        utils.updateTranslationCoordiates(this,vectorX,vectorY)
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

module.exports = Line