require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const connectDB = require("./db/connect");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimier = require("express-rate-limit");

// routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

// security middleware
app.set("trust proxy", 1);
app.use(
  rateLimier({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); //by passing the secret to the cookie parser we are signing are cookies
app.use(express.static("./public"));
app.use(fileUpload()); //important for uploading file to the server

// custom error middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const RateLimit = require("express-rate-limit");

app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies); //signed cookies are in this object
  res.send("HOMEPAGE");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); //we set errorHandlerMiddleware at the end.

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`app is listening on ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();

// app.listen(5000,console.log('Server is listening on port 5000'))
