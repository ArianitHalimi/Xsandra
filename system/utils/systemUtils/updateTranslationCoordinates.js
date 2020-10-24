const size = require('./size')

module.exports = (shape,vecX,vecY) => {
    for(var i=1; i<=size(shape.coordinates)/2;i++){
        shape.coordinates[`x${i}`] += vecX
        shape.coordinates[`y${i}`] += vecY
    }
}