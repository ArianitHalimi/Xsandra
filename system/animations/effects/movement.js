const calculate = require('../../utils/calculate')

class Movement{
    moveRight(shape,speed){
        shape.translate(speed,0)
        return shape
    }

    moveLeft(shape,speed){
        shape.translate(-speed,0)
        return shape
    }

    moveUp(shape,speed){
        shape.translate(0,-speed)
        return shape
    }

    moveDown(shape,speed){
        shape.translate(0,speed)
        return shape
    }
}

module.exports = Movement