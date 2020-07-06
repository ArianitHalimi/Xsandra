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
    on(event,foo){
        this[event](foo) // this.event(foo)
    }
    click(foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('click',(e)=>{
            event = {X:e.clientX,Y:e.clientY,alt:e.altKey,shift:e.shiftKey}
            foo(event)
        })
    }
    wheel(foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('onwheel',(e)=>{
            foo(e)
        })
    }
    hold(foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mousedown',(e)=>{
            foo(e)
        })
    }
    release(){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseup',(e)=>{
            foo(e)
        })
    }
    rightClick(foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            foo(e)
            return false
        },false)
    }
    wheelClick(foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('click',(e)=>{
            if (e && (e.which == 2 || e.button == 4 )) {
                foo(e)
            }
        })
    }
    mouseIn(foo){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseover',(e)=>{
            foo(e)
        })
    }
    mouseOut(){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('mouseout',(e)=>{
            foo(e)
        })
    }
}

class KeyboardEvent{
    keyPress(){
        var ctx = document.getElementById('mainframe')
        ctx.addEventListener('keydown',(e)=>{
            foo(e)
        })
    }
    keyRelease(){
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
//event.mouseEvent().click(()=>{...})
//event.mouseEvent().on('click',()=>{

//})
//event.mouse().click(()=>{

//})