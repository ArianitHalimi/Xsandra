const fs = require('fs')
const path = require('path')
const AnimationFrame = require('../../animations/animationFrame')
const {Movement,Visibility} = require('../../animations/animation')
const utils = require('../../utils/utils')

class Asset{
    #ctx
    #animationFrame
    #ID
    type='asset'
    subtype='polygon'
    src = ''
    image
    originalWidth
    width = 100
    originalHeight
    height = 100
    centerX
    centerY
    visibilityToggle = false
    fadeToggle = false
    aspectRatio = 0
    #render = true

    constructor(src,x,y,width,height){
        this.#ID = utils.generateRandomId()
        this.#ctx = document.getElementById('mainframe').getContext('2d', { alpha: false })
        if(!fs.existsSync(path.join(process.cwd(),src))){
            console.error('Cannot find asset on that location')
            return
        }
        this.src = path.join(process.cwd(),src)
        try{
            this.image = new Image()
            this.image.src = this.src
        }catch(e){
            throw e
        }
        let X = x ? x : 0
        let Y = y ? y : 0 
        this.image.onload = ()=>{
            this.width = width ? width : this.image.width
            this.height = height ? height : this.image.height
            this.originalHeight = this.image.naturalHeight
            this.originalWidth = this.image.naturalWidth
            this.centerX = (X+this.width)/2
            this.centerY = (Y+this.height)/2
            this.coordinates = {x1:X,y1:Y,x2:X+this.width,y2:Y,x3:X+this.width,y3:Y+this.height,x4:X,y4:Y+this.height}
            this.aspectRatio = this.originalWidth/this.originalHeight
        }
        this.#animationFrame = new AnimationFrame()
        this.#animationFrame.eventFunctions.push(()=> this.display())
        this.#animationFrame.initialize()
        return this
    }

    display(){
        if(this.visibilityToggle) return this
        this.#ctx.save()
        this.#ctx.drawImage(this.image,this.centerX-this.width/2,this.centerY-this.height/2,this.width,this.height)
        this.#ctx.restore()
    }

    translate(vectorX,vectorY){
        this.centerX += vectorX
        this.centerY += vectorY
        utils.updateTranslationCoordiates(this,vectorX,vectorY)
        return this
    }

    move(moveFuntion, speed){
        if(Array.isArray(speed) && moveFuntion == 'multiple' && speed.length == 2){
            this.translate(speed[0],speed[1])
            return this
        }else{
            return Movement[moveFuntion](this,speed)
        }        
    }

    visibility(visibilityFunction){
        return  Visibility[visibilityFunction](this)
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

module.exports = Asset