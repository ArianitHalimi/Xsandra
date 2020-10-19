const calculateRGBAValue = require('../../utils/calculate').calculateRGBAValue

class Fade{
    fadeIn(shape,duration){
        if(duration<1000) duration = 1000
        if(!shape.fadeToggle) return
        var interval = duration/20
        var intervalFunc = setInterval(()=>{
            var rgbaColor = calculateRGBAValue(shape.color)
            shape.color = `rgba(${rgbaColor[0]}, ${rgbaColor[1]},${rgbaColor[2]}, ${parseFloat(rgbaColor[3])+0.05})`
        },interval)
        setTimeout(()=>{
            clearInterval(intervalFunc)
        },duration)
        shape.fadeToggle = false
        return shape
    }

    fadeOut(shape,duration){
        if(duration<1000) duration = 1000
        if(shape.fadeToggle) return
        var interval = duration/20
        var intervalFunc = setInterval(()=>{
            var rgbaColor = calculateRGBAValue(shape.color)
            if(rgbaColor.length==3) rgbaColor.push(1)
            shape.color = `rgba(${rgbaColor[0]}, ${rgbaColor[1]},${rgbaColor[2]}, ${(rgbaColor[3]-0.05).toFixed(2)})`
        },interval)
        setTimeout(()=>{
            clearInterval(intervalFunc)
        },duration)
        shape.fadeToggle = true
        return shape
    }

    toggle(shape,duration){
        if(shape.fadeToggle) this.fadeIn(shape,duration)
        else this.fadeOut(shape,duration)
        //shape.fadeToggle = !(shape.fadeToggle)
        return shape
    }
}

module.exports = Fade