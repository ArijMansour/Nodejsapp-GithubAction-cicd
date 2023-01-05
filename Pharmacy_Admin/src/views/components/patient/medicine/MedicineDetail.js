import React, { useEffect, useState, useRef } from "react";
import Rating from "../rating/Rating";
import { useDispatch, useSelector } from "react-redux";

import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillShop,
} from "react-icons/ai";
import { MdDoNotDisturb } from "react-icons/md";
import { IoLogoFacebook } from "react-icons/io5";

import {
  Image,
  Select,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";

import { Link } from "react-router-dom";
import {
  createproductReview,
  listProductDetails,
} from "../../../../app/redux/actions/MedicineAction";
import { isAuth } from "../../../../_helper/auth";
import { MEDICINE_CREATE_REVIEW_RESET } from "../../../../app/redux/types/MedicineType";
const MedicineDetail = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");

  const imgs = document.querySelectorAll(".img-select a");
  const imgShowcase = useRef(null);
  const imgBtns = [...imgs];
  let imgId = 1;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.medicineDetailsReducer);
  const { loading, error, product } = productDetails;
  const { user } = useSelector((state) => state.auth);
  const productReviewCreate = useSelector(
    (state) => state.medicinereviewCreateReducer
  );
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;
    imgShowcase.current.style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }
  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setrating(0);
      setcomment("");
      dispatch({ type: MEDICINE_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);
  const submithanlder = () => {
    dispatch(
      createproductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  //Handler of button add to cart
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
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
          Home/Medicine
        </h1>
      </div>
      <div className="productpage">
        {loading ? (
          <div className="loading-product">
            <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
          </div>
        ) : error ? (
          <h2>{error} </h2>
        ) : (
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div ref={imgShowcase} className="img-showcase">
                    {product.multiple_resources.map((i) => (
                      <Image src={i.url} />
                    ))}
                  </div>
                </div>
                <div className="img-select">
                  {product.multiple_resources.length > 1 ? (
                    <>
                      <div className="img-item">
                        <a href="#" data-id="1">
                          <Image
                            objectFit="cover"
                            boxSize="200px"
                            src={product.multiple_resources[0].url}
                            alt="shoe image"
                          />
                        </a>
                      </div>
                      <div className="img-item">
                        <a href="#" data-id="2">
                          <Image
                            objectFit="cover"
                            boxSize="200px"
                            src={product.multiple_resources[1].url}
                            alt="shoe image"
                          />
                        </a>
                      </div>
                      <div className="img-item">
                        <a href="#" data-id="3">
                          <Image
                            objectFit="cover"
                            boxSize="200px"
                            src={product.multiple_resources[2].url}
                            alt="shoe image"
                          />
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="img-item">
                      <a href="#" data-id="1">
                        <Image
                          objectFit="cover"
                          boxSize="200px"
                          src={product.multiple_resources[0].url}
                          alt="shoe image"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="product-content">
                <h2 className="product-title">{product.name} </h2>
                <Link to="/shop" className="product-link">
                  BY {product.pharmacy.username}
                </Link>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <div className="product-price">
                  <p className="last-price">
                    Old Price:{" "}
                    <span>{product.price + product.price * 0.5} TND</span>
                  </p>
                  <p className="new-price">
                    New Price: <span>{product.price} TND (5%)</span>
                  </p>
                </div>

                <div className="product-detail">
                  <h2>about this item: </h2>
                  <p>{product.description}</p>
                  {/* <div>
                    <ul>
                      <li>Size</li>{" "}
                      <Select
                        className="select-product"
                        placeholder="Choose an option"
                      >
                        {product.sizes.map((size) => (
                          <option value={size}>{size}</option>
                        ))}
                      </Select>
                    </ul>
                  </div> */}
                  <ul>
                    <li>
                      Status:{" "}
                      <span>
                        {product.countInStock > 0 ? "ìn stock" : "Out Of Stock"}
                      </span>
                    </li>
                    <li>
                      Category:{" "}
                      <span className="text-green-800 bold">
                        {" | " + product.category.name + " | "}
                      </span>
                    </li>
                    <li>
                      Shipping Area: <span>All over the world</span>
                    </li>
                    <div>
                      <ul>
                        {" "}
                        <li>Qty :</li>
                        {product.countInStock > 0 ? (
                          <Select
                            as="select"
                            size="md"
                            maxW={20}
                            value={qty}
                            className="select-product"
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Select>
                        ) : (
                          <span style={{ display: "flex" }}>
                            <MdDoNotDisturb size="26" /> OUT OF STOCK{" "}
                          </span>
                        )}
                      </ul>
                    </div>
                  </ul>
                </div>

                <div className="purchase-info">
                  <Button
                    onClick={addToCartHandler}
                    type="button"
                    className="btn-shop"
                    disabled={product.countInStock === 0}
                  >
                    {" "}
                    <AiFillShop size="24" />
                    Add to Cart{" "}
                  </Button>
                </div>

                <div className="social-links">
                  <p>Share On: </p>
                  <Link className="social" to="#">
                    <i>
                      {" "}
                      <IoLogoFacebook size="20" />
                    </i>
                  </Link>
                  <Link className="social" href="#">
                    <i>
                      <AiFillTwitterCircle size="20" />
                    </i>
                  </Link>
                  <Link className="social" href="#">
                    <i>
                      <AiFillInstagram size="20" />{" "}
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="REVIEWS">
          <h1>Reviews :</h1>
          {product.reviews.length === 0 && <h2>NO REVIEWS</h2>}
          <div>
            {product.reviews.map((review) => (
              <div className="review">
                <h4>{review.name}</h4>
                <div className="Ratingreview">
                  <Rating value={review.rating} />
                </div>
                <p className="commentreview">{review.comment}</p>
                <p className="datereview">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>
            ))}
            <div className="createreview">
              <h1>Create New Review :</h1>
              {errorProductReview && <h2>{errorProductReview}</h2>}
              {isAuth() ? (
                <FormControl>
                  <FormLabel>Rating :</FormLabel>
                  <Select onChange={(e) => setrating(e.target.value)}>
                    <option value="1">1 POOR</option>
                    <option value="2">2 FAIR</option>
                    <option value="3">3 GOOD</option>
                    <option value="4">4 VERY GOOD</option>
                    <option value="5">5 EXCELLENT</option>
                  </Select>
                  <FormLabel>Comment :</FormLabel>
                  <Textarea
                    onChange={(e) => setcomment(e.target.value)}
                    placeholder="Leave Comment here :"
                  />

                  <Button colorScheme="gray" onClick={submithanlder}>
                    Submit
                  </Button>
                </FormControl>
              ) : (
                <>
                  Please <Link to="/login">Sign In</Link> To write a review.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineDetail;
