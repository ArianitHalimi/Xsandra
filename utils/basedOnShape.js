const recreateBasedOnShape = (view,shape) => {
    if(shape.type=='rectangle') view.simpleShape().rectangle(shape.height,shape.width,shape.x,shape.y,shape.color,shape.outline,shape.outlineSize,shape.outlineColor)
    if(shape.type=='circle') view.simpleShape().circle(shape.x,shape.y,shape.radius,shape.color,shape.outline,shape.outlineColor)
    if(shape.type=='ellipse') view.simpleShape().ellipse(shape.x,shape.y,shape.radiusX,shape.radiusY,shape.color,shape.outline,shape.outlineColor)
    if(shape.type=='text') view.simpleShape().text(shape.message,shape.x,shape.y,shape.fontSize,shape.italic,shape.bold,shape.fontFamily,shape.fontColor)
    if(shape.type=='line') view.simpleShape().line(shape.startX,shape.startY,shape.destinationX,shape.destinationY,shape.color,shape.thickness)
}

module.exports.recreateBasedOnShape = recreateBasedOnShape

const velocityBasedOnShape = (shape,dx,dy) => {
    if(shape.type=='line') {
        shape.startX += dx
        shape.startY += dy
        shape.destinationX += dx
        shape.destinationY += dy
    }else{
        shape.x += dx
        shape.y += dy
    }
}

module.exports.velocityBasedOnShape = velocityBasedOnShape

const lockScreenBasedOnShape = (shape,dx,dy,constant) => {
    if(shape.type=='rectangle'){
        if(shape.x + shape.width > window.innerWidth || shape.x<0) dx = constant ? (-dx) : 0
        if(shape.y + shape.height > window.innerHeight || shape.y < 0 ) dy = constant ? (-dy) : 0
    }
    if(shape.type=='circle'){
        if(shape.x+shape.radius>window.innerWidth || shape.x - shape.radius < 0) dx = constant ? (-dx) : 0
        if(shape.y+shape.radius>window.innerHeight || shape.y < 0) dy = constant ? (-dy) : 0
    }
    if(shape.type=='ellipse'){
        if(shape.x+shape.radiusX>window.innerWidth || shape.x-shape.radiusX < 0) dx = constant ? (-dx) : 0
        if(shape.y+shape.radiusY>window.innerHeight || shape.y-shape.radiusY < 0) dy = constant ? (-dy) : 0
    }
    if(shape.type=='text'){
        if(shape.x+shape.width > window.innerWidth || shape.x<0) dx = constant ? (-dx) : 0
        if(shape.y+shape.height > window.innerHeight || shape.y<0) dy = constant ? (-dy) : 0
    }
    return [dx,dy]
}

module.exports.lockScreenBasedOnShape = lockScreenBasedOnShape