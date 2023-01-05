const asyncHandler = require("express-async-handler");
const medecineModel = require("../models/medecine.model");

const Order = require("../models/order.model");
const shipperModel = require("../models/shipper.model");
const stockModel = require("../models/stock.model");

// @desc Create new order
// @route POST /api/orders
// @access Private
exports.addorderitems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    pharmacy,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,

      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      pharmacy,
      isOrdered: true,
    });
    console.log("orderitems,", orderItems);

    const createdOrder = await order.save();

    if (order.isOrdered === true) {
      order.orderItems.forEach(async (o) => {
        console.log("product ordered by user : ", o);

        await updateStock(o.name, o.qty);
      });
    }

    res.status(201).json(createdOrder);
  }
});

async function updateStock(name, qty) {
  const product = await stockModel.findOne({ item: name });
  console.log("product quantity before : ", product.quantity);

  product.quantity -= qty;
  console.log("product quantity  after: ", product.quantity);

  const myprodcut = await medecineModel.findOne({ name: name });
  myprodcut.countInStock -= qty;

  await product.save();
  await myprodcut.save();
}

// @desc get order by id
// @route GET /api/orders/:id
// @access Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (order) {
    return res.json(order);
  } else {
    return res.status(404);
  }
});
// @desc update order to paid
// @route update /api/orders/:id/pay
// @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not found");
  }
});

// @desc update order to delivered
// @route update /api/orders/:id/deliver
// @access Private
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not found");
  }
});
// @desc get logged in user orders
// @route GET /api/orders/myorders
// @access Private
exports.GetMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc get orders
// @route GET /api/admin/orders
// @access Private/admin
exports.GetOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id username");
  res.json(orders);
});

exports.assignOrderToShipperController = (req, res) => {
  try {
    shipperModel.findOne({ order: req.body.id }).then((e) => {
      if (e) {
        return res.json({
          exist: true,
          message: "Order Already Assigned to Shipper ",
        });
      } else {
        const dataFind = Order.findOne({ _id: req.body.id });
        console.log(dataFind);
        const dataUpdate = shipperModel.updateOne(
          { phone: req.body.phone },
          { order: dataFind._id },
          { upsert: true }
        );

        console.log(dataUpdate);
        res.json({
          status: true,
          message: "Order Assigned to Shipper Succefully",
          data: dataUpdate,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ statue: false, message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    if (req.body.cancel === "Cancelled") {
      // Increment product stock when user cancelled order
      let productsTemp = [];
      for (const product of req.body.orderItems) {
        productsTemp.push({
          updateOne: {
            filter: { _id: Mongoose.Types.ObjectId(product.id) },
            update: { $inc: { countInStock: +product.countInStock } },
          },
        });
      }
      await Products.bulkWrite(productsTemp);
    }
    await Order.findByIdAndUpdate(req.params.id, {
      cancel: req.body.cancel,
    });
    res.status(200).json({
      message: "Success change status order",
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed change status order",
    });
  }
};
