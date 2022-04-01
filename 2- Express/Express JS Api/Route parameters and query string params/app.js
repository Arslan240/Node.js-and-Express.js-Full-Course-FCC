// Route parameters and query string parameters

const express = require('express')
const app = express()

const {products} = require('../data')

app.get('/',(req,res) => { 
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products',(req,res) => { 
  const newProducts = products.map(product => {
    const {id,name,image} = product
    return {id,name,image}
  })

  res.json(newProducts)
})


// app.get(`/api/products/1`,(req,res) => { 
//   const product = products.find(product => product.id === 1)
//   res.json(product) 
// })

// route parameters are parameters which are given by users and are included in route. Based on that we return the result
app.get('/api/products/:productID', (req, res) => { 
  // inside req object we have a property called params.
  console.log(req.params)
  // we can get productID.
  const {productID} = req.params
  const requestedProduct = products.find(product => Number(productID))
  
  if(requestedProduct){
    res.json(requestedProduct)
  } 
  else { //if we don't have products
    res.status(404).send('<h1>404. Product not found</h1>')
  }
})

// QUERY STRING PARAMETERS OR URL PARAMETERS
// these parameters start after '?' in url, we use it like this /api/v1/query?search=a&limit=2
// everything after ? is query and we can add multiple queries by using &
app.get('/api/v1/query', (req, res) => { 
  console.log(req.query);
  const {search, limit} = req.query
  let sortedProducts = [...products]

  if(search){
    sortedProducts = sortedProducts.filter(product => {
      return product.name.startsWith(search)
    })
  }

  if(limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  
  // if the acc to query strings we don't have any data we can check if array is empty or not
  if(sortedProducts.length < 1){
    // res.status(200).send('cound not find')
    // or we can do this which is more common
    // we must send only one response to the request. For that purpose we must use return with res.send()
    return res.status(200).json({success: true, data:[]})
  } 
  res.status(200).json(sortedProducts)
})



app.listen(5000)