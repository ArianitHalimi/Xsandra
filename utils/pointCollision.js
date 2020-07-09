const pointRectangleCollision = (pointX, pointY, rectangleX, rectangleY, rectangleHeight, rectangleWidth) => {
    if(pointX > rectangleX && pointX < (rectangleX + rectangleWidth) && pointY > rectangleY && pointY < (rectangleY + rectangleHeight)) return true
    return false
}

module.exports.pointRectangleCollision = pointRectangleCollision

const pointCircleCollision = (pointX,pointY,circleX, circleY, circleRadius) => {
    if(circleRadius == 0) return false
    if(Math.sqrt((pointX-circleX)*(pointX-circleX) + (pointY-circleY)*(pointY-circleY)) <= circleRadius) return true
    return false
}

module.exports.pointCircleCollision = pointCircleCollision

const pointPolygonCollision = (pointX, pointY, polygonVertex) => {
    var isodd = false
    for(var i = 0; i< polygonVertex.length-1;i++){
        for(var j = 1; j < polygonVertex.length;j++){
            var xiX = polygonVertex[i][0]
            var xiY = polygonVertex[i][1]
            var xjX = polygonVertex[j][0]
            var xjY = polygonVertex[j][1]
            if (((xjY > pointY) != (xiY > pointY)) &&
            (pointX < (xiX - xjX) * (pointY - xjY) / (xiY - xjY) + xjX)){
                isodd = !isodd
            }
        }
    }
    if(isodd) return true
}

module.exports.pointPolygonCollision = pointPolygonCollision

const pointLineCollision = (pointX,pointY, startX, startY, endX, endY) => {
    var d1 = distanceBetweenTwoPoints(pointX,pointY, startX,startY)
    var d2 = distanceBetweenTwoPoints(pointX,pointY, endX, endY)
    var lineLen = distanceBetweenTwoPoints(startX,startY, endX,endY)
    var buffer = 0.1
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) return true
    return false
}

module.exports.pointLineCollision = pointLineCollision

const pointEllipseCollision = (pointX,pointY,ellipseX,ellipseY,ellipseRadius1,ellipseRadius2) => {
    var x = ((pointX-ellipseX)*(pointX-ellipseX))/(ellipseRadius1*ellipseRadius1)
    var y = ((pointY-ellipseY)*(pointY-ellipseY))/(ellipseRadius2*ellipseRadius2)
    return x+y<=1
}

module.exports.pointEllipseCollision = pointEllipseCollision

const distanceBetweenTwoPoints = (x1,y1,x2,y2) => {
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}
