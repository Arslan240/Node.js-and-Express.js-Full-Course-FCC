// Modules 
// CommonJs - every file is a module in node by default
// Modules is smiliar like using import and export in vanilla js or react
// The syntax here is a little diff because we are using common js
// We define different types of code in different files(modules if returning) and then import those functions where ever we need them
// Modules = Encapsulated code (we can only share minimum)

// To require modules we use require function and pass in the path. For custom files/modules we use './' to start
// require returns the exports object so we can assign it to a variable

// we can also destructure directly 
const {john, peter} = require('./3.1-names')
const {printName} = require('./3.2-utils')

printName(john)
// console.log(names);
// console.log(printName);