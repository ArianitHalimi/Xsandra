const path = require('path')
const fs = require('fs')

class Audio{
    raiseError(errorMessage){
        console.log(errorMessage);
    }
    isSupportedPath(src){
        if(!fs.existsSync(path.join(process.cwd(),src))) this.raiseError('Invalid path')
    }
    isSupported(src){
        var extension = src.split('.')
        if(extension[extension.length-1] !== ( 'mp3' || 'ogg' || 'wav')) this.raiseError('Unsupported format type')
    }
    play(src,loop=false){
        this.isSupportedPath(src)
        this.isSupported(src)
        if(document.getElementById('mainAudio') !== null) this.changeAudio(src,loop)
        else{
            var audioElement = document.createElement('audio')
            document.body.appendChild(audioElement)
            document.querySelector('audio').setAttribute('id','mainAudio')
            document.querySelector('audio').setAttribute('style','display: none')
            document.querySelector('audio').setAttribute('src',`${path.join(process.cwd(),src)}`)
            document.querySelector('audio').setAttribute('autoplay','true')
            if(loop) document.querySelector('audio').setAttribute('loop','true')
            document.getElementById("mainAudio").autoplay
        }
    }

    changeAudio(src,loop=false){
        this.isSupportedPath(src)
        this.isSupported(src)
        if(document.getElementById('mainAudio') == null) this.play(src,loop)
        else{
            document.getElementById('mainAudio').src = `${path.join(process.cwd(),src)}`
            if(loop) document.getElementById('mainAudio').loop = true
        }
    }

    playbackRate(number){
        document.getElementsByTagName('audio')[0].playbackRate = number > 0 ? number : -number
    }

    playOnReverse(){
        if(document.getElementById('mainAudio') == null) this.raiseError('Please set up an audio before using this method')
        //document.querySelector('audio').setAttribute('playbackRate','-1')
    }

    playAudioAtTime(time){
        if(document.getElementById('mainAudio') == null) this.raiseError('Please set up an audio before using this method')
        document.getElementById('mainAudio').currentTime = time < 0 ? -time : time
    }

    skipAudio(){
        document.getElementById('mainAudio').parentNode.removeChild(document.getElementById('mainAudio'))
    }

    videoClip(src){
        var videoElement = document.createElement('video')
        document.body.appendChild(videoElement)
        document.querySelector('video').setAttribute('id','mainVideo')
        document.querySelector('video').setAttribute('style',`height: 100vh; min-height: 100%; width:100vw; min-width:100%;`)
        document.querySelector('video').setAttribute('src',`${path.join(process.cwd(),src)}`)
        document.querySelector('video').setAttribute('autoplay','true')
        document.getElementById('mainVideo').addEventListener('loadedmetadata', ()=>{
            document.getElementById('mainVideo').ontimeupdate = () => {
                if(document.getElementById('mainVideo') && document.getElementById('mainVideo').currentTime == document.getElementById('mainVideo').duration) document.getElementById('mainVideo').parentNode.removeChild(document.getElementById('mainVideo'))
            }
        })
    }
    
    skipVideo(){
        document.getElementById('mainVideo').parentNode.removeChild(document.getElementById('mainVideo'))
    }
}

module.exports = Audio