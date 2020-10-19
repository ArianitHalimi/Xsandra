class KeyboardEvent{
    keyPress(callback){
        window.addEventListener('keydown',(e)=>{
            var event = {Key:e.key,keyCode:e.keyCode,repeat:e.repeat,timeStamp:e.timeStamp,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey}
            callback(event)
        })
    }
    keyRelease(callback){
        window.addEventListener('keyup',(e)=>{
            var event = {Key:e.key,keyCode:e.keyCode,repeat:e.repeat,timeStamp:e.timeStamp,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey}
            callback(event)
        })
    }
    ctrl(callback){
        window.addEventListener('keydown',(e)=>{
            var event = {repeat:e.repeat,timeStamp:e.timeStamp}
            if(e.keyCode==17) callback(event)
        })
    }
    shift(callback){
        window.addEventListener('keydown',(e)=>{
            var event = {repeat:e.repeat,timeStamp:e.timeStamp}
            if(e.keyCode==16) callback(event)
        })
    }
    alt(callback){
        window.addEventListener('keydown',(e)=>{
            var event = {repeat:e.repeat,timeStamp:e.timeStamp}
            if(e.keyCode==18) callback(event)
        })
    }
    enter(callback){
        window.addEventListener('keydown',(e)=>{
            var event = {repeat:e.repeat,timeStamp:e.timeStamp}
            if(e.keyCode==13) callback(event)
        })
    }
}

module.exports = KeyboardEvent