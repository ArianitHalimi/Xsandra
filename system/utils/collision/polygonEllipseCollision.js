const pointEllipseCollision = require('../mouseCollision/pointEllipseCollision')

const lineEllipseCollision = (lineX1,lineY1,lineX2,lineY2,shape,radius1,radius2) => {
    if(pointEllipseCollision(lineX1,lineY1,shape,radius1,radius2)) return true
    lineX1 -= shape.centerX
    lineX2 -= shape.centerX
    lineY1 -= shape.centerY
    lineY2 -= shape.centerY
    var A = (lineX1-lineX2)*(lineX1-lineX2)/(radius1*radius1)
    var B = 2 * lineX1 * (lineX2 - lineX1)/(radius1*radius1) + 2 * lineY1 * (lineY2 - lineY1) /(radius2*radius2)
    var C = (lineX1 * lineX1)/(radius1*radius1) + (lineY1 * lineY1)/(radius2*radius2) - 1
    var D = B * B - 4 * A * C
    if (D === 0){
        var t = -B / 2 / A
        return t >= 0 && t <= 1
    }
    else if (D > 0){
        var sqrt = Math.sqrt(D)
        var t1 = (-B + sqrt) / 2 / A
        var t2 = (-B - sqrt) / 2 / A
        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)
    }
    return false
}

module.exports = (polygon,ellipse,ellipseRadius1,ellipseRadius2,shape) => {
    for(var i=1;i<size(polygon.coordinates)/2;i++){
        return lineEllipseCollision(polygon.coordinates[`x${i}`],
        polygon.coordinates[`y${i}`],
        polygon.coordinates[`x${(i+1)}`],
        polygon.coordinates[`y${(i+1)}`],
        ellipse,
        ellipseRadius1,
        ellipseRadius2
        )
    }
}

size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};