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
    hasOccurred(shape,e,foo){
        if(shape=='screen') foo(e)
        if((shape.type=='rectangle' || shape.type == 'image') && pointCollision.pointRectangleCollision(e.clientX,e.clientY,shape.options.x,shape.options.y,shape.height,shape.width)) foo(e)
        if(shape.type=='circle' && pointCollision.pointCircleCollision(e.clientX,e.clientY,shape.x, shape.y, shape.radius)) foo(e)
        if(shape.type=='triangle' && pointCollision.pointPolygonCollision(e.clientX,e.clientY,[[shape.startX,shape.startY],[shape.firstPX,shape.firstPY],[shape.secondPX,shape.secondPY]])) foo(e)
        if(shape.type=='text' && pointCollision.pointRectangleCollision(e.clientX,e.clientY,shape.options.x,shape.options.y,shape.options.height,shape.options.width)) foo(e)
        if(shape.type=='line' && pointCollision.pointLineCollision(e.clientX,e.clientY, shape.startX, shape.startY, shape.destinationX, shape.destinationY)) foo(e)
        if(shape.type=='ellipse' && pointCollision.pointEllipseCollision(e.clientX,e.clientY,shape.x,shape.y,shape.radiusX,shape.radiusY)) foo(e)
    }
    on(event,shape,foo){
        this[event](shape,foo)
    }
    click(shape,foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('click',(e)=>{
            this.hasOccurred(shape,e,foo)
        })
    }
    wheel(shape,foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('onwheel',(e)=>{
            this.hasOccurred(shape,e,foo)
        })
    }
    hold(shape,foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mousedown',(e)=>{
            this.hasOccurred(shape,e,foo)
        })
    }
    release(shape,foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseup',(e)=>{
            this.hasOccurred(shape,e,foo)
        })
    }
    rightClick(shape,foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            this.hasOccurred(shape,e,foo)
            return false
        },false)
    }
    wheelClick(shape,foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('click',(e)=>{
            if (e && (e.which == 2 || e.button == 4 )) {
                this.hasOccurred(shape,e,foo)
            }
        })
    }
    mouseIn(shape,foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseover',(e)=>{
            this.hasOccurred(shape,e,foo)
        })
    }
    mouseOut(shape,foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseout',(e)=>{
            this.hasOccurred(shape,e,foo)
        })
    }
}

class KeyboardEvent{
    keyPress(foo){
        window.addEventListener('keydown',(e)=>{
            var event = {Key:e.key,keyCode:e.keyCode,repeat:e.repeat,timeStamp:e.timeStamp,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey}
            foo(event)
        })
    }
    keyRelease(foo){
        window.addEventListener('keyup',(e)=>{
            var event = {Key:e.key,keyCode:e.keyCode,repeat:e.repeat,timeStamp:e.timeStamp,ctrlKey:e.ctrlKey,shiftKey:e.shiftKey}
            foo(event)
        })
    }
    ctrl(foo){
        window.addEventListener('keydown',(e)=>{
            var event = {repeat:e.repeat,timeStamp:e.timeStamp}
            if(e.keyCode==17) foo(event)
        })
    }
    shift(foo){
        window.addEventListener('keydown',(e)=>{
            var event = {repeat:e.repeat,timeStamp:e.timeStamp}
            if(e.keyCode==16) foo(event)
        })
    }
    alt(foo){
        window.addEventListener('keydown',(e)=>{
            var event = {repeat:e.repeat,timeStamp:e.timeStamp}
            if(e.keyCode==18) foo(event)
        })
    }
    enter(foo){
        window.addEventListener('keydown',(e)=>{
            var event = {repeat:e.repeat,timeStamp:e.timeStamp}
            if(e.keyCode==13) foo(event)
        })
    }
}

class WindowEvent{
    onResize(foo){
        window.addEventListener('resize', function(e){
            foo(e)
        });
    }
}

module.exports = Event;
