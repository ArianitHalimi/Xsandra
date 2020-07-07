class System{
    bounddetect = false
    innerBound(){
        this.bounddetect = true
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
            if((obj.options.x + obj.width) > window.innerWidth || obj.options.x<0){
                dx = (-dx)
            }
            if((obj.options.y+ obj.height) > window.innerHeight || obj.options.y<0){
                dy = (-dy)
            }
        }

        obj.options.x += dx;
        obj.options.y += dy;
        
        if(obj.type == 'rectangle'){
            view.simpleShape().rectangle(obj.height,obj.width,obj.options)
        }
        if(obj.type=='image'){
            view.simpleShape().imageAsShape(obj.src,obj.options)
        }
        requestAnimationFrame(()=>{
            this.simulate(view,obj,dx,dy)
        }) 
    }
}

module.exports = System