const express = require('express')
const app = express()

app.get('/', (req, res) => { 
  return res.send('<h1>Home page</h1>')
})

app.get('/about',(req, res) => { 
  return res.send('<h1>About page</h1>')
 })


app.listen(5000)
