const polygonFrustrum = require('./polygonFrustum')
const ellipseFrustrum = require('./ellipseFrustrum')

module.exports = (shape,camWidth,camHeight) => {
    if(shape.subtype=='polygon'){
        if(polygonFrustrum(shape,camWidth,camHeight)) shape.enableRender()
        else shape.disableRender()
    }
    if(shape.subtype=='elipse'){
        if(ellipseFrustrum(shape.centerX,shape.centerY,shape.radius ? shape.radius : shape.radiusX,shape.radius ? shape.radius : shape.radiusX,camWidth,camHeight)) shape.enableRender()
        else shape.disableRender()
    }
}