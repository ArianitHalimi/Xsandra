class WindowEvent{
    onResize(callback){
        window.addEventListener('resize', function(e){
            callback(e)
        })
    }
}

module.exports = WindowEvent