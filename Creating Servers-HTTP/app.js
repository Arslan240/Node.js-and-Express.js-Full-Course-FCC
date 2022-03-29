const http = require('http')
const {readFileSync} = require('fs')
const server = http.createServer((req, res) => { 
  // we have an issue with our app that we don't send any headers.
  // To send headers back in response we use res.writeHead(statusCode, headers)
  // if we write text/plain in content-type then everything will be just as plain text and not as html, html tags will also be written as text in browser window.
  // res.writeHead(200,{'content-type': 'text/html'})
  // res.write('<h1>Home page</h1>')

  // // res.end tells that the communication is ended. We can pass the response to the end method or we can also pass it to the res.write() method
  // // but anyway we have to call res.end()
  // res.end()
  // res.end('<h1>This is homepage</h1>')

const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeSvg = readFileSync('./navbar-app/logo.svg')
const homeLogic = readFileSync('./navbar-app/browser-app.js')

  const url = req.url
  if(url === '/') {
    res.writeHead(200,{'content-type': 'text/html'})
    res.write(homePage)
    res.end()
  } else if(url === '/about'){
    res.writeHead(200,{'content-type': 'text/html'})
    res.write('<h1>About page</h1>')
    res.end()
  }
  else if(url === '/styles.css'){
    res.writeHead(200,{'content-type': 'text/css'})
    res.write(homeStyles)
    res.end()
  }
  else if(url === '/logo.svg'){
    res.writeHead(200,{'content-type': 'image/svg+xml'})
    res.write(homeSvg)
    res.end()
  }
  else if(url === '/browser-app.js'){
    res.writeHead(200,{'content-type': 'text/javascript'})
    res.write(homeLogic)
    res.end()
  } else {
    res.writeHead(404,{'content-type': 'text/html'})
    res.write('<h1>404 Not Found</h1>')
    res.end()
  }
})
 server.listen(5000)