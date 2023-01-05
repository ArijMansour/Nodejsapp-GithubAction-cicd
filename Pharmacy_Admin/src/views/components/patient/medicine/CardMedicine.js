import { React, useState, useEffect } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Rating from "../rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../app/redux/actions/CartAction";
const CardMedicine = ({ product, index }) => {
  const [showbtn, setShowbtn] = useState(false);
  const [Incart, setIncart] = useState(false);
  const [inStock, setInStock] = useState(true);
  const dispatch = useDispatch();

  const Cart = useSelector((state) => state.CartReducer);
  const { cartItems } = Cart;
  useEffect(() => {
    const isincart = cartItems.find((x) => x.product === product._id);
    if (isincart) {
      setIncart(true);
    }
    return () => {};
  });
  const addcart = () => {
    setIncart(true);
    dispatch(addToCart(product._id, 1));
  };

  return (
    <>
      <div
        className="cardProduct"
        onMouseOver={() => {
          setShowbtn(true);
        }}
        onMouseLeave={() => {
          setShowbtn(false);
        }}
      >
        <div className="imgDiv">
          <Image
            className="imgProduct"
            boxSize="350px"
            objectFit="cover"
            src={product.multiple_resources[0].url}
          />
        </div>
        <div className="bottomcard">
          <Link to={`/medicine/${product._id}`} exact>
            <span
              className="
            text-xl
            font-bold
            
            text-blue-600"
            >
              {`${product.name.substring(0, 16)}...`}
              <a href="#"></a>
            </span>
          </Link>
          {inStock ? (
            Incart ? (
              <HiShoppingCart className="iconFav" size="26" />
            ) : (
              <HiOutlineShoppingCart
                className="iconFav"
                color="#999"
                size="26"
                onClick={addcart}
              />
            )
          ) : (
            <></>
          )}

          <div className="productpricecard">
            <span className="price">{`${product.price} DT`}</span>
          </div>
          <div className="Rating">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </div>

        <Link to={`/medicine/${product._id}`} exact>
          <button
            className={showbtn ? "QuickView QuickViewActive" : "QuickView"}
          >
            {" "}
            View Details
          </button>
        </Link>
      </div>
    </>
  );
};

export default CardMedicine;
