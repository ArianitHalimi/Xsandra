const utils = require('../../utils/utils')
const {Visibility,Movement,Fade} = require('../../animations/animation')
const AnimationFrame = require('../../animations/animationFrame')

class Text{
    ID
    #ctx
    #animationFrame
    type = "text"
    subtype="polygon"
    color = '#FF0000'
    centerX
    centerY
    height
    width
    x = 0
    y = 0
    coordinates = {x1:0,y1:0,x2:0,y2:0,x3:0,y3:0,x4:0,y4:0}
    message = ''
    fontSize = '16px'
    fontFamily = 'Sans-Serif'
    bold = false
    italic = false
    rotation = false
    rotationAngle = 0
    visibilityToggle = false
    fadeToggle = false
    velocity = {dx:10,dy:10}
    #render = true
    #continuous = false

    constructor(message,x,y){
        this.#ctx = document.getElementById('mainframe').getContext('2d', { alpha: false })
        this.ID = utils.generateRandomId()
        if(message) this.message = message
        if(x) this.x = x
        if(y) this.y = y
        this.width = this.#ctx.measureText(message).width
        this.height = this.#ctx.measureText('M').width
        this.centerX = this.x + this.width/2
        this.centerY = this.x + this.height/2
        this.coordinates = {x1:this.x,y1:this.y,x2:this.x+this.width,y2:this.y,x3:this.x+this.width,y3:this.y+this.height,x4:this.x,y4:this.y+this.height}
        this.#animationFrame = new AnimationFrame()
        this.#animationFrame.eventLoop.push('1')
        this.#animationFrame.eventFunctions.push(()=> this.display())
        this.#animationFrame.initialize()
        return this
    }

    style(fontSize,italic,bold,fontFamily,fontColor){
        if(fontSize) this.fontSize = fontSize
        if(italic) this.italic = true
        if(bold) this.bold = true
        if(fontFamily) this.fontFamily = fontFamily
        if(fontColor) this.color = fontColor
        return this
    }

    display(){
        if(!this.#render) return this
        if(this.visibilityToggle) return this
        this.#ctx.save()
        var italicTmp = '', boldTmp = ''
        if(this.italic) italicTmp = 'italic '
        if(this.bold) boldTmp = 'bold '
        this.#ctx.fillStyle = this.color
        this.#ctx.textAlign = 'left';
        this.#ctx.textBaseline = 'top'
        this.#ctx.font = `${italicTmp}${boldTmp}${this.fontSize} ${this.fontFamily}`
        this.#ctx.fillText(this.message, this.x, this.y)
        this.#ctx.restore()
        return this
    }

    translate(vectorX,vectorY){
        if(vectorX) this.x += vectorX
        if(vectorY) this.y += vectorY
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

module.exports = Text