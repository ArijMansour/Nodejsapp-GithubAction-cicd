import { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { isAuth, setLocalStorage } from "../../../_helper/auth";
import { API_URL } from "../../../infrastructure/services/api/ApiUrl";
import {
  getUserById,
  UpdateUserState,
} from "../../../app/redux/slices/UserSlice";
import ModalChangePassword from "../profile/ModalChangePassword";
import AlertError from "../alert/AlertError";
import AlertSucess from "../alert/AlertSucess";
import AddAdress from "../../pages/patient/address/AddAdress";
import {
  ADDRESS_UPDATE_FAIL,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_RESET,
  ADDRESS_UPDATE_SUCCESS,
} from "../../../app/redux/types/AddressType";
import { updateAddress } from "../../../app/redux/actions/AddressAction";

export default function CardSettings({ id, idAddress }) {
  const options = [
    { value: "", text: "--Choose an option--" },
    { value: "Tunis", text: "Tunis" },
    { value: "Sfax", text: "Sfax" },
    { value: "Sousse", text: "Sousse" },
    { value: "Mahdia", text: "Mahdia" },
    { value: "Tozeur", text: "Tozeur" },
    { value: "Kef", text: "Kef" },
    { value: "Kairoun", text: "Kairoun" },
    { value: "Bizerte", text: "Bizerte" },
    { value: "Nabeul", text: "Nabeul" },
    { value: "Tatouine", text: "Tatouine" },
    { value: "Gabes", text: "Gabes" },
    { value: "Sidi bouzid", text: "Sidi bouzid" },
    { value: "Kasserine", text: "Kasserine" },
    { value: "Mednine", text: "Mednine" },
    { value: "Beja", text: "Beja" },
    { value: "Jendouba", text: "Jendouba" },
  ];

  const { register, errors, handleSubmit, control, setValue, trigger } =
    useForm();

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [roleadmin, setRoleAdmin] = useState(null);
  const [rolepharmacy, setRolePharmacy] = useState(null);
  const [pharmacyAddress, setPharmacyAddress] = useState();
  const [dataAddress, setDataAddress] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [picture, setPicture] = useState("");
  const [city, setCity] = useState(options[0].value);
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [iduser, setIdUser] = useState();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // const Resources = useSelector((state) => state.user.Resources);
  const userById = useSelector((state) => state.UserReducer.UserById);
  useEffect(() => {
    dispatch(getUserById(id)).then((response) => {
      if (response.payload.id) {
        setIdUser(response.payload.id);
      }
      if (response.payload.username) {
        setUsername(response.payload.username);
      }

      if (response.payload.phone) {
        setPhone(response.payload.phone);
      }

      if (response.payload.email) {
        setEmail(response.payload.email);
      }
      if (response.payload.picture) {
        setPicture(response.payload.picture);
      }
      if (response.payload.picture) {
        setPharmacyAddress(response.payload.pharmacyAddress);
      }
      if (response.payload.city) {
        setCity(response.payload.city);
      }
      if (response.payload.zip) {
        setZip(response.payload.zip);
      }

      setRolePharmacy("PHARMACY");
      setLoading(false);
    });
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setEnabled(true); // show button;
  };

  const handlePharmacyAdrChange = (e) => {
    setPharmacyAddress(e.target.value);
    setEnabled(true); // show button;
  };
  const handleZipChange = (e) => {
    setZip(e.target.value);
    setEnabled(true); // show button;
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
    setEnabled(true); // show button;
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
    setEnabled(true); // show button;
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setEnabled(true); // show button;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEnabled(true); // show button;
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setEnabled(true); // show button;
  };

  //UPDATE ADDRESS :

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADDRESS_UPDATE_RESET });
      //   history.push('/admin/userlist')
      // }else{
      //   if(!user.name || user._id !== addressId){

      //     axios
      //     .get(`http://localhost:5000/api/v1/user/address/getaddress`, {
      //       headers: { Authorization: `${Cookies.get("token")}` },
      //     })
      //     .then((res) => {
      //       const data = JSON.parse(
      //         JSON.stringify(res.data.userAddress.address[0])
      //       );

      //       setDataAddress(data);
      //     });

      //   }else{
      //     setZip(user.name)
      //     setEmail(user.email)
      //     setisAdmin(user.isAdmin)
      //   }
    }

    return () => {};
  }, [dispatch, idAddress, successUpdate]);

  //UPDATE PROFILE
  const updateProfile = () => {
    setLoadingBtn(true);

    try {
      dispatch({
        type: ADDRESS_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${Cookies.get("token")}`,
        },
      };

      if (idAddress !== undefined) {
        axios
          .put(
            `http://localhost:5000/api/v1/user/address/updateaddress/${idAddress}`,
            { _id: idAddress, city, country, zip, state },
            config
          )
          .then((res) => {
            console.log(res);
          });
      }

      dispatch({
        type: ADDRESS_UPDATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADDRESS_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      alert(JSON.stringify(error));
    }

    axios
      .put(
        `${API_URL}/user/updateProfilePharmacy/${id}`,
        {
          username: username,
          phone: phone,
          email: email,
          picture: picture,
          pharmacyAddress: pharmacyAddress,
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
  const getCurrentAddress = () => {};

  useEffect(() => {
    if (isAuth().role === "PHARMACY") {
      axios
        .get(`http://localhost:5000/api/v1/user/address/getaddress`, {
          headers: { Authorization: `${Cookies.get("token")}` },
        })
        .then((res) => {
          const data = JSON.parse(
            JSON.stringify(res.data.userAddress.address[0])
          );

          setDataAddress(data);
        });
    }
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          {visible ? (
            <AlertError isOpen={visible} message={errorMessage} />
          ) : (
            <></>
          )}
          {visibleSuccess ? (
            <AlertSucess isOpen={visibleSuccess} message={successMessage} />
          ) : (
            <></>
          )}
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              User Settings
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {loading ? (
            <div className="ui active centered  loader flex items-center justify-center"></div>
          ) : (
            <>
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Admin Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={username}
                      onChange={handleUsernameChange}
                    />
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-full px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        PharmacyAddress
                      </label>
                      <AddAdress />
                      {}
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                {dataAddress ? (
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          defaultValue={phone}
                          name="phone"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          onChange={handlePhoneChange}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="country"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          defaultValue={dataAddress.country}
                          onChange={handleCountryChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="city"
                        >
                          City
                        </label>
                        <input
                          onChange={handleCityChange}
                          type="text"
                          defaultValue={dataAddress.city}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="zip"
                        >
                          Zip
                        </label>
                        <input
                          onChange={handleZipChange}
                          type="text"
                          defaultValue={dataAddress.zip}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                      ){" "}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="zip"
                        >
                          State
                        </label>
                        <input
                          onChange={handleStateChange}
                          type="text"
                          defaultValue={dataAddress.state}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1>Not Found Address</h1>
                )}

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  About Me
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Role
                      </label>
                      <input
                        disabled
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={isAuth().role}
                        rows="1"
                      />
                    </div>
                    <ModalChangePassword id={id} />
                    <br />
                  </div> */}
              </form>
            </>
          )}

          {enabled ? (
            <button
              onClick={updateProfile}
              className="relative inline-flex items-center w-full justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 w-full  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Save Changes
              </span>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
