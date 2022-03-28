// We require createReadStream which is a function of module fs, it'll create ReadStream 
// now this createReadStream object has access to events = data, error
// using streams we use events because extends Events and we read data in forms of chunks and big sizes 
// By default it is 60kb - which can be changed by changing highWaterMark: ;

const {createReadStream} = require('fs')

// we pass path, an object containing buffer size and encoding property. We pass those parameters as object
const stream = createReadStream('big-file.txt', {highWaterMark: 90000, encoding: 'utf-8'})

// this on event listener accepts type of event which is data - based on this it'll read data and pass the result to our callback funciton
stream.on('data', (result) => { 
  console.log(result);
})

stream.on('error', (error) => { 
  console.log('this is the error boy:',error);
 })