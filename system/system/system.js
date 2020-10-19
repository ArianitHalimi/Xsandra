const AnimationFrame = require('../animations/animationFrame')
const polygonEllipseCollison = require('../utils/collision/polygonEllipseCollision')
const polygonPolygonCollision = require('../utils/collision/polygonPolygonCollision')

class System{
    animationFrame
    collisionShapeArray = []

    attachCollider(shapes){
        this.animationFrame = new AnimationFrame()
        this.animationFrame.initialize()
        if(Object.prototype.toString.call(shapes) === '[object Array]'){
            for(var i = 0;i<shapes.length;i++){
                this.collisionShapeArray.push(shapes[i])
            }
        }else{
            this.collisionShapeArray.push(shapes)
        }
    }

    onCollision(callback){
        this.animationFrame.eventFunctions.push(()=>{this.foo(callback)})
    }

    foo(callback){
        if(!this.collisionShapeArray) return
        this.collisionShapeArray.forEach(element=>{
            for(var i=0;i<this.collisionShapeArray.length;i++){
                if(element.ID == this.collisionShapeArray[i].ID ) continue
                if(collisionManager(element,this.collisionShapeArray[i])){
                    callback(element,this.collisionShapeArray[i])
                }
            }
        })
    }
}

const collisionManager = (shape1,shape2) => {
    if(shape1.subtype=='polygon' && shape2.subtype=='polygon') return polygonPolygonCollision(shape1,shape2)
    if(shape1.subtype=='polygon' && shape2.subtype=='elipse') return polygonEllipseCollison(shape1,shape2,shape2.radius ? shape2.radius : shape2.radiusX, shape2.radius ? shape2.radius : shape2.radiusY)
}

module.exports = System