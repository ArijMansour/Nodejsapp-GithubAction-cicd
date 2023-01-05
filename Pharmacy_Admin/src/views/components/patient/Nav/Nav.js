import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Route, useHistory } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoLogOutOutline } from "react-icons/io5";

import { CgProfile } from "react-icons/cg";
import { RiShoppingCart2Line } from "react-icons/ri";

import { BsArrowRightShort } from "react-icons/bs";

import { MdSearch, MdKeyboardArrowRight } from "react-icons/md";

import { logout, LogoutAction } from "../../../../app/redux/actions/Auth";
import { keyword } from "color-convert";
import Searchnav from "../search-nav/SearchNav";
import { isAuth, signout } from "../../../../_helper/auth";

const Nav = ({ history }) => {
  useEffect(() => {});
  const [incart, setincart] = useState(0);
  const cart = useSelector((state) => state.CartReducer);
  const { cartItems } = cart;
  const [nav, setNav] = useState(false);
  const historyLogout = useHistory();
  const Nav = useRef(null);

  //search
  const searchRef = useRef(null);
  const [showSearchIc, setShowSearchIc] = useState(false);
  //Burger
  const Buric = useRef(null);
  const navLinks = useRef(null);
  const rightItems = useRef(null);
  //signin
  const [signin, setSignin] = useState(null);

  const onSeacrhFun = () => {
    //Search Icon state + Bar
    setShowSearchIc(!showSearchIc); //false
    console.log(showSearchIc);
    searchRef.current.classList.toggle("searchActive");
    searchRef.current.style.animation = "moving 0.3s ease both 0.3s";
  };
  const onDelSeacrh = () => {
    setShowSearchIc(!showSearchIc); //true
    searchRef.current.classList.toggle("searchActive");
  };

  const onBurgActive = () => {
    //Toggle Nav

    const links = document.querySelectorAll(".navLinks li");
    navLinks.current.classList.toggle("burgerActive");
    rightItems.current.classList.toggle("burgerActive");
    //Animate Links
    links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
        rightItems.current.style.animation = "";
      } else {
        link.style.animation = `moving 0.5s ease forwards ${index / 5}s`;
        rightItems.current.style.animation = `moving 0.5s ease forwards ${
          index / 5
        }s`;
      }
    });
    //Burger Animation
    Buric.current.classList.toggle("toggle");
  };
  const onChangeBack = () => {
    if (window.scrollY >= 60) {
      setNav(true);
    } else setNav(false);
  };
  window.addEventListener("scroll", onChangeBack);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.auth);
  //   const { isAuth() } = userLogin;

  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("cartItems")).map((item) =>{}));
    const cart = cartItems.length ? cartItems.length : 0;
    setincart(cart);
    return () => {
      setincart(0);
    };
  }, [cart]);

  const handleSignout = (e) => {
    e.preventDefault();
    signout();
    historyLogout.push("/signin");
  };
  return (
    <nav ref={Nav} className={`navb ${nav ? "active" : ""}`}>
      <div className="logo">
        <Link to="">MediCare</Link>
      </div>
      <ul className="navLinks" ref={navLinks}>
        <NavLink to="/" exact activeClassName="activlink">
          <li>Home</li>
        </NavLink>
        <NavLink to="/shop" activeClassName="activlink">
          <li>Shop</li>
        </NavLink>
        <NavLink to="/contactus" activeClassName="activlink">
          <li>Contact us</li>
        </NavLink>
        <NavLink to="/about" activeClassName="activlink">
          <li>About</li>
        </NavLink>
      </ul>
      <div className="burger" ref={Buric} onClick={onBurgActive}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="rightComp" ref={rightItems}>
        <div ref={searchRef} className="search">
          <Route render={({ history }) => <Searchnav history={history} />} />
        </div>

        {!showSearchIc && (
          <MdSearch className="iconSearch" size="26" onClick={onSeacrhFun} />
        )}

        <div className="flex align-center justify-center">
          <Link to="/cart">
            {" "}
            <RiShoppingCart2Line className="iconCart" size="26" />
            {isAuth() && <div className="dotcart">{incart}</div>}
          </Link>

          {isAuth() ? (
            <>
              <Link to="/profile-patient">
                <CgProfile size="25" className="settingIcon" />
              </Link>

              <button
                onClick={(e) => {
                  handleSignout(e);
                }}
              >
                <Link>
                  <IoLogOutOutline size="28" className="displayIcon" />
                </Link>
              </button>
            </>
          ) : (
            <Link to="/signin">
              {" "}
              <div
                className="signin"
                onMouseOver={() => setSignin(!signin)}
                onMouseOut={() => setSignin(!signin)}
              >
                {" "}
                Sign in
                {!signin ? (
                  <BsArrowRightShort size="25" />
                ) : (
                  <MdKeyboardArrowRight size="25" />
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
