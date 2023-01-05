import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrder } from "../../../../app/redux/actions/orderActions";

import "./Placeorder.css";
import { apiNotification } from "../../../../app/redux/actions/notificationAction";
import { isAuth } from "../../../../_helper/auth";
import { Image } from "@chakra-ui/react";
export default function Placeorder({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer);
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {}, []);
  const Placeorderhanlder = () => {
    alert(JSON.stringify(cart));

    dispatch(
      CreateOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );

    localStorage.removeItem("cartItems");
    // let notifData = {
    //   Owner: isAuth().id,
    //   Message: "New order is coming",

    //   Pharmacy: id,

    // const res2 = apiNotification.addNotification(notifData);
    // socket.current.emit("addNewNotification", id);
    // console.log(res2);
  };

  useEffect(() => {
    if (success) {
      console.log(order._id);
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);
  return (
    <div className="placeorder">
      <div className="informations-placeorder">
        <div className="shipping-placeorder">
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {cart.shippingAddress.city ||
              cart.shippingAddress.city === "city"},{" "}
            {cart.shippingAddress.state ||
              cart.shippingAddress.state === "state"}
            , {cart.shippingAddress.zip || cart.shippingAddress.zip === "zip"},{" "}
            {cart.shippingAddress.country ||
              cart.shippingAddress.country === "country"}
          </p>
        </div>
        <hr />
        <div className="payment-placeorder">
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </p>
        </div>
        <hr />
        <div>
          <h2>Order Items: </h2>
          {cart.cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="orders-placeorder">
              {cart.cartItems.map((item, index) => (
                <div className="p-4">
                  <span className="color-name">
                    <h6 class="font-medium leading-tight text-base mt-0 mb-2 text-gray-600">
                      <div>
                        Item :
                        <Link
                          className=" p-4 text-blue-700 uppercase font-semibold"
                          to={`/product/${item.product}`}
                        >
                          <div className="productpricecard">
                            {" "}
                            {item.name.length > 15 ? (
                              <div>
                                {`${item.name.substring(0, 15)}...`}
                                <a href="#"></a>
                              </div>
                            ) : (
                              <p> {item.name}</p>
                            )}
                          </div>
                        </Link>
                        <Image
                          className=" flex items-end justify-end"
                          boxSize="100px"
                          objectFit="cover"
                          src={item.image}

                          // src={item.image[0].url}
                        />
                      </div>
                      <div className="mt-4">
                        <strong>
                          Total: {item.qty} x ${item.price} = $
                          {item.qty * item.price} DT
                        </strong>
                      </div>
                    </h6>
                  </span>{" "}
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="your-products">
        <div className="cart-summ">
          <h1>Order Summary</h1>

          <div className="calculs-placeorder">
            <h3>Items: </h3>
            <p>${cart.itemsPrice}</p>
            <h3>Shipping: </h3>
            <p>${cart.shippingPrice}</p>
            <h3>Tax: </h3>
            <p>${cart.taxPrice}</p>
            <h3>Total: </h3>
            <p>${cart.totalPrice}</p>
            <div className="div-placeorder-btn">
              <button className="placeorder-btn" onClick={Placeorderhanlder}>
                Place Order
              </button>
              {error && error}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
