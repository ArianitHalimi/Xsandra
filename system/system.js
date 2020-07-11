const basedOnShape = require('../utils/basedOnShape')
const shapeCollision = require('../utils/shapeCollision')
var assert = require('assert');

class System{
    innerBorders = false
    overrideFunction
    onCollisionFunction
    collisionShapesArray = []
    staticShapePool = []
    move(view,shape,dx,dy,constant=false){
        var ctx = document.getElementById('mainframe').getContext('2d')
        ctx.clearRect(0,0,window.innerHeight,window.innerWidth)
        this.staticShapePool.forEach(element=>{
            basedOnShape.recreateBasedOnShape(view,element)
        })
        basedOnShape.velocityBasedOnShape(shape,dx,dy)
        var result = this.detectCollision()
        if(result.length !== 0){
            if(typeof this.onCollisionFunction !== 'undefined') this.onCollisionFunction(result[0][1],result[0][2])
        } 
        if(this.innerBorders) {
            if(this.overrideFunction) this.overrideFunction()
            else{
                dx = basedOnShape.lockScreenBasedOnShape(shape,dx,dy,constant)[0]
                dy = basedOnShape.lockScreenBasedOnShape(shape,dx,dy,constant)[1]
            }
        }
        basedOnShape.recreateBasedOnShape(view,shape)

        if(constant) requestAnimationFrame(()=>{ this.move(view,shape,dx,dy,constant) }) 
    }
    lockScreen(innerBorders = true,override){
        this.innerBorders = innerBorders
        if(override) this.overrideFunction = override
    }
    attachCollider(shape){
        this.collisionShapesArray.push(shape)
    }
    onCollision(foo){
        this.onCollisionFunction = foo
    }
    detectCollision(){
        if(this.collisionShapesArray){
            var shapesHasCollided = []
            this.collisionShapesArray.forEach(element=>{
                for(var i=0;i<this.collisionShapesArray.length;i++){
                    if(element==this.collisionShapesArray[i]) continue
                    if(shapeCollision.determineCollision(element,this.collisionShapesArray[i])){
                        shapesHasCollided.push([true,element,this.collisionShapesArray[i]])
                    } 
                }
            })
            return shapesHasCollided
        }
    }
    static(shape){
        this.staticShapePool.push(shape)
    }
}

module.exports = System