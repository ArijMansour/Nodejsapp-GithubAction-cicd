import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import avatarRegister from "../img/avatarRegister.svg";
import addUs from "../img/new.svg";
import wave from "../img/wavev.png";
import { IoIosArrowDown } from "react-icons/io";
import HashLoader from "react-spinners/HashLoader";

import "./profile.css";

import {
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { listMyOrders } from "../../../../app/redux/actions/orderActions";
import { getUserDetails } from "../../../../app/redux/actions/UserAction";
import ModalChangePassword from "../../../components/profile/ModalChangePassword";
import { isAuth } from "../../../../_helper/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { UpdateUserState } from "../../../../app/redux/slices/UserSlice";
import { API_URL } from "../../../../infrastructure/services/api/ApiUrl";

const ProfilePatient = ({ location, history }) => {
  const [name, setName] = useState("");
  const [ShowOrders, setShowOrders] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [isEditablename, setisEditablename] = useState(false);
  const [isEditableemail, setisEditableemail] = useState(false);
  const [isEditablephone, setisEditablephone] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const nameinput = useRef(null);
  const phoneinput = useRef(null);
  const emailinput = useRef(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { error, user } = userDetails;

  const userLogin = useSelector((state) => state.auth);

  //   const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  //   const { success } = userUpdateProfile;

  const orderMylist = useSelector((state) => state.orderMylist);

  const { loading: loadingOrders, error: errorOrders, orders } = orderMylist;

  useEffect(() => {
    if (!userLogin) {
      history.push("/signin");
    } else {
      if (!user.username) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.username);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
  }, [dispatch, history, user]);

  const updateProfile = () => {};

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch(updateUserProfile({ id: user._id, name, email, password }));
    axios
      .put(
        `${API_URL}/user/updateProfilePharmacy/${user._id}`,
        {
          username: name,
          phone: phone,
          email: email,
          //   picture: picture,
          //   pharmacyAddress: pharmacyAddress,
        },
        { headers: { Authorization: `${Cookies.get("token")}` } }
      )
      .then((res) => {
        if (res.data.success === true) {
          dispatch(UpdateUserState());

          setLocalStorage("user", res.data.result);
          setLoadingBtn(false);
          setSuccessMessage("Your profile was updated successfully !");
          setVisibleSuccess(true);
        }

        // setFormSuccessMessage("");
        // SetFormClassName("success");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("So:mething went wrong !!");
        setVisible(true);
        // setFormSuccessMessage("So:mething went wrong !!");
        // SetFormClassName("warning");
      });
  };
  const inputs = document.querySelectorAll(".inputa");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  const nameinputfocus = () => {
    setisEditablename(!isEditablename);
    if (isEditablename) {
      nameinput.current.focus();
    } else {
    }
  };
  const phoneinputfocus = () => {
    setisEditablephone(!isEditablephone);
    if (isEditablephone) {
      phoneinput.current.focus();
    } else {
    }
  };

  inputs.forEach((inputa) => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });
  const handelshow = () => {};

  return (
    <div className="registerSc">
      <Image className="wave" src={wave} />
      <div className="containera">
        <div className="imga">
          <Image src={addUs} />
        </div>
        <div className="rightinfos">
          <div className="showbtn" onClick={() => setShowOrders(!ShowOrders)}>
            {ShowOrders ? "Show my infos" : "Show my orders"} <IoIosArrowDown />
          </div>
          <>
            {!ShowOrders ? (
              <div className="login-content">
                <form onSubmit={submitHandler}>
                  <Image src={avatarRegister} />
                  {error && <h4>{error}</h4>}
                  {/* {success && <h4>Profile Updated</h4>} */}

                  <div className="input-div zz">
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        value={name}
                        readOnly={isEditablename}
                        ref={nameinput}
                        className="inputa"
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <AiOutlineEdit
                    size="26"
                    className="edit"
                    onClick={nameinputfocus}
                  />

                  <div className="input-div one">
                    <div className="i">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        value={email}
                        readOnly={isEditableemail}
                        ref={emailinput}
                        className="inputa"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <AiOutlineEdit
                    size="26"
                    className="edit"
                    onClick={() => {
                      setisEditableemail(!isEditableemail);
                      emailinput.current.focus();
                    }}
                  />

                  <div className="input-div one">
                    <div className="i">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="div">
                      <input
                        type="text"
                        value={phone}
                        readOnly={isEditablephone}
                        ref={phoneinput}
                        className="inputa"
                        placeholder="Enter Phone"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <AiOutlineEdit
                    size="26"
                    className="edit"
                    onClick={nameinputfocus}
                  />

                  {/* <div className="input-div pass">
                    <div className="i">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        type="password"
                        value={password}
                        required
                        className="inputa"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-div passconf">
                    <div className="i">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                      <input
                        type="password"
                        value={confirmPassword}
                        className="inputa"
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div> */}
                  <ModalChangePassword id={isAuth().id} />

                  {message && <h4 className="Message">{message}</h4>}

                  <input type="submit" className="btna2" value="Update" />
                </form>
              </div>
            ) : (
              <div className="tableorder">
                {loadingOrders ? (
                  <div className="loading">
                    <HashLoader
                      color={"#fff"}
                      loading={loadingOrders}
                      size={40}
                    />
                  </div>
                ) : errorOrders ? (
                  <h1>{errorOrders}</h1>
                ) : (
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>DATE</Th>
                        <Th>TOTAL</Th>
                        <Th>PAID</Th>
                        <Th>DELIVERED</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order) => (
                        <Tr key={order._id}>
                          <Td>{order._id}</Td>
                          <Td>{order.createdAt.substring(0, 10)}</Td>
                          <Td>{order.totalPrice}</Td>
                          <Td>
                            {order.isPaid
                              ? order.paidAt.substring(0, 10)
                              : "Not Paid Yet"}
                          </Td>
                          <Td>
                            {order.isDelivered
                              ? order.deliveredAt.substring(0, 10)
                              : "Not Yet"}
                          </Td>
                          <Td>
                            <Link to={`/order/${order._id}`}>
                              <Button size="xs">DETAILS</Button>
                            </Link>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProfilePatient;
