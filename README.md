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

on script file you need to have
```bash
const Script = require('xsandra').Script
```

Commands:
    ```execute([root])```: executes your script with root as base of the window

At the end you must export your script ```module.exports = Script.execute(()=>{...})```

## License
[ISC](https://opensource.org/licenses/ISC)
