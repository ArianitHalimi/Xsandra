# Xsandra
Javascript Game Engine

## Release Notes 1.1.0
Stable release - Can set camera and frame for multi movement across the frame.  
Optimising the rendering spectrum, faster execution
Lot of bugs fixed
New features will be added in short time so stay turned.  

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
that will be the main script to run.

## Usage
Creating a game with Xsandra is as easy as two javascript files, one as your entry point and one as main script.  
The entry point is used into launching the application and the method defined there are just for the adjustemnt on window.   
Entry point starts with uploading the engine onto file
```bash
const xsandra = require('xsandra').Engine
```
Since the module has been loaded you are allowed to use the predefined methods. Those methods are listed bellow  
Commands:  
    ```run()```: Runs the application.  
    ```toggleFullscreen()```: Makes fullscreen window.  
    ```setWindowSize(width,height)```: Sets window size to specific width and height.  
More methods will be added into new versions of Xsandra.

Apart for setting an entry point you need the gameplay itself. This can be done by creating another file for the script.
This starts by requireing the script from xsandra   
```bash
const Script = require('xsandra').Script
```

Setting the enviroment usually takes a function with the listed command bellow.  
Commands:  
    ```execute(currentFrame)```: executes your script and returns parameter currentFrame as the frameID for the animation loop.  
    ```update(callback)```: executes callback upon every frame.  
    ```requestFPS()```: enables the calculation of FPS and Delta Time.   
Methods:  
    ```fps```: returns current Fps.  
    ```deltaTime```: returns the completion time in seconds since the last frame.  

At the end you must export your script ```module.exports = Script.execute(()=>{...})```  
This will create a blank game. To actually implement any functionality we could use the modules and methods listed bellow.  

First up that you could do is implement shapes of different types and sizes. As growing more shapes will be added.  
To create a shape in the first place you need to require the renderer module. You can start by  
```bash
const view = require('xsandra').View  
OR  
cont renderer = require('xsandra').Renderer  
```

Renderer has those listed commands bellow  
Commands:   
    ```view.screenSize()```: Returns an array containing the width and height respectivly.  
    ```view.setFrame(frameX,frameY)```: Sets the maximum frame camera could reach.  
    ```view.setCamera(cameraX,cameraY)```: Sets camera with particular range.  
    ```view.moveCamera(moveX,moveY)```: Moves the camera across the frame with certain speed. MoveX will move in the X direction and moveY will move in the Y direction.  
    ```view.setBackgound(value)```: Set background color. Value takes a source to an image, a hex or rgba color.  
    ```view.rectangle(height,width,x,y)```: Creates a rectangle with the given properties.   
    ```view.circle(centerX,centerY,radius)```: Creates a circle with the given properties.  
    ```view.triangle(startX,startY,firstPX,firstPY,secondPX,secondPY)```: Creates a triangle with the given property.  
    ```view.simpleShape().text(message,x,y)```: Displays text with the given properties.  
    ```view.line(startX,startY,destinationX,destinationY)```: Creates a line between those two points.  
    For methods that applies to create shapes go to Shapes section.  

Apart from creating different shapes you can play audio and add to your background.  
```bash
const audio = require('xsandra').Audio
```

Commands:  
    ```audio.play(source,loop)```: Plays audio.  
    ```audio.changeAudio(source,loop)```: Changes current playing audio.  
    ```audio.playbackRate(speed)```: Plays the audio in a specific speed.  
    ```audio.playAudioAtTime(time)```: Plays audio at specific time.  
    ```audio.skipAudio()```: Skips the current audio playing.  
    ```audio.videoClip(src)```: Plays video on fullScreen.  
    ```audio.skipVideo()```: Skips the current video playing.  

You can listen to specific events  
```bash
const event = require('xsandra').Event
```
Three main types of events are:  
    ```event.mouseEvent()```: Listens for the mouse events.  
    ```event.keyboardEvent()```: Listens for keyboard events.  
    ```event.windowEvent()```: Listens for window events.  

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
    ```event.keyboardEvent().keyPress(callback)```: Fires when a key is pressed.  
    ```event.keyboardEvent().keyRelease(callback)```: Fires when a key is released.  
    ```event.keyboardEvent().ctrl(callback)```: Fires when ctrl key is pressed.  
    ```event.keyboardEvent().shift(callback)```: Fires when shift key is pressed.  
    ```event.keyboardEvent().alt(callback)```: Fires when alt key is pressed.  
    ```event.keyboardEvent().enter(callback)```: Fires when enter key is pressed.  

The windowEvent has only one subcommand:  
    ```event.windowEvent().resize(callback)```: Is fired when window is resized.  

For collisions use System  
```bash
const system = require('xsandra').System
```  
Commands:  
    ```system.attachCollider(shapes)```: Puts the shape or an array of shapes into collision pool.  
    ```system.onCollision(callback)```: Executes callback when two shapes on collision pool collide. Callback returns two parameters which are the shapes that collided.  

Controlling the movement of shapes has never been easier  
```bash
const controls = require('xsandra').Controls
```  
Commands:  
    ```controls.wasd(shape,moveSpeed,keysAllowed,callback)```: Moves the shape with the given movespeed.Keys allowed is another parameter that you can send as an array like ```[up,left,down,right]``` with boolean values to specify the direction you want to move. Sending false locks that direction. When the movement is completed it returns the callback.  
    ```controls.arrows(shape,moveSpeed,keysAllowed,callback)```: Is the exact form of wasd but uses arrows instead. The directions on allowed are the same as above.  

### Shapes  

All shapes have predefined methods for easy use. The shapes share the same methods with the same parameters(only circle which hasn't predefined rotation)  
    ```style(color,outline,outlineColor)```: puts color given as rgba or hex to the shape. The color is solid. If you want to create outline you can send outline as true and specify an outline color. Some shapes has style different. For example line uses ```style(color,thickness)``` for defining color and also has a parameter for thickness(values allowed are 1 and 2). Other shape that uses different style is text with uses the syntax ```style(fontSize,italic,bold,fontFamily,fontColor)```. fontSize takes a string with specifies the size and uses html5 units(Ex: '15px','15em'). Italic is a boolean value like bold and true means applying italic and bold respectivly. Font family specifies the font style. Supported fonts are the safe fonts from html5. Font color applies color on text.  
    ```rotate(rotationAngle)```: rotates shape for the given angle. Angle supported is degrees. Note that circle does not have rotation method.  
    ```visibility(visibilityFunction)```: Makes a shape visible or not visible. Takes a parameter as string to specify the function. The function must be show, hide and toggle.  
    ```fade(fadeFunction,duration)```: Makes fading effect on the shape. The functions allowed are fadeIn, fadeOut and toggle. Duration is another parameter you can send and takes the number of miliseconds till the fade needs to fade.  
    ```translate(vectorX,vectorY)```: Moves a shape for the given parameters.  
    ```move(moveFuntion, speed)```:  Moves a shape for the given parameters. The only difference from the translate method is that move takes a movefunction (moveRight,moveLeft,moveUp,moveDown) and the speed is an array or single variable. Array moves in X direction and Y direction respectivly. Suggested usage when shape has to move in two direction on the same time.  

### Experimenting
Some features are actually not stable like the debugger, new versions will be released in the next versions.



## Disclaimer
This game engine is still under development so many things are either not implemented or have issues. For every feature you find that has an issue please report it at https://github.com/ArianitHalimi/Xsandra/issues  
Suggestions and ideas are very welcomed and its is a big change of implementation  
For anything you think you can implement or fix, pull requests are welcomed  
Many new updates will come until it is finished so stay tuned  
Always check for new versions of xsandra for new features  


## License
[ISC](https://opensource.org/licenses/ISC)
