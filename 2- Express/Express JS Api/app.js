
const express = require('express')
const products = require('./data')
const app = express()

app.get('/', (req, res) => {
  res.send(products)
})

app.listen(5000)
