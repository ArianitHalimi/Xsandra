const size = require('./size')

module.exports = (shape,rotationAngle) => {
    var s = Math.sin(rotationAngle)
    var c = Math.cos(rotationAngle)
    for(var i=1;i<=size(shape.coordinates)/2;i++){
        shape.coordinates[`x${i}`] -= shape.centerX
        shape.coordinates[`y${i}`] -= shape.centerY
        var xnew = shape.coordinates[`x${i}`]*c - shape.coordinates[`y${i}`]*s
        var ynew = shape.coordinates[`x${i}`]*s + shape.coordinates[`y${i}`]*c
        shape.coordinates[`x${i}`] = xnew + shape.centerX
        shape.coordinates[`y${i}`] = ynew + shape.centerY
    }
}