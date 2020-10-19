let debugLog = () => {
    document.addEventListener("DOMContentLoaded", ()=>{
        const fs = require('fs')
        const path = require('path')

        var debugText = fs.readFileSync(path.join(__dirname,'./debugLog.txt')).toString()

        var text = debugText.split('\n')

        const foo = () => {
            var old = console.log;
            document.body.appendChild(document.createElement('div'))
            document.querySelector('div').setAttribute('id','output')
            document.body.style.margin = 0
            document.querySelector('div').setAttribute('style','color:#ED0F0F;font-family:"Lucida Grande";padding:2% 4%;background-color:#E5E7E9')
            var logger = document.getElementById('output');
            console.log = function (message) {
                if (typeof message == 'object') {
                    logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
                } else {
                    logger.innerHTML += message + '<br />';
                }
            }
        }
        foo()

        for(var i=0;i<text.length;i++){
            console.log(text[i] + '\n')
        }
    });
    
}

debugLog()


