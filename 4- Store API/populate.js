require('dotenv').config()
 
// we need to connect to db again to populate the db

const connectDB = require('./db/connect')
const Product = require('./models/product')

// this contains data 
const jsonProducts = require('./products.json')


const start = async () => { 
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log('success');
    process.exit(0)
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
 }

 start()