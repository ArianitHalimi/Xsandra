const updateRotationCoordinates = (shape,rotationAngle) => {
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

module.exports.updateRotationCoordinates = updateRotationCoordinates

const updateTranslationCoordiates = (shape,vecX,vecY) => {
    for(var i=1; i<=size(shape.coordinates)/2;i++){
        shape.coordinates[`x${i}`] += vecX
        shape.coordinates[`y${i}`] += vecY
    }
}

module.exports.updateTranslationCoordiates = updateTranslationCoordiates

const calculateRGBAValue = (hex) => {
    if(hex.startsWith('rgba')) return reorderRGBAValue(hex)
    hex = hex.toLowerCase();
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255,(c>>8)&255, c&255,1]
        //return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}

const reorderRGBAValue = (rgbaString) => {
    //console.log(rgbaString.match(/[\.\d]+/g))
    return rgbaString.match(/[\.\d]+/g);
}

module.exports.calculateRGBAValue = calculateRGBAValue

size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

const getDistance = (x1,y1,x2,y2) => {
    return Math.hypot(x2-x1, y2-y1)
}

const generateRandomId = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports.generateRandomId = generateRandomId