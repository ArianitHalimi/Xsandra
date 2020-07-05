class Script{
    execute(foo){
      document.addEventListener('DOMContentLoaded',()=>{
        var root = document;
        foo(root)
      })
      return () => {}
    }
}

module.exports = Script