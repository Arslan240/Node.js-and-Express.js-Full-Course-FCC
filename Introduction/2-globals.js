// As in node.js we don't have access to window object and it's API
// because we are not running inside a browser, it's outer environment
// We have concepts of GLOBALS which means that we have access to global attributes/functions/variables etc
// at all the time. Following are some of the GLOBALS.

// __dirname  - path to current directory name
// __filename - file name
// require    - function to use modules (CommonJS library)
// module     - info about current module (file)
// process    - info about env where the program is being executed e.g. rightnow it's being executed in local env but in production environment it contains relative information


// console.log('Directory\n', __dirname);
// console.log('Filename', __filename);

// console.log(process);

// we can also access the setTimeout and setInterval functions globally
setInterval(() => {
  console.log('Hello World!');
},500)