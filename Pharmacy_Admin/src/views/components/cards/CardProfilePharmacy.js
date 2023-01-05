import { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Media,
  Label,
  Row,
  Col,
  Input,
  FormGroup,
  Alert,
  Spinner,
  Form,
} from "reactstrap";
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

export default function CardProfilePharmacy({ id }) {
  const { register, errors, handleSubmit, control, setValue, trigger } =
    useForm();

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [roleadmin, setRoleAdmin] = useState(null);
  const [rolepharmacy, setRolePharmacy] = useState(null);
  const [pharmacyAddress, setPharmacyAddress] = useState();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [picture, setPicture] = useState("");
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

      if (response.payload.role === "PHARMACY") {
        setRolePharmacy("PHARMACY");
        setPharmacyAddress(response.payload.pharmacyAddress);
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
      setLoading(false);
    });
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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

  const updateProfile = () => {
    setLoadingBtn(true);

    axios
      .put(
        `${API_URL}/user/updateProfilePharmacy/${id}`,
        {
          username: username,
          phone: phone,
          email: email,
          picture: picture,
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
            rolepharmacy ===
            "PHARMACY"(
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Pharmacy Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={username}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={email}
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Pharmacy Address
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={pharmacyAddress}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        City
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="ariana"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="tunisie"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="7050"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
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
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={rolepharmacy}
                        rows="1"
                      ></textarea>
                    </div>
                    <ModalChangePassword />
                    <br />
                  </div>
                </div>
              </form>
            )
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
