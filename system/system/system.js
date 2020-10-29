const AnimationFrame = require('../animations/animationFrame')
const Collision = require('../utils/collision/collision')
const core = require('../core/core')

class System{
    #animationFrame

    attachCollider(shapes){
        this.#animationFrame = new AnimationFrame()
        this.#animationFrame.initialize()
        if(Object.prototype.toString.call(shapes) === '[object Array]'){
            for(var i = 0;i<shapes.length;i++){
                core.collisionPool.push(shapes[i])
            }
        }else{
            core.collisionPool.push(shapes)
        }
    }

    onCollision(callback){
        this.#animationFrame.eventFunctions.push(()=>{this.#foo(callback)})
    }

    #foo = (callback) => {
        if(!core.collisionPool) return
        core.collisionPool.forEach(element=>{
            for(var i=0;i<core.collisionPool.length;i++){
                if(element.ID == core.collisionPool[i].ID ) continue
                if(collisionManager(element,core.collisionPool[i])){
                    callback(element,core.collisionPool[i])
                }
            }
        })
    }
}

const collisionManager = (shape1,shape2) => {
    return Collision[`${shape1.subtype}${capitalise(shape2.subtype)}`](shape1,shape2)
}

const capitalise = name => name.charAt(0).toUpperCase() +  name.slice(1)

module.exports = System