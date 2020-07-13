const pointCollision = require('../utils/pointCollision')

class Event{
    mouseEvent(){
        return new MouseEvent()
    }
    keyboardEvent(){
        return new KeyboardEvent()
    }
    windowEvent(){
        return new WindowEvent()
    }
}

class MouseEvent{
    hasOccurred(shape,e,callback){
        if(shape=='screen') callback(e)
        if((shape.type=='rectangle' || shape.type == 'image' || shape.type=='text') && pointCollision.pointRectangleCollision(e.clientX,e.clientY,shape.x,shape.y,shape.height,shape.width)) callback(e)
        if(shape.type=='circle' && pointCollision.pointCircleCollision(e.clientX,e.clientY,shape.x, shape.y, shape.radius)) callback(e)
        if(shape.type=='triangle' && pointCollision.pointPolygonCollision(e.clientX,e.clientY,[[shape.startX,shape.startY],[shape.firstPX,shape.firstPY],[shape.secondPX,shape.secondPY]])) callback(e)
        if(shape.type=='line' && pointCollision.pointLineCollision(e.clientX,e.clientY, shape.startX, shape.startY, shape.destinationX, shape.destinationY)) callback(e)
        if(shape.type=='ellipse' && pointCollision.pointEllipseCollision(e.clientX,e.clientY,shape.x,shape.y,shape.radiusX,shape.radiusY)) callback(e)
    }
    on(event,shape,callback){
        this[event](shape,callback)
    }
    click(shape,callback){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('click',(e)=>{
            this.hasOccurred(shape,e,callback)
        })
    }
    wheel(shape,callback){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('onwheel',(e)=>{
            this.hasOccurred(shape,e,callback)
        })
    }
    hold(shape,callback){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mousedown',(e)=>{
            this.hasOccurred(shape,e,callback)
        })
    }
    release(shape,callback){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseup',(e)=>{
            this.hasOccurred(shape,e,callback)
        })
    }
    rightClick(shape,callback){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            this.hasOccurred(shape,e,callback)
            return false
        },false)
    }
    wheelClick(shape,callback){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('click',(e)=>{
            if (e && (e.which == 2 || e.button == 4 )) {
                this.hasOccurred(shape,e,callback)
            }
        })
    }
    mouseIn(shape,callback){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseover',(e)=>{
            this.hasOccurred(shape,e,callback)
        })
    }
    mouseOut(shape,callback){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseout',(e)=>{
            this.hasOccurred(shape,e,callback)
        })
    }
}

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

class WindowEvent{
    onResize(callback){
        window.addEventListener('resize', function(e){
            callback(e)
        })
    }
}

module.exports = Event;
