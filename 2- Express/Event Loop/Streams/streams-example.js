// Now if we send this huge data to the server it'll be in single attempt
// we'll create a server and send this data over it
const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) =>  {
    // This is the better stream reading way
    const data = fs.createReadStream('huge-file.txt','utf8')
    data.on('data', () => { 
      // data.pipe() is some method but i don't really understand what it does
      data.pipe(res)
    })

    // This is the direct file reading way
    // if(req.url === '/'){
    //   const fileData = fs.readFileSync('huge-file.txt','utf8')
    //   res.end(fileData)
    // }
  })
  .listen(5000)
