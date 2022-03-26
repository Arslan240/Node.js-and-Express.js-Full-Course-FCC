// Path modules
const path = require('path')

// path.sep returns the separator which is used in this specific system
// e.g in our case it'll be backslash
console.log('separator:',path.sep)

// path.join - this method will make a path using the correct 
// separator for every level we pass in
const filePath = path.join('\introduction','subfolder','anotherFolder','aFile.txt')
console.log(filePath);

// it'll return the last level folder/file name of the path passed in.
const base = path.basename(filePath)
console.log('Base name:',base);

// .resolve will return the absolute path
const absolute = path.resolve(__dirname, filePath)
console.log('Absolue Path:',absolute)

console.log('dirname:',__dirname)