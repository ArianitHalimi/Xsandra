# Xsandra
Javascript Game Engine

## Installation
To install Xsandra Game Engine, use npm.
Open terminal and write
```bash
npm i xsandra
```

## Startup
Since Xsandra runs on electron, in package.json create a start script
```bash
"start": "electron ."
```

Aslo since Xsandra like every game engine has scripts, create a package.json property 
```bash
"entryScript":"yourScript.js"
```
that will be the main script to run

## Usage
To use Xsandra you need two javascript files, one as your entry point and one as main script

On main file to access Xsandra you need to have
```bash
const xsandra = require('xsandra').Engine
```

Commands:  
    ```run()```: Runs the application  
    ```toggleFullscreen()```: Makes fullscreen window  
    ```setWindowSize(width,height)```: Sets window size to specific width and height  

On script file you need to have
```bash
const Script = require('xsandra').Script
```

Commands:  
    ```execute([root])```: executes your script with root as base of the window

At the end you must export your script ```module.exports = Script.execute(()=>{...})```

Inside scripts you can implement shapes
```bash
const view = require('xsandra').View
```

Commands:  
    ```view.initialize()```: Initializes the game  
    ```view.setBackgound(value)```: Set background color. Value takes a source to an image, or a hex or rgba color.  
    ```view.simpleShape().rectangle(height,width,x,y,color,outline,outlineColor,outlineSize)```: Creates a rectangle  
    ```view.simpleShape().circle(x,y,radius,color,outline,outlineColor)```: Creates a circle  
    ```view.simpleShape().ellipse(x,y,radiusX,radiusY,color,outline,outlineColor)```: Creates an ellipse  
    ```view.simpleShape().triangle(startX,startY,firstPX,firstPY,secondPX,secondPY,color,outline,outlineColor)```: Creates a triangle  
    ```view.simpleShape().imageAsShape(src,x,y,height,width)```: Creates an image  
    ```view.simpleShape().text(message,x,y,fontSize,italic,bold,fontFamily,fontColor)```: Displays text  
    ```view.simpleShape().line(startX,startY,destinationX,destinationY,color,thickness)```: Creates a line between those two points  
    ```view.complexShape().curve(x,y,radius,startAngle,endAngle,antiClockWise,color,outline,outlineColor)```: Creates a curve  
    ```view.complexShape().regularPolygon(centerX,centerY,radius,sides,color)```: Creates a regular polygon with specific sides  

Apart from shapes you can play audio
```bash
const audio = require('xsandra').Audio
```

Commands:  
    ```audio.play(source,loop)```: Plays audio  
    ```audio.changeAudio(source,loop)```: Changes current playing audio  
    ```audio.playbackRate(speed)```: Plays the audio in a specific speed  
    ```audio.playAudioAtTime(time)```: Plays audio at specific time  
    ```audio.skipAudio()```: Skips the current audio playing  
    ```audio.videoClip(src)```: Plays video on fullScreen  
    ```audio.skipVideo()```: Skips the current video playing  

You can listen to specific events.  
```bash
const event = require('xsandra').Event
```
Three main types of events are:  
    ```event.mouseEvent()```: Listens for the mouse events(regularPolygon and curve not implemented yet)  
    ```event.keyboardEvent()```: Listens for keyboard events  
    ```event.windowEvent()```: Listens for window events  

All these events have chaining methods for their subEvents:  
For example mouseEvents has these submethods:  
    ```event.mouseEvent().on(event,shape,callback)```: Is the main method to listen to the events. You can also use  
    ```event.mouseEvent().click(shape,callback)```: Listens for click event on specific shape. Use ```'screen'``` to listen to event of the entire screen  
    ```event.mouseEvent().wheel(shape,callback)```: Listens for wheel event on specific shape.  
    ```event.mouseEvent().hold(shape,callback)```: Listens for hold event on specific shape.  
    ```event.mouseEvent().release(shape,callback)```: Listens for release event on specific shape.  
    ```event.mouseEvent().rightClick(shape,callback)```: Listens for rightClick event on specific shape.  
    ```event.mouseEvent().wheelClick(shape,callback)```: Listens for wheelClick event on specific shape.  
    ```event.mouseEvent().mouseIn(shape,callback)```: Listens for mouseIn event on specific shape.  
    ```event.mouseEvent().mouseOut(shape,callback)```: Listens for mouseOut event on specific shape.  

Apart from mouseEvents there are keyboardEvents which have these submethods:  
    ```event.keyboardEvent().keyPress(callback)```: Fires when a key is pressed  
    ```event.keyboardEvent().keyRelease(callback)```: Fires when a key is released  
    ```event.keyboardEvent().ctrl(callback)```: Fires when ctrl key is pressed  
    ```event.keyboardEvent().shift(callback)```: Fires when shift key is pressed  
    ```event.keyboardEvent().alt(callback)```: Fires when alt key is pressed  
    ```event.keyboardEvent().enter(callback)```: Fires when enter key is pressed  

The windowEvent has only one subcommand:  
    ```event.windowEvent().resize(callback)```: Is fired when window is resized  

Movement is also supported:(UNDER CONSTRUCTION: Limited supported shapes)
```bash
const system = require('xsandra').System
```  
Commands:  
    ```system.move(currentView,shape,{dx,dy},[constant])```: Moves a shape to the specified direction. If constant is set true then it will move constantly on that direction  
    ```system.lockScreen([switch],[override])```: Locks all shapes inside the screen. Works only on contant speed. On constant speed it reverses direction. If override, you have to implement your own border collision function.  
    ```system.attachCollider(shape)```: Puts the shape into collision pool.  
    ```system.onCollision(callback)```: Executes callback when two shapes on collision pool collide. Callback returns two parameters which are the shapes that collided  
    ```system.static(shape)```: Staticly puts an object into the sceen. If not set, when move function is called, it will delete unstatic shapes  
    ```system.stopFrame()```: When called, it will stop executing the script  


## Disclaimer
This game engine is still under development so many things are either not implemented or have issues. For every feature you find that has an issue please report it at https://github.com/ArianitHalimi/Xsandra/issues  
Suggestions and ideas are very welcomed and its is a big change of implementation  
For anything you think you can implement or fix, pull requests are welcomed  
Many new updates will come until it is finished so stay tuned  
Always check for new versions of xsandra for new features  


## License
[ISC](https://opensource.org/licenses/ISC)
