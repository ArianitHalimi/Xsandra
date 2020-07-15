class Transfrom{
    translate(shape,horizontalDirection,verticalDirection){
        let ctx = document.getElementById('mainframe').getContext('2d')
        ctx.save()
        ctx.translate(horizontalDirection,verticalDirection)
        shape.x += horizontalDirection
        shape.y += verticalDirection 
        ctx.restore()
    }
    rotate(shape,angle,degree=false){
        if(degree) angle = angle * Math.PI / 180
        let ctx = document.getElementById('mainframe').getContext('2d')
        ctx.save()
        ctx.rotate(angle)
        //shape.rotationAngle += angle
        ctx.restore()
    }
    scale(shape,x,y){
        let ctx = document.getElementById('mainframe').getContext('2d')
        ctx.save()
        ctx.scale(x,y)
        //shape.scaleRate = [x,y]
        ctx.restore()
    }
    transform(){
        
    }
}

module.exports = Transfrom