// This is the Asynchronous functions of fs module
// This asynchronous funcitons comnbination will lead us into callback hell.

const {readFile, writeFile} = require('fs')

// readFile (path,encoding,callbackFunction)
readFile('./subfolder/first-file.txt', 'utf-8', (err, result) => { 
  // we check error, if exists we do whatever with the result
  if(err){
    console.log(err)
    return
  }
  else {
    // the result will have the read value, if we don't have utf-8 then it will be in some form of bytes
    const firstFile = result
    // we read now secondFile
    readFile('./subfolder/second-file.txt','utf-8',(err, result) => { 
      if(err){
        console.log(err);
        return;
      }
      else {
        const secondFile = result
        // now as we have second file also, so we can write it into file
        writeFile('./subfolder/result-async.txt',
          `Here is the text: ${firstFile} , ${secondFile}.\n`), //we can also pass another object of flags and append it
          (err, result) => { 
            if(err){
              console.log(err);
              return
            }else {
              // in our case result will be undefined because writeFile does not return any result.
              console.log(result);
            }
           }

      }
     })
  }
})