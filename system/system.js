const basedOnShape = require('../utils/basedOnShape')
const shapeCollision = require('../utils/shapeCollision')

class System{
    innerBorders = false
    overrideFunction
    onCollisionFunction
    collisionShapesArray = []
    move(view,shape,dx,dy,constant=false){
        basedOnShape.deleteBasedOnShape(view,shape)
        basedOnShape.velocityBasedOnShape(shape,dx,dy)
        var result = this.detectCollision()
        if(result!==false && typeof this.onCollisionFunction !== 'undefined') this.onCollisionFunction(result[1],result[2])
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
            for(var i=0;i<this.collisionShapesArray.length;i++){
                if(shapeCollision.determineCollision(this.collisionShapesArray[i],this.collisionShapesArray[(i+1) >= this.collisionShapesArray.length ? 0 : i+1])) return [true,this.collisionShapesArray[i],this.collisionShapesArray[(i+1) >= this.collisionShapesArray.length ? 0 : i+1]]
                return false
            }
        }
    }
}

module.exports = System