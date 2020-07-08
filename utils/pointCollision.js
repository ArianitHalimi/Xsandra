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

const pointLineCollision = () => {
    //to be implemented
}

module.exports.pointLineCollision = pointLineCollision

const pointEllipseCollision = () => {
    //to be implemented
}

module.exports.pointEllipseCollision = pointEllipseCollision


