var Quickmap = require('./index.js)
var quickmap = new Quickmap()

quickmap.set(3,"hello, this is three");
quickmap.set(5,"hello, this is five");
quickmap.set(7,"hello, this is seven");
console.log(quickmap.get(3))
console.log(quickmap.get(5))
console.log(quickmap.get(7))
quickmap.delete(5)
quickmap.clean()
console.log(quickmap.get(3))
console.log(quickmap.get(5))
console.log(quickmap.get(7))
