require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// connectDB
const connectDB = require('./db/connect')

// authentication Middleware
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({ windowMs: 60 * 1000, max: 60}))


// dummy routes
app.get('/', (req, res) => { 
  res.send('Jobs Api')
 })
// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser,jobsRouter) //we wamt tp authenticate every request for jobs route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
