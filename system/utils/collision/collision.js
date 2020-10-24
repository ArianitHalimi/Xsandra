const polygonPolygonCollision = require('./polygonPolygonCollision')
const polygonEllipseCollision = require('./polygonPolygonCollision')

class Collision{
    polygonPolygon(poly1,poly2){
        return polygonPolygonCollision(poly1,poly2)
    }
    polygonEllipse(polygon,ellipse){
        return polygonEllipseCollision(polygon,ellipse,ellipse.radius ? ellipse.radius : ellipse.radiusX, ellipse.radius ? ellipse.radius : ellipse.radiusY)
    }
}

module.exports = new Collision