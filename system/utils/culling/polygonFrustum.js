const size = require('../systemUtils/size')

module.exports = (shape,cameraWidth,cameraHeight) => {
    var isInsideX = false
    var isInsideY = false
    for(var i = 1; i<=size(shape.coordinates)/2;i++){
        if(shape.coordinates[`x${i}`] > 0 && shape.coordinates[`x${i}`] < cameraWidth) isInsideX = true
        if(shape.coordinates[`y${i}`] > 0 && shape.coordinates[`y${i}`] < cameraHeight) isInsideY = true
    }
    return isInsideX && isInsideY
}