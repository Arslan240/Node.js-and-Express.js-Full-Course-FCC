const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "some random value";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee"
    );
  }

  let orderItems = [];
  let subtotal = 0;

  // we use for of loop becz we want to use await, which can't be used inside either map or foreach loop
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      );
    }

    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }
  // calculate total
  const total = tax + shippingFee + subtotal;
  // get client secret - THIS IS FAKE ONE NOT ACTUAL STRIPE
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate({ path: "user", selct: "name" });

  if (orders.length < 1) {
    throw new CustomError.NotFoundError("There are no orders");
  }

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { user } = req;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new CustomError.NotFoundError(`No order wiith id ${orderId}`);
  }

  checkPermissions(user, order.user._id);

  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const { userId } = req.user;
  const orders = await Order.find({ user: userId });

  if (orders.length < 1) {
    throw new CustomError.NotFoundError("There are no orders in your cart");
  }

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => { 
  const { id: orderId } = req.params;
  const {paymentIntentId} = req.body
  const {user: requestingUser} = req

  const order = await Order.findById(orderId)
  if(!order ){
    throw new CustomError.NotFoundError(`No order found with id : ${orderId}`)
  }
  console.log(order);
  checkPermissions(requestingUser, order.user.toString())
  
  order.paymentIntentId = 'paid'
  order.status = 'paid'
  const updatedOrder = await order.save({new: true, runValidators: true})
  res.status(StatusCodes.OK).json({updatedOrder})
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
