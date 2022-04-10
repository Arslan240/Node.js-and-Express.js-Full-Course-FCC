const Product = require('../models/product')



const getAllProductsStatic = async (req, res) => { 
  const products = await Product.find({price:{$gte:10}})
    .select('name price')
    // .limit(3)
    // .skip(5)  //we use skip for pagination functionality.
  // throw new Error('This is the async error catched by express async error')
  res.status(200).json({products: products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {

  // const products = await Product.find(req.query)
  // console.log(products, products.length)
  
  const {featured,company, name, sort, fields, numericFilters} = req.query
  const queryObj = {}

  

  if(featured) {
    queryObj.featured = featured === 'true' ? true : false
  }
  if(company) {
    queryObj.company = company
  }
  if(name) {
    // this means thatwe are sending regex pattern and options i means case insensitivity.
    queryObj.name = {$regex: name, $options: 'i'}
  }

  if(numericFilters){
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`)
    
    const options = ['price','rating',]
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')
      if(options.includes(field)){
        queryObj[field] = {[operator]:Number(value)}
      }
    })
    console.log(numericFilters);
  }
  console.log(queryObj);

  // to use sort we have to remove await from result = await Product.find(all the things). Why idk because i could not understand what the fuck smilga was saying and could not grasp it.
  let result = Product.find(queryObj)
  
  // sort 
  if(sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }
  else {
    result = result.sort('createdAt')
  }

  // select 
  if(fields){
    const fieldList = fields.split(',').join(' ')
    result = result.select(fieldList) //we'll only select these specified fields
  }

  // for pagination and limits
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  
  result = result.skip(skip).limit(limit)


  // because we removed  await frombefore we have to add await now otherwise the result is a fucking query and not an array of responses.
  const product = await result
  res.status(200).json({product, nbHits: product.length})
}

module.exports = {
  getAllProducts,
  getAllProductsStatic
}