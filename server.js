//server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");

const { chats } = require("./server/data/data.js");

const authRouter = require("./server/routes/auth.routes");
const userRouter = require("./server/routes/user.routes");
const requestRouter = require("./server/routes/request.routes");
const categoryRouter = require("./server/routes/category.routes");
const medecineRouter = require("./server/routes/medecine.routes");
const notificationRouter = require("./server/routes/notification.routes");
const chatRouter = require("./server/routes/chat.routes");
const messageRouter = require("./server/routes/message.routes");
const postRouter = require("./server/routes/post.routes");
const cartRouter = require("./server/routes/cart.routes");
const uploadRouter = require("./server/routes/upload.routes");
const initialDataRoutes = require("./server/routes/pharmacy/initialData");
const pageRoutes = require("./server/routes/pharmacy/page");
const addressRoutes = require("./server/routes/address.routes");
const orderRoutes = require("./server/routes/order.routes");
const adminOrderRoute = require("./server/routes/pharmacy/order.routes");
const prescriptionRoute = require("./server/routes/prescription.routes");
const stockRoute = require("./server/routes/stock.routes");

const app = express();
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

//env import

require("dotenv").config();
const port = process.env.SERVER_PORT;

//import db connection config
require("./server/config/db.config");

//app.use(express.static("public"));
//app.use("/uploads", express.static("uploads"));

app.use(cors());

// body parser
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/public", express.static(path.join(__dirname, "uploads")));

//Cookie parser

app.use(cookieParser());

// Use Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

// Request Routes
app.use("/api/v1/request", requestRouter);

//Catg Routes
app.use("/api/v1/", categoryRouter);

//Medecine Routes
app.use("/api/v1/", medecineRouter);

//cart Routes
app.use("/api/v1/", cartRouter);

app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api/v1/", addressRoutes);
app.use("/api/v1/orders/", orderRoutes);
app.use("/api/v1/", adminOrderRoute);

//Notification Routes
app.use("/api/v1/notification", notificationRouter);

app.use("/api/v1/prescription", prescriptionRoute);

app.use("/posts", postRouter);
app.use("/upload", uploadRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.use("/api/v1/stock", stockRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/api/v1/chat", (req, res) => {
  res.send(chats);
  console.log(chats);
});

app.use("/api/messenger", messageRouter);
const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));
