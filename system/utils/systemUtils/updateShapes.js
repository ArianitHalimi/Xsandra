const size = require('./size')

module.exports = (shapesArray,moveX,moveY) => {
    shapesArray.forEach(el=>{
        if(el.subtype=='ellipse'){
            el.centerX -= moveX
            el.centerY -= moveY
        }else{
            for(var i=1;i<=size(el.coordinates)/2;i++){
                el.coordinates[`x${i}`] -= moveX
                el.coordinates[`y${i}`] -= moveY
            }
        }
    })
}