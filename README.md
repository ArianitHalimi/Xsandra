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
    ```view.simpleShape().rectangle(height,width,[...options])```: creates a rectangle  
    ```view.simpleShape().text(message,[...options])```: displays text  
    ```view.simpleShape().imageAsShape(imgsrc,[...options])```: creates an image  
    ```view.simpleShape().line(startX,startY,destinationX,destinationY,[...options])```: creates a line between those two points  
    ```view.simpleShape().triangle(startX,startY,firstPX,firstPY,secondPX,secondPY,[...options])```: creates a triangle  
    ```view.simpleShape().circle(x,y,radius,[...options])```: creates a circle  

## License
[ISC](https://opensource.org/licenses/ISC)
