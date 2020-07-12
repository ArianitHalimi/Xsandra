const basedOnShape = require('../utils/basedOnShape')
const shapeCollision = require('../utils/shapeCollision')

class System{
    innerBorders = false
    overrideFunction
    onCollisionFunction
    collisionShapesArray = []
    staticShapePool = []
    stopCurrentFrame = false
    move(view,shape,velocity = {dx,dy},constant=false){
        if(this.stopCurrentFrame && !constant) return
        var ctx = document.getElementById('mainframe').getContext('2d')
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        this.staticShapePool.forEach(element=>{
            basedOnShape.recreateBasedOnShape(view,element)
        })
        this.collisionShapesArray.forEach(element=>{
            basedOnShape.recreateBasedOnShape(view,element)
        })
        basedOnShape.velocityBasedOnShape(shape,velocity.dx,velocity.dy)
        var result = this.detectCollision()
        if(result.length !== 0){
            if(typeof this.onCollisionFunction !== 'undefined') this.onCollisionFunction(result[0][1],result[0][2],velocity)
        } 
        if(this.innerBorders) {
            if(this.overrideFunction) this.overrideFunction(velocity)
            else{
                velocity.dx = basedOnShape.lockScreenBasedOnShape(shape,velocity.dx,velocity.dy,constant)[0]
                velocity.dy = basedOnShape.lockScreenBasedOnShape(shape,velocity.dx,velocity.dy,constant)[1]
            }
        }
        if(this.stopCurrentFrame) return
        if(constant) requestAnimationFrame(()=>{ this.move(view,shape,velocity,constant) }) 
    }
    lockScreen(innerBorders = true,override){
        this.innerBorders = innerBorders
        if(override) this.overrideFunction = override
    }
    attachCollider(shape){
        if(Object.prototype.toString.call(shape) === '[object Array]'){
            for(var i =0 ;i<shape.length;i++){
                this.collisionShapesArray.push(shape[i])
            }
        }else this.collisionShapesArray.push(shape)
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
        if(Object.prototype.toString.call(shape) === '[object Array]'){
            for(var i = 0; i<shape.length;i++){
                this.staticShapePool.push(shape[i])
            }
        }else this.staticShapePool.push(shape)
    }
    stopFrame(){
        this.stopCurrentFrame = true
    }
}

module.exports = System