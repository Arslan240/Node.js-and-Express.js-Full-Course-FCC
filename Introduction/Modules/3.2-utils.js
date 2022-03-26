const printName = (name) => console.log(name);

// modules is a global object which contains an object of exports
// to export objects, functions etc we assign them to module.exports object. By default it's empty.
module.exports = {printName}