const determineCollision = (shape1,shape2) => {
    if(shape1.type == 'circle' && shape2.type=='circle') return circleCircleCollision(shape1.x,shape1.y,shape1.radius,shape2.x,shape2.y,shape2.radius)
    if(shape1.type == 'rectangle' && shape2.type=='rectangle') return rectangleRectangleCollision(shape1.options.x,shape1.options.y,shape1.height,shape1.width,shape2.options.x,shape2.options.y,shape2.height,shape2.width)
    if(shape1.type == 'line' && shape2.type=='line') return lineLineCollision(shape1.startX,shape1.startY,shape1.destinationX,shape1.destinationY,shape2.startX,shape2.startY,shape2.destinationX,shape2.destinationY)    
    if(shape1.type == 'circle' && shape2.type=='rectangle') return circleRectangleCollision(shape2.options.x,shape2.options.y,shape2.height,shape2.width,shape1.x,shape1.y,shape1.radius)
    if(shape1.type=='line' && shape2.type=='rectangle') return lineRectangleCollision(shape1,startX,shape1.startY,shape1.destinationX,shape1.destinationY,shape2.options.x,shape2.options.y,shape2.height,shape2.width)
    if(shape1.type=='line' && shape2.type=='circle') return lineCircleCollision(shape1.startX,shape1.startY,shape1.destinationX,shape1.destinationY,shape2.x,shape2.y,shape2.radius)
}

module.exports.determineCollision = determineCollision
//done
const circleCircleCollision = (circle1X,circle1Y, circle1Radius,circle2X,circle2Y,circle2Radius) => {
    return (circle2X-circle1X)*(circle2X-circle1X) + (circle2Y-circle1Y)*(circle2Y-circle1Y) <= (circle1Radius + circle2Radius)*(circle1Radius + circle2Radius)
}

module.exports.circleCircleCollision = circleCircleCollision
//done
const rectangleRectangleCollision = (rect1X,rect1Y,rect1Height,rect1Width,rect2X,rect2Y,rect2Height,rect2Width) => {
    return (rect1X < rect2X + rect2Width && rect1X + rect1Width > rect2X && rect1Y < rect2Y + rect2Height && rect1Y + rect1Height > rect2Y)
}

module.exports.rectangleRectangleCollision = rectangleRectangleCollision
//done
const circleRectangleCollision = (rectX,rectY,rectHeight,rectWidth,circleX,circleY,circleRadius) => {
    var temp1 = rectX
    var temp2 = rectY
    if (circleX < rectX) testX = rx
    else if(circleX > rectX+rectWidth) temp1 = rectX+rectWidth
    if (circleY < rectY) temp2 = rectY
    else if (circleY > rectY+rectHeight) temo2 = rectY+rectHeight
    var distX = circleX-temp1
    var distY = circleY-temp2
    var distance = Math.sqrt((distX*distX) + (distY*distY))
    if(distance <= circleRadius) return true
}

module.exports.circleRectangleCollision = circleRectangleCollision
//done
const lineRectangleCollision = (firstLineX, firstLineY, firstLineX2, firstLineY2,rectX1,rectY1,rectX2,rectY2,rectX3,rectY3,rectX4,rectY4) => {
     var left = lineLineCollision(firstLineX,firstLineY,firstLineX2,firstLineY2,rectX1,rectY1,rectX2,rectY2)
     var bottom = lineLineCollision(firstLineX,firstLineY,firstLineX2,firstLineY2,rectX2,rectY2,rectX3,rectY3)
     var right = lineLineCollision(firstLineX,firstLineY,firstLineX2,firstLineY2,rectX3,rectY3,rectX4,rectY4)
     var top = lineLineCollision(firstLineX,firstLineY,firstLineX2,firstLineY2,rectX4,rectY4,rectX1,rectY1)
     return left || bottom || right || top
}

module.exports.lineRectangleCollision = lineRectangleCollision
//done
const lineLineCollision = (firstLineX, firstLineY, firstLineX2, firstLineY2, secondLineX, secondLineY, secondLineX2, secondLineY2) => { 
    var s1_x = firstLineX2 - firstLineX
    var s1_y = firstLineY2 - firstLineY
    var s2_x = secondLineX2 - secondLineX
    var s2_y = secondLineY2 - secondLineY
    var s = (-s1_y * (firstLineX - secondLineX) + s1_x * (firstLineY - secondLineY)) / (-s2_x * s1_y + s1_x * s2_y)
    var t = (s2_x * (y1 - y3) - s2_y * (x1 - x3)) / (-s2_x * s1_y + s1_x * s2_y)
    return s >= 0 && s <= 1 && t >= 0 && t <= 1
}

module.exports.lineLineCollision = lineLineCollision

const linePolygonCollision = (firstLineX,firstLineY,firstLineX2,firstLineY2,polygonCoordinates) => { 
    for (let i = 0; i < polygonCoordinates.length; i++) {
        if(lineLineCollision(firstLineX,firstLineY,firstLineX2,firstLineY2,polygonCoordinates[i][0],polygonCoordinates[i][1],polygonCoordinates[i+1>polygonCoordinates.length ? 0 : (i+1)][0],polygonCoordinates[i+1>polygonCoordinates.length ? 0 : (i+1)][1]) == true) return true
        return false
    }
}

module.exports.linePolygonCollision = linePolygonCollision

const dot = (vector1, vector2) => {
    return (vector1[0] * vector2[0]) + (vector1[1] * vector2[1])
}
//done
const lineCircleCollision = (firstLine1X, firstLineY1, firstLineX2, firstLineY2, circleX, circleY, circleRadius) => {
    var ac = [circleX - firstLine1X, circleY - firstLineY1]
    var ab = [firstLineX2 - firstLine1X, firstLineY2 - firstLineY1]
    var ab2 = dot(ab, ab)
    var acab = dot(ac, ab)
    var t = acab / ab2
    t = (t < 0) ? 0 : t
    t = (t > 1) ? 1 : t
    var h = [(ab[0] * t + firstLine1X) - xc, (ab[1] * t + firstLineY1) - circleY]
    var h2 = dot(h, h)
    return h2 <= circleRadius * circleRadius
}

module.exports.lineCircleCollision = lineCircleCollision

const rectanglePolygonCollision = (rectangleCoordinates,polygonCoordinates) => {
    for(var i = 0; i<rectangleCoordinates.length;i++){
        for(var j = 0; j<polygonCoordinates.length;j++ ){
            if(lineLineCollision(rectangleCoordinates[i][0],rectangleCoordinates[i][1],rectangleCoordinates[i+1>polygonCoordinates.length ? 0 : (i+1)][0],rectangleCoordinates[i+1>polygonCoordinates.length ? 0 : (i+1)],polygonCoordinates[i][0],polygonCoordinates[i][1],polygonCoordinates[i+1>polygonCoordinates.length ? 0 : (i+1)][0],polygonCoordinates[i+1>polygonCoordinates.length ? 0 : (i+1)][1]) == true) return true
        }
    }
}

module.exports.rectanglePolygonCollision = rectanglePolygonCollision

const polygonPolygonCollision = (firstPolygonArray,secondPolygonArray) => {
    for(var i =0;i<firstPolygonArray.length;i++){
        for(var j = 0; j<secondPolygonArray.length;j++){
            var x1 = firstPolygonArray.edgeCoordinates[i][0]
            var y1 = firstPolygonArray.edgeCoordinates[i][1]
            var x2 = firstPolygonArray.edgeCoordinates[(i+1) >= firstPolygonArray.length ? 0 : (i+1)][0]
            var y2 = firstPolygonArray.edgeCoordinates[(i+1) >= firstPolygonArray.length ? 0 : (i+1)][1]
            var a1 = secondPolygonArray.edgeCoordinates[j][0]
            var b1 = secondPolygonArray.edgeCoordinates[j][1]
            var a2 = secondPolygonArray.edgeCoordinates[(j+1) >= secondPolygonArray.length ? 0 : (j+1)][0]
            var b2 = secondPolygonArray.edgeCoordinates[(j+1) >= secondPolygonArray.length ? 0 : (j+1)][1]
            if(lineLineCollision(x1,y1,x2,y2,a1,b1,a2,b2)) return true
            return false
        }
    }
}

module.exports.polygonPolygonCollision = polygonPolygonCollision

const rectangleEllipseCollision = () => { }

const circleEllipseCollision = () => { }

const circlePolygonCollision = () => { }

const ellipseEllipseCollision = () => { }

const lineEllipseCollision = () => { }

const ellipsePolygonCollision = () => { }