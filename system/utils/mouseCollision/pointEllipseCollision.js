const pointEllipseCollision = (pointX,pointY,shape,radius1,radius2) => {
    var x = ((pointX-shape.centerX)*(pointX-shape.centerX))/(radius1*radius1)
    var y = ((pointY-shape.centerY)*(pointY-shape.centerY))/(radius2*radius2)
    return x+y<=1
}

module.exports = pointEllipseCollision