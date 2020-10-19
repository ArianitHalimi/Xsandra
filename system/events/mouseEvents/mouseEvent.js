const pointPolygonCollision = require('../../utils/mouseCollision/pointPolygonCollision')
const pointEllipseCollision = require('../../utils/mouseCollision/pointEllipseCollision')
const pointLineCollision = require('../../utils/mouseCollision/pointLineCollision')

class MouseEvent{
    hasOccurred(shape,e,callback){
        if(shape=='screen') callback(e)
        if(shape.type=='line' && pointLineCollision(e.clientX,e.clientY,shape)) callback(e)
        if(shape.subtype=='polygon' && pointPolygonCollision(e.clientX,e.clientY,shape)) callback(e)
        if(shape.type=='circle' && pointEllipseCollision(e.clientX,e.clientY,shape,shape.radius,shape.radius)) callback(e)
        if(shape.type=='ellipse' && pointEllipseCollision(e.clientX,e.clientY,shape,shape.radiusX,shape.radiusY)) callback(e)   
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

module.exports = MouseEvent