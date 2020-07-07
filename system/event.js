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
    detect(shapeX,shapeY,shapeWidth,shapeHeight,mouseX,mouseY){
        if(mouseX>shapeX && mouseX<(shapeX + shapeWidth) && mouseY>shapeY && mouseY<(shapeHeight+shapeY)){
            return true
        }
        return false;
    }
    hasOccurred(shape,e,foo){
        if(shape=='screen') foo(e)
        if(shape.type=='rectangle'){
            if(this.detect(shape.options.x,shape.options.y,shape.height,shape.width,e.clientX,e.clientY)) foo(e)
        }
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
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('keydown',(e)=>{
            foo(e)
        })
    }
    keyRelease(foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('keyup',(e)=>{
            foo(e)
        })
    }
    ctrl(){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('keydown',(e)=>{
            if(e.keyCode==17) return true
        })
    }
    shift(){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('keydown',(e)=>{
            if(e.keyCode==16) return true
        })
    }
    alt(){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('keydown',(e)=>{
            if(e.keyCode==18) return true
        })
    }
    enter(){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('keydown',(e)=>{
            if(e.keyCode==13) return true
        })
    }
}

class WindowEvent{
    onResize(foo){
        window.addEventListener('resize', function(){
            foo()
          });
    }
}

module.exports = Event;
