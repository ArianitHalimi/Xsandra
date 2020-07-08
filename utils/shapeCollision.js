const circleCircleCollision = (circle1X,circle1Y, circle1Radius,circle2X,circle2Y,circle2Radius) => {
    if(Math.sqrt(Math.pow((circle2X-circle1X),2) + Math.pow((circle2Y-circle1Y,2))) < circle1Radius + circle2Radius) return true
    return false
}

module.exports.circleCircleCollision = circleCircleCollision

const rectangleRectangleCollision = (rect1X,rect1Y,rect1Height,rect1Width,rect2X,rect2Y,rect2Height,rect2Width) => {
    if (rect1X < rect2X + rect2Width && rect1X + rect1Width > rect2X && rect1Y < rect2Y + rect2Height && rect1Y + rect1Height > rect2Y) return true
        return false
}

module.exports.rectangleRectangleCollision = rectangleRectangleCollision