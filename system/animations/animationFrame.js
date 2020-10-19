const view = require('../../index').Renderer

class AnimationFrame{
    frameID
    fps
    eventFunctions = []
    initialize(){
        if(this.eventFunctions.length!==0){
            for(var i=0;i<this.eventFunctions.length;i++){
                this.eventFunctions[i]()
            }
        }
        this.frameID = requestAnimationFrame(()=>{
            this.initialize()
        })
    }
}

module.exports = AnimationFrame