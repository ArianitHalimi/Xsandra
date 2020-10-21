const AnimationFrame = require('./animations/animationFrame')

class Script{
    requireFPS = false
    fps = 0
    deltaTime = 0
    #lastCalledTime = 0
    #animationFrame

    execute(foo){
      document.addEventListener('DOMContentLoaded',()=>{
        var elem = document.getElementById('mainframe')
        if(elem) elem.parentNode.removeChild(elem)
        document.body.style.margin = 0
        document.body.style.overflow = 'hidden'
        document.body.appendChild(document.createElement('canvas'));
        document.querySelector('canvas').style.margin = 0;
        document.querySelector('canvas').setAttribute('id','mainframe')
        document.getElementById('mainframe').setAttribute('width',window.innerWidth)
        document.getElementById('mainframe').setAttribute('height',window.innerHeight)
        this.#animationFrame = new AnimationFrame()
        this.#animationFrame.eventFunctions.push(()=> document.getElementById('mainframe').getContext('2d').clearRect(0,0,window.innerWidth,window.innerHeight))
        this.#animationFrame.initialize()
        foo(this.#animationFrame.frameID)
      })
      return () => {}
    }

    calculateFPS(){
      if(!this.#lastCalledTime) {
        this.#lastCalledTime = performance.now()
        return
     }
     this.delta = (performance.now() - this.#lastCalledTime)/1000
     this.#lastCalledTime = performance.now()
     this.fps = Math.floor(1/this.delta);
    }

    update(callback){
      this.#animationFrame.eventFunctions.push(()=>callback())
    }

    requestFPS(){
      this.requireFPS = true
      if(this.requireFPS) this.#animationFrame.eventFunctions.push(()=>this.calculateFPS())
    }
}

module.exports = Script