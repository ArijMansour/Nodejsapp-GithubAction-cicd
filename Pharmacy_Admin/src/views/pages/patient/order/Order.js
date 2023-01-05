import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { IoMdDoneAll } from "react-icons/io";
import HashLoader from "react-spinners/HashLoader";

import "./Order.css";

import { Button } from "@chakra-ui/button";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../../../app/redux/types/orderType";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../../../../app/redux/actions/orderActions";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
const Order = ({ match, history }) => {
  const [sdkReady, setsdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingpay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  const userLogin = useSelector((state) => state.auth);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  useEffect(() => {
    if (!userLogin) {
      history.push("/login");
    }
    const addPaypalscript = async () => {
      //Test card : 4032038179168293

      const { data: clientId } = await axios.get(
        "http://localhost:5000/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setsdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({
        type: ORDER_PAY_RESET,
      });
      dispatch({
        type: ORDER_DELIVER_RESET,
      });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalscript();
      } else {
        setsdkReady(true);
      }
    }
  }, []);

  const successpaymenthandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const deliverhandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading || loadingDeliver ? (
    <div className="loading-product">
      <HashLoader
        color={"#1e1e2c"}
        loading={loading || loadingDeliver}
        size={50}
      />
    </div>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <Stack spacing={3}>
      <div className="h-full w-full py-16 px-4 bg-gray-100">
        <div className="bg-white shadow rounded   w-full ml-8 mr-8 p-10   mt-16 ">
          <div className="placeorder">
            <div className="informations-placeorder">
              <div className="shipping-placeorder">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {order.user.username}
                </p>
                <p>
                  <strong> Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}, {order.shippingAddress.country}
                  {order.isDelivered ? (
                    <div className="paid">Delivered at {order.deliveredAt}</div>
                  ) : (
                    <div className="notpaid">NOT Delivered YET</div>
                  )}
                </p>
              </div>
              <hr className="hr" />
              <div className="payment-placeorder">
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                  {order.isPaid ? (
                    <div className="paid">PAID AT {order.paidAt}</div>
                  ) : (
                    <div className="notpaid">NOT PAID YET</div>
                  )}
                </p>
              </div>
              <hr className="hr" />
              <div>
                <h2>Order Items: </h2>
                {order.orderItems.length === 0 ? (
                  <p>Your order is empty</p>
                ) : (
                  <div className="orders-placeorder">
                    {order.orderItems.map((item, index) => (
                      <>
                        <p key={index}>
                          <span className="color-name">
                            <Link to={`/product/${item.product}`}>
                              {item.name}{" "}
                            </Link>{" "}
                            <b>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </b>
                          </span>{" "}
                        </p>
                      </>
                    ))}{" "}
                    <hr className="hr" />
                  </div>
                )}
              </div>

              <div>
                <h2>Order Status: </h2>
                <div className="orders-placeorder">
                  <p>
                    <span className="color-name">
                      <Link to={`/`}>
                        {!order.isDelivered ? (
                          <>
                            {" "}
                            <CircularProgress value={25} color="yellow.400">
                              <CircularProgressLabel>25%</CircularProgressLabel>
                            </CircularProgress>
                            <Text fontSize="1xl">Pending{""}</Text>
                          </>
                        ) : (
                          <>
                            <CircularProgress value={100} color="green.400">
                              <CircularProgressLabel>
                                100%
                              </CircularProgressLabel>
                            </CircularProgress>
                            <Text fontSize="1xl">Pending{""}</Text>
                          </>
                        )}
                      </Link>
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="your-products">
              <div className="cart-summ">
                <h1>Order Summary</h1>

                <div className="calculs-placeorder">
                  <h3>Items: </h3>
                  <p>${order.itemsPrice}</p>
                  <h3>Shipping: </h3>
                  <p>${order.shippingPrice}</p>
                  <h3>Tax: </h3>
                  <p>${order.taxPrice}</p>
                  <h3>Total: </h3>
                  <p>${order.totalPrice}</p>
                </div>
              </div>

              <div className="bottominfos">
                <Box className="mt-6">
                  <button className="relative inline-flex items-center w-full justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group">
                    <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                    <span class="relative w-full text-center text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                      Cancel your order
                    </span>
                  </button>{" "}
                </Box>
                <h1 className="orderid">Order : {order._id}</h1>
                {!order.isPaid && (
                  <>
                    {loadingpay && (
                      <div className="loading-product">
                        <HashLoader
                          color={"#1e1e2c"}
                          loading={loading}
                          size={50}
                        />
                      </div>
                    )}
                    {!sdkReady ? (
                      <div className="loading-product">
                        <HashLoader
                          color={"#1e1e2c"}
                          loading={loading}
                          size={50}
                        />
                      </div>
                    ) : (
                      <div className="paypalbuttons">
                        <PayPalButton
                          className="buttonsp"
                          amount={order.totalPrice}
                          onSuccess={successpaymenthandler}
                        />
                      </div>
                    )}
                  </>
                )}
                {userLogin &&
                  userLogin.role === "ADMIN" &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <Button
                      height="40px"
                      width="200px"
                      size="lg"
                      onClick={deliverhandler}
                      leftIcon={<IoMdDoneAll size="16" />}
                      colorScheme="blue"
                      size="xs"
                    >
                      DELIVERED
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default Order;
