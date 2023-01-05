import React, { useState } from "react";
import { Input, Stack, Select, Image, Button, Link } from "@chakra-ui/react";
import { RiShoppingCart2Line } from "react-icons/ri";
import "./checkout.css";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAddressshipping,
  savepaymentmethod,
} from "../../../../app/redux/actions/CartAction";
import AddAdress from "../address/AddAdress";

const Checkout = ({ history }) => {
  const cart = useSelector((state) => state.CartReducer);

  const { shippingAddress } = cart;

  const [country, setCountry] = useState(shippingAddress.country);
  const [city, setCity] = useState(shippingAddress.city);
  const [zip, setZip] = useState(shippingAddress.zip);
  const [state, setState] = useState(shippingAddress.state);
  const [buildingNumber, setBuildingNumber] = useState(
    shippingAddress.buildingNumber
  );
  const [streetName, setStreetName] = useState(shippingAddress.streetName);
  const [statee, setStatee] = useState(shippingAddress.statee);
  const [Payment, setPayment] = useState("Card");

  const dispatch = useDispatch();
  const [carddetails, setcarddetails] = useState(true);

  const handleorder = (e) => {
    e.preventDefault();

    let x = null;
    if (zip === "") {
      x = "not found";
    } else x = zip;

    dispatch(saveAddressshipping(shippingAddress));
    dispatch(savepaymentmethod(Payment));
    history.push("/shipping/placeorder");
  };

  return (
    <div>
      <div className="limit-check">
        <div className="info-check">
          <form onSubmit={handleorder}>
            <div className="payment-check">
              <h1>Add Your address</h1>
              <AddAdress />
              {/* <h1>Payment Method</h1>
              <input
                onChange={(e) => {
                  setcarddetails(true);
                  setPayment("cash");
                }}
                checked={carddetails}
                type="radio"
                name="payment"
                id="cash"
              />
              <label for="card" className="this-label">
                Cash (Godem beb Dar)
              </label>

              <input
                onChange={(e) => {
                  setcarddetails(true);
                  setPayment("card");
                }}
                checked={carddetails}
                type="radio"
                name="payment"
                id="card"
              />
              <label for="card" className="this-label">
                Credit Card
              </label>
              <div className="accept-cards-imgs">
                <Image src="https://i.imgur.com/AHCoUZO.png" alt="visa" />
                <Image src="https://i.imgur.com/l8OAGyo.png" alt="master" />
                <Image src="https://i.imgur.com/IDHC2iv.png" alt="discover" />
              </div>
              <div className={carddetails ? "detailsenable" : "detailsdisable"}>
                <div>
                  <label for="name-card" className="this-label">
                    Name on Card
                  </label>
                  <br />
                  <Input
                    variant="flushed"
                    id="name-card"
                    placeholder="Souhail Bourhjoul"
                  />
                </div>
                <div>
                  <label for="number-card" className="this-label">
                    Credit card number
                  </label>
                  <br />
                  <Input
                    variant="flushed"
                    id="number-card"
                    placeholder="3333-1111-8888-2222"
                  />
                </div>
                <div>
                  <label for="expir-mt-card" className="this-label">
                    Exp Month
                  </label>
                  <br />
                  <Input
                    variant="flushed"
                    id="expir-mt-card"
                    placeholder="January"
                  />
                </div>
                <div className="exp-ye-cvv-check">
                  <div>
                    <label for="exp-year" className="this-label">
                      Exp Year
                    </label>
                    <Input variant="flushed" placeholder="2023" id="exp-year" />
                  </div>
                  <div>
                    <label for="cvv-check" className="this-label">
                      Cvv
                    </label>
                    <Input variant="flushed" placeholder="512" id="cvv-check" />
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => {
                  setcarddetails(false);
                  setPayment("paypal");
                }}
                type="radio"
                name="payment"
                id="paypal"
              />
              <label for="paypal" className="this-label">
                {" "}
                Paypal
              </label>
              <Image
                src="https://i.imgur.com/W5vSLzb.png"
                alt="paypal"
                width="120px"
                height="40px"
              />
            </div>{" "}
            <div class="confirm"> */}
              <Button type="submit" colorScheme="blue" mr={3}>
                Place order
              </Button>
            </div>
          </form>

          <div class="your-products">
            {cart.cartItems.length === 0 ? (
              <h1>
                {" "}
                <RiShoppingCart2Line size="29" />
                Cart(0)
              </h1>
            ) : (
              <>
                <h1>
                  {" "}
                  <RiShoppingCart2Line size="29" />
                  Cart({cart.cartItems.length})
                </h1>
                <div className="cart-summ">
                  {cart.cartItems.map((item, index) => (
                    <p key={index}>
                      {item.qty} X{" "}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                      <b>${item.qty * item.price}</b>
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
