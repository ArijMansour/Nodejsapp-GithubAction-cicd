import { Image } from "@chakra-ui/image";
import React, { useRef, useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
} from "../../../../app/redux/actions/CartAction";

const MedicineOnCart = ({ product, index }) => {
  const dispatch = useDispatch();

  const [qty, setqty] = useState(0);
  const select = useRef(null);
  useEffect(() => {
    console.log(product);
    return () => {};
  }, []);

  const optionvalue = () => {
    setqty(parseInt(select.current.value));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="productcart">
      <div className="imagecart">
        <Image objectFit="cover" src={product.image} />
        {/* {product.image.length > 1 ? (
          <Image objectFit="cover" src={product.image[index]} />
        ) : (
          <Image objectFit="cover" src={product.imag} />
        )} */}
      </div>

      <div className="flex-col px-8">
        <Link to={`/product/TND{product.product}`}>
          <h2 className="productname  text-gray-500 text-sm">
            <span style={{ color: "black" }}>Name</span>: {product.name}
          </h2>
        </Link>
        <h2 className="productname  text-gray-500 text-sm">
          <span style={{ color: "black" }}>Price: </span>: {product.price} TND
        </h2>

        <p className="sandh">Delievery: sold and shiped by our Agent </p>
      </div>
      <div className="qtyoption">
        <Select
          ref={select}
          defaultValue={product.qty}
          onChange={(e) =>
            dispatch(addToCart(product.product, Number(e.target.value)))
          }
        >
          {[...Array(product.countInStock).keys()].map((x) => (
            <option value={x + 1}> {x + 1}</option>
          ))}
        </Select>
        <h2>
          {(qty === 0
            ? product.qty * product.price
            : qty * product.price
          ).toFixed(2)}
          TND
        </h2>
      </div>
      <AiFillDelete
        className="deletecart"
        size="26"
        onClick={() => removeFromCartHandler(product.product)}
      />
    </div>
  );
};

export default MedicineOnCart;
