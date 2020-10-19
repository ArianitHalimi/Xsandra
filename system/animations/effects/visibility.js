class Visibility{
    show(shape){
        shape.visibilityToggle = false
        return shape
    }

    hide(shape){
        shape.visibilityToggle = true
        return shape
    }

    toggle(shape){
        shape.visibilityToggle = !shape.visibilityToggle
        return shape
    }
}

module.exports = Visibility