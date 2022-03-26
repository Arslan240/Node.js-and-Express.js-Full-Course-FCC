// Filesystem modules - fs
// Files system module contains async and sync functions. Right now we'll use only sync funcitons.

const { readFileSync, writeFileSync}  = require('fs')

// Reading synchronously, readFileSync accepts two parameter ('path', 'encoding') - Encoding by default is utf8
const firstFile = readFileSync('./subfolder/first-file.txt', 'utf-8')
const secondFile = readFileSync('./subfolder/second-file.txt', 'utf-8')

console.log(firstFile, secondFile);

// Now we'll write this to a file, while we pass path to writeFileSync if file exists then fine, otherwise node will create a new file with provided name
// (path, text, {append/overwrite etc types}) - a: append
writeFileSync('./subfolder/result.txt', `${firstFile} , ${secondFile}`, {flag: 'a'})
