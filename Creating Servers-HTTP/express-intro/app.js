// We'll redo the navbar app using express
const express = require('express')
const path = require('path')
const app = express()

// we serve the static files and resources by puttin them into a separate folder and pointing our experss server to that folder. Common practice is to name the folder as public
// the path is not working correctly
// static is something about middleware
app.use(express.static('./public'))


// we can just put our html file into the public file as well and express will take care of that. Because the index.html is not dynamic
//   it's same for every one so it's static. When we put index.html in public folder, it serves as root and it'll be served when the homepage is requested. And after that index.html file has all the paths so the assets will also be served by express.
//  we rarely use sendFile. idk what it means.
// app.get('/',(req, res) => {
//   // because we want to send the html file we'll pass the path to the sendFile function, for that purpose we use path module and pass in the absolute path using the resolve method 
//   res.status(200).sendFile(path.resolve(__dirname,'./navbar-app/index.html'))
//   
// })


// we still have
app.all('*',(req, res) => { 
  res.status(404).send('resource not found')
 })

app.listen(5000, () => { console.log('port is listening') })













// const express = require('express')
// const app = express() //we call the express function which creates a server

// // METHODS
// app.get('/',(req,res) => { 
//   // in express we use .send() instead of write or end to send the data 
//   // we can also pass the status code and we can chain it. Though express will send codes by itself but we can do it too.
//   res.status(200).send('<h1>Homepage</h1>')
// })

// app.get('/about',(req,res) => { 
//   res.status(200).send('<h1>This is about page</h1>')
// })

// // express have default 404 page but we can also set our own by using app.all() i don't understand it completely how it works
// app.all('*',(req,res) => { 
//   res.status(404).send('<h1>Resource not found.</h1>')
// })

// app.listen(5000, () => { console.log('port is listening on 5000') })