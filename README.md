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
    ```setWindowSize([width,height])```: Sets window size to specific width and height  

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
    ```view.simpleShape().imageAsShape(imgsrc,[...options])```: Creates an image  
    ```view.simpleShape().triangle(startX,startY,firstPX,firstPY,secondPX,secondPY,[...options])```: Creates a triangle  
    ```view.simpleShape().text(message,[...options])```: Displays text  
    ```view.simpleShape().line(startX,startY,destinationX,destinationY,[...options])```: Creates a line between those two points  

Apart from shapes you can play audio
```bash
const audio = require('xsandra').Audio
```

Commands:  
    ```audio.play(source,loop)```: Plays audio  
    ```audio.changeAudio(source,loop)```: Changes current playing audio  
    ```audio.playbackRate(speed)```: Plays the audio in a specific speed  
    ```audio.playAudioAtTime(time)```: Plays audio at specific time

You can listen to specific events.  
```bash
const event = require('xsandra').Event
```
Three main types of events are:
    ```event.mouseEvent()```: Listens for the mouse events  
    ```event.keyboardEvent()```: Listens for keyboard events(unstable)
    ```event.windowEvent()```: Listens for window events(unstable)

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
    

## License
[ISC](https://opensource.org/licenses/ISC)
