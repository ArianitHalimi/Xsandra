const pointPollygonCollision = (pointX,pointY,pollygon) => {
    var isOdd = false
    for (let i = 1; i <= size(pollygon.coordinates)/2; i++) {
        var xiX = pollygon.coordinates[`x${i}`]
        var xiY = pollygon.coordinates[`y${i}`]
        var xjX = pollygon.coordinates[`x${(i+1)>size(pollygon.coordinates)/2 ? 1: (i+1)}`]
        var xjY = pollygon.coordinates[`y${(i+1)>size(pollygon.coordinates)/2 ? 1: (i+1)}`]
        if(((xiY >= pointY && xjY < pointY) || (xiY < pointY && xjY >= pointY)) && (pointX < (xjX-xiX)*(pointY-xiY)/(xjY-xiY)+ xiX)){
            isOdd = !isOdd
        }
    }
    if(isOdd) return true
    return false
}

module.exports = pointPollygonCollision

size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};