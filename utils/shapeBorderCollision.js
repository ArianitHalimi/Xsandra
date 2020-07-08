const rectangleBorderCollision = (rectX,rectY,rectHeight,rectWidth) => {
    if(rectX<0 && rectY < 0 && rectX+rectWidth>window.innerWidth && rectY+ rectHeight > window.innerHeight) return true
    return false
}

module.exports.rectangleBorderCollision = rectangleBorderCollision

const circleBorderCollision = (circleX,circleY,circleRadius) => {
    if(circleX+circleRadius > window.innerWidth && circleY + circleRadius > window.innerHeight && circleX-circleRadius < 0 && circleY - circleRadius<0) return true
    return false
}

module.exports.circleBorderCollision = circleBorderCollision

