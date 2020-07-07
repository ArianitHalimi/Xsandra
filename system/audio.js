const path = require('path')

class Audio{
    eventNoChangeMain = false

    play(src){
        var audioElement = document.createElement('audio')
        document.body.appendChild(audioElement);
        document.querySelector('audio').setAttribute('id','mainAudio')
        document.querySelector('audio').setAttribute('style','display: none')
        document.querySelector('audio').setAttribute('src',`${path.join(process.cwd(),src)}`)
        document.querySelector('audio').setAttribute('autoplay','true')
        document.getElementById("mainAudio").autoplay;
        this.eventNoChangeMain = true
    }
    changeAudio(src){
        document.getElementById('mainAudio').src = `${path.join(process.cwd(),src)}`
    }
}

module.exports = Audio