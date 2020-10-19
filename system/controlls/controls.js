class Control{
    Event = require('../../index').Event

    arrows(shape,moveSpeed,keysAllowed,callback){
        var keysAllowedArray = [true,true,true,true]
        if(Array.isArray(keysAllowed)){
            keysAllowedArray.forEach((key,index)=>{
                if(typeof keysAllowed[index] == 'boolean') keysAllowedArray[index] = keysAllowed[index]
            })
        }else callback = keysAllowed
        this.Event.keyboardEvent().keyPress((e)=>{
            if(e.Key == 'ArrowLeft' && keysAllowedArray[1]){
                shape.move('moveLeft',moveSpeed)
                if(callback) callback(e)
            }
            if(e.Key == 'ArrowRight' && keysAllowedArray[3]){
                shape.move('moveRight',moveSpeed)
                if(callback) callback(e)
            }
            if(e.Key == 'ArrowUp' && keysAllowedArray[0]){
                shape.move('moveUp',moveSpeed)
                if(callback) callback(e)
            }
            if(e.Key == 'ArrowDown' && keysAllowedArray[2]){
                shape.move('moveDown',moveSpeed)
                if(callback) callback(e)
            }
        })
    }

    wasd(shape,moveSpeed,keysAllowed,callback){
        var keysAllowedArray = [true,true,true,true]
        if(Array.isArray(keysAllowed)){
            keysAllowedArray.forEach((key,index)=>{
                if(typeof keysAllowed[index] == 'boolean') keysAllowedArray[index] = keysAllowed[index]
            })
        }else callback = keysAllowed
        this.Event.keyboardEvent().keyPress((e)=>{
            if((e.Key == 'a' || e.Key == 'A') && keysAllowedArray[1]){
                shape.move('moveLeft',moveSpeed)
                if(callback) callback(e)
            }
            if((e.Key == 'd' || e.Key == 'D') && keysAllowedArray[3]){
                shape.move('moveRight',moveSpeed)
                if(callback) callback(e)
            }
            if((e.Key == 'w' || e.Key == 'W') && keysAllowedArray[0]){
                shape.move('moveUp',moveSpeed)
                if(callback) callback(e)
            }
            if((e.Key == 's' || e.Key == 'S') && keysAllowedArray[2]){
                shape.move('moveDown',moveSpeed)
                if(callback) callback(e)
            }
        })
    }
}

module.exports = Control