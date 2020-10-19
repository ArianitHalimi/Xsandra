const distanceBetweenTwoPoints = (x1,y1,x2,y2) => {
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}

const pointLineCollision = (pointX,pointY, shape) => {
    var d1 = distanceBetweenTwoPoints(pointX,pointY, shape.coordinates.x1,shape.coordinates.y1)
    var d2 = distanceBetweenTwoPoints(pointX,pointY, shape.coordinates.x2, shape.coordinates.y2)
    var lineLen = distanceBetweenTwoPoints(shape.coordinates.x1,shape.coordinates.y1, shape.coordinates.x2,shape.coordinates.y2)
    var buffer = 0.1
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) return true
    return false
}

module.exports = pointLineCollision