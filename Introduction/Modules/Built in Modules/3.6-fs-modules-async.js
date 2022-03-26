// This is the Asynchronous functions of fs module
//  

const {readFile, writeFile} = require('fs')

// readFile (path,encoding,callbackFunction)
readFile('./subfolder/first-file.txt', 'utf-8', (err, result) => { 
  // we check error, if exists we do whatever
})