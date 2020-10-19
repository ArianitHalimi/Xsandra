const MouseEvent = require('./mouseEvents/mouseEvent')
const KeyboardEvent = require('./keyboardEvents/keyboardEvent')
const WindowEvent = require('./windowEvents/windowEvent')

class Event{
    mouseEvent(){
        return new MouseEvent()
    }
    keyboardEvent(){
        return new KeyboardEvent()
    }
    windowEvent(){
        return new WindowEvent()
    }
}

module.exports = Event