const circleCircleCollision = (circle1X,circle1Y, circle1Radius,circle2X,circle2Y,circle2Radius) => {
    if(Math.sqrt(Math.pow((circle2X-circle1X),2) + Math.pow((circle2Y-circle1Y,2))) < circle1Radius + circle2Radius) return true
    return false
}

module.exports.circleCircleCollision = circleCircleCollision

const rectangleRectangleCollision = (rect1X,rect1Y,rect1Height,rect1Width,rect2X,rect2Y,rect2Height,rect2Width) => {
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) return true
        return false
}

module.exports.rectangleRectangleCollision = rectangleRectangleCollision