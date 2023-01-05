import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../app/redux/actions/CartAction";
import MedicineOnCart from "../../../components/patient/cart/MedicineOnCart";
import Empty from "../../../components/patient/empty/Empty";

import { Flex } from "@chakra-ui/react";

import "./style-cart.css";
const Cartpage = ({ match, location, history }) => {
  const { id } = match.params;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.CartReducer);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const checkoutHandler = () => {
    history.push("./shipping");
  };
  const Line = useRef(null);
  const text = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      Line.current.classList.add("lineon");
      text.current.classList.add("titleon");
    }, 5);

    return () => {};
  }, []);
  return (
    <>
      <div className="headingA">
        <div className="line" ref={Line}></div>
        <h1 className="title" ref={text}>
          Home/Cart
        </h1>
      </div>
      {cartItems.length === 0 ? (
        <Empty />
      ) : (
        <Flex minH={"50vh"} align={"center"} justify={"center"}>
          <div className="cartfull">
            <div className="cart">
              <h1>Your Cart : {cartItems.length}</h1>
              <div className="productsoncart">
                {cartItems.map((product, index) => (
                  <MedicineOnCart product={product} index={index} />
                ))}
              </div>
            </div>
            <div className="totalcart">
              <h3>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                items) :
              </h3>
              <h3 className="totalprice">
                {cartItems
                  .reduce((acc, item) => (acc + item.qty) * item.price, 0)
                  .toFixed(2)}
                $
              </h3>
              <h3>Delivery :</h3>
              <h3 className="totalprice">For free.</h3>
              <h3>Taxes :</h3>
              <h3 className="totalprice">-- --.</h3>
              <h3>Total :</h3>
              <h3 className="totalprice">
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
                $
              </h3>
              <button
                className="checkoutbtn"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </Flex>
      )}
    </>
  );
};

export default Cartpage;
