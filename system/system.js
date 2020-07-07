class System{
    bounddetect = false
    isGravityApplied = false
    gravity = 0
    friction = 0
    innerBound(){
        this.bounddetect = true
    }
    applyGravity(gravity,friction){
        this.isGravityApplied = true
        this.gravity = gravity
        this.friction = friction
    }
    unapplyGravity(){
        this.isGravityApplied = false
    }
    simulate(view,obj,dx,dy){
        try{
            if(obj.options.outline && typeof obj.options.outlineSize == 'undefined') obj.options.outlineSize = 1
            if(obj.options.outline) view.simpleShape().deleteShape((obj.options.x-obj.options.outlineSize),(obj.options.y-obj.options.outlineSize),(obj.height+obj.options.outlineSize+2),(obj.width+obj.options.outlineSize+2))
        }catch(err){
            //
        }
        view.simpleShape().deleteShape(obj.options.x,obj.options.y,obj.height+1,obj.width+1)
        
        if(this.bounddetect){
            console.log(dy);
            
            if((obj.options.x + obj.width) > window.innerWidth || obj.options.x<0){
                dx = (-dx)
            }
            if((obj.options.y + obj.height) > window.innerHeight || obj.options.y<0){
                if(this.isGravityApplied) dy = (-dy) * this.friction
                else  dy = (-dy)
            }else{
                if(this.isGravityApplied) dy += this.gravity
            }
        }

        obj.options.x += dx;
        obj.options.y += dy;
        
        if(obj.type == 'rectangle'){
            view.simpleShape().rectangle(obj.height,obj.width,obj.options)
        }
        requestAnimationFrame(()=>{
            this.simulate(view,obj,dx,dy)
        }) 
    }
}

module.exports = System