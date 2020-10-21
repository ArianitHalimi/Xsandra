module.exports = (centerX,centerY,radiusX,radiusY,camWidth,camHeight) => {
    isInsideX = false
    isInsideY = false
    if(centerX + radiusX > 0 && centerX-radiusX<camWidth) isInsideX = true
    if(centerY + radiusY > 0 && centerY-radiusY<camHeight) isInsideY = true
    return isInsideX && isInsideY
}