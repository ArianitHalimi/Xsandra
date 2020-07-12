const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

module.exports.getRandomNumber = getRandomNumber

const stringEscape = (string) =>{
    return string ? string.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\x00-\x1F\x80-\x9F]/g,hex) : string;
    function hex(c) { var v = '0'+c.charCodeAt(0).toString(16); return '\\x'+v.substr(v.length-2); }
}

module.exports.stringEscape = stringEscape
