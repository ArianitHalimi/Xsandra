const deleteBasedOnShape = (view,shape) => {
    if(shape.type=='rectangle') view.simpleShape().deleteShape(shape.options.x,shape.options.y,shape.height,shape.width)
    if(shape.type=='circle') view.simpleShape().deleteShape(shape.x - shape.radius - 1, shape.y - shape.radius - 1, shape.radius * 2 + 2, shape.radius * 2 + 2)
    if(shape.type=='ellipse') view.simpleShape().deleteShape(shape.x-shape.radiusX - 1,shape.y-shape.radiusY,shape.radiusY*2+2,shape.radiusX*2+2)
    if(shape.type=='text') view.simpleShape().deleteShape(shape.options.x,shape.options.y,shape.options.height,shape.options.width)
    if(shape.type=='line') view.simpleShape().deleteShape(shape.startX,shape.startY,shape.startX + shape.destinationX,shape.options.thickness)
}

module.exports.deleteBasedOnShape = deleteBasedOnShape

const recreateBasedOnShape = (view,shape) => {
    if(shape.type=='rectangle') view.simpleShape().rectangle(shape.height,shape.width,shape.options)
    if(shape.type=='circle') view.simpleShape().circle(shape.x,shape.y,shape.radius,shape.options)
    if(shape.type=='ellipse') view.simpleShape().ellipse(shape.x,shape.y,shape.radiusX,shape.radiusY,shape.options)
    if(shape.type=='text') view.simpleShape().text(shape.message,shape.options)
    if(shape.type=='line') view.simpleShape().line(shape.startX,shape.startY,shape.destinationX,shape.destinationY,shape.options)
}

module.exports.recreateBasedOnShape = recreateBasedOnShape

const velocityBasedOnShape = (shape,dx,dy) => {
    if(shape.type=='rectangle' || shape.type=='text'){
        shape.options.x += dx
        shape.options.y += dy
    }
    if(shape.type=='circle' || shape.type=='ellipse'){
        shape.x += dx
        shape.y += dy
    }
    if(shape.type=='line') {
        shape.startX += dx
        shape.startY += dy
        shape.destinationX += dx
        shape.destinationY += dy
    }
}

module.exports.velocityBasedOnShape = velocityBasedOnShape

const lockScreenBasedOnShape = (shape,dx,dy,constant) => {
    if(shape.type=='rectangle'){
        if(shape.options.x + shape.width > window.innerWidth || shape.options.x<0) dx = constant ? (-dx) : 0
        if(shape.options.y + shape.height > window.innerHeight || shape.options.y < 0 ) dy = constant ? (-dy) : 0
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
        if(shape.options.x+shape.options.width > window.innerWidth || shape.options.x<0) dx = constant ? (-dx) : 0
        if(shape.options.y+shape.options.height > window.innerHeight || shape.options.y<0) dy = constant ? (-dy) : 0
    }
    return [dx,dy]
}

module.exports.lockScreenBasedOnShape = lockScreenBasedOnShape