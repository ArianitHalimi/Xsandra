const polygonPolygonCollision = require('./polygonPolygonCollision')
const polygonEllipseCollision = require('./polygonEllipseCollision')

class Collision{
    polygonPolygon(poly1,poly2){
        return polygonPolygonCollision(poly1,poly2)
    }
    polygonEllipse(polygon,ellipse){
        return polygonEllipseCollision(polygon,ellipse,ellipse.radius ? ellipse.radius : ellipse.radiusX, ellipse.radius ? ellipse.radius : ellipse.radiusY)
    }
    ellipsePolygon(ellipse,polygon){
        return this.polygonEllipse(polygon,ellipse)
    }
}

module.exports = new Collision()