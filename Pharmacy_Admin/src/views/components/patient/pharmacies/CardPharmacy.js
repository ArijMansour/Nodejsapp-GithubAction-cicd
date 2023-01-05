import { React, useState, useEffect } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { Button, Center, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Rating from "../rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../app/redux/actions/CartAction";
import Cookies from "js-cookie";
import axios from "axios";
import { Heading, Text } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";

const CardPharmacy = ({ pharmacy, index }) => {
  const [showbtn, setShowbtn] = useState(false);
  const [Incart, setIncart] = useState(false);
  const dispatch = useDispatch();
  const MAX_LENGTH = 20;

  useEffect(() => {}, []);

  return (
    <>
      <div
        className="cardProduct rounded-md"
        onMouseOver={() => {
          setShowbtn(true);
        }}
        onMouseLeave={() => {
          setShowbtn(false);
        }}
      >
        <div className="imgDiv rounded-md">
          <Image
            className="imgProduct"
            boxSize="350px"
            objectFit="cover"
            src={pharmacy.user.picture}
          />
        </div>
        <div className="bottomcard ">
          {/*<Link to={`/medicine/${pharmacy*/}
          {/*    .id}`} exact>*/}
          {/*  <span>{pharmacy.user.username}</span>*/}
          {/*</Link>*/}

          <div className="productpricecard p-2 ">
            {" "}
            {pharmacy.user.username.length > MAX_LENGTH ? (
              <p className="text-sm font-bold uppercase">
                {`${pharmacy.user.username.substring(0, MAX_LENGTH)}...`}
                <a href="#"></a>
              </p>
            ) : (
              <p className="text-sm font-bold uppercase">
                {pharmacy.user.username}
              </p>
            )}
          </div>
          <div className="Rating flex items-start p-2">
            <IoLocationOutline className="text-gray-500 text-lg" />
            <span className="text-gray-500">{pharmacy.address[0].city}</span>
          </div>
        </div>

        <Link to={`/upload-prescription/${pharmacy.user._id}`} exact>
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

export default CardPharmacy;
