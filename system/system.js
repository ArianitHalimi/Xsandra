const basedOnShape = require('../utils/basedOnShape')
const shapeCollision = require('../utils/shapeCollision')

class System{
    innerBorders = false
    overrideFunction
    collisionShapesArray = []
    move(view,shape,dx,dy,constant=false){
        basedOnShape.deleteBasedOnShape(view,shape)
        basedOnShape.velocityBasedOnShape(shape,dx,dy)
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
    attachCollider(shape,colisionSetup){
        this.collisionShapesArray.push(shape)
    }
    onCollision(foo){

    }
}

module.exports = System