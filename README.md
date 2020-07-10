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
    ```view.simpleShape().rectangle(height,width,[...options])```: Creates a rectangle  
    ```view.simpleShape().circle(x,y,radius,[...options])```: Creates a circle  
    ```view.simpleShape().ecllipse(x,y,radiusX,radiusY,[...options])```: Creates an ellipse  
    ```view.simpleShape().triangle(startX,startY,firstPX,firstPY,secondPX,secondPY,[...options])```: Creates a triangle  
    ```view.simpleShape().regularPolygon(x,y,radius,sides,[...options])```: Creates a regular polygon with specific sides
    ```view.simpleShape().imageAsShape(imgsrc,[...options])```: Creates an image  
    ```view.simpleShape().text(message,[...options])```: Displays text  
    ```view.simpleShape().line(startX,startY,destinationX,destinationY,[...options])```: Creates a line between those two points  
    ```view.simpleShape().curve(x,y,radius,[...options])```: Creates a curve 

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

Movement is also supported:(Limited supported shapes)
```bash
const system = require('xsandra').System
```  
Commands:  
    ```system.move(currentView,shape,dx,dy,[constant])```: Moves a shape to the specified direction. If constant is set true then it will move constantly on that direction  
    ```system.lockScreen([switch],[override])```: Locks all shapes inside the screen. Works only on contant speed. On constant speed it reverses direction. If override, you have to implement your own border collision function.  


## Disclaimer
This game engine is still under development so many things are either not implemented or have issues. For every feature you find that has an issue please report it at https://github.com/ArianitHalimi/Xsandra/issues  
Suggestions and ideas are very welcomed and its is a big change of implementation  
For anything you think you can implement or fix, pull requests are welcomed  
Many new updates will come until it is finished so stay tuned  


## License
[ISC](https://opensource.org/licenses/ISC)
