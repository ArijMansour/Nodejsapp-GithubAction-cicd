// import React, { useEffect, useState } from "react";
// import { Link, Redirect, useHistory } from "react-router-dom";
// import GoogleLogin from "react-google-login";

// import { connect, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";

// import { Loader, Dimmer } from "semantic-ui-react";

// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { SignInAction } from "../../../../app/redux/actions/Auth";
// import { isAuth } from "../../../../_helper/auth";
// import AlertError from "../../../components/alert/AlertError";
// import axios from "axios";
// import { API_URL } from "../../../../infrastructure/services/api/ApiUrl";

// function SignInShipper() {
//   const history = useHistory();
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [submitting, setSubmitting] = useState("Sign in");

//   const dispatch = useDispatch(SignInAction());

//   //loading
//   const [loading, setLoading] = useState(false);

//   const SignInSchema = yup.object().shape({
//     phone: yup.string().length(12).required(),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(SignInSchema),
//   });

//   const [visible, setVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const onSubmit = (e, data) => {
//     setLoading(true); //stop loading when data is fetched
//     setSubmitting("Loading...");

//     axios.post(`${API_URL}/auth/shipper/signinShipper`).then((res) => {
//       if (res) {
//         // toast.error(<ErrorToast  error={res} />, {
//         //   transition: Zoom,
//         //   position: toast.POSITION.TOP_RIGHT,

//         //   hideProgressBar: true,
//         // });
//         setSubmitting("Submitted");

//         setErrorMessage(res);
//         setVisible(true);
//       } else {
//         setVisible(false);

//         if (isAuth().role === "SHIPPER") {
//           setSubmitting("Submitted");
//         }
//       }
//     });
//   };

//   return (
//     <>
//       {/* {loading ? (
//         <Dimmer active inverted>
//           <Loader size="small">Loading</Loader>
//         </Dimmer>
//       ) : ( */}
//       <div className="h-full w-full py-16 px-4 bg-gray-100">
//         {/* {isAuth() ? <Redirect to="/" /> : null} */}

//         <div className="flex flex-col items-center justify-center">
//           <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
//             <div className="flex items-center justify-center">
//               <img src={"assets/images/dwaya.png"} className="w-14 h-14" />
//             </div>
//             <p className="text-2xl text-center font-extrabold leading-6 text-gray-800 mt-3">
//               Delivery
//             </p>
//             <br />{" "}
//             {visible ? (
//               <AlertError isOpen={visible} message={errorMessage} />
//             ) : (
//               <></>
//             )}
//             <form
//               className="px-6 py-6"
//               onSubmit={handleSubmit(onSubmit)}
//               noValidate
//             >
//               <label className="text-sm font-medium leading-none text-gray-800">
//                 Phone
//               </label>
//               <input
//                 className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                 type="text"
//                 placeholder="Enter your phone"
//                 name="phone"
//                 {...register("phone", {
//                   onChange: (e) => {
//                     setPhone(e.target.value);
//                   },
//                   onBlur: (e) => {},
//                 })}
//               />
//               <span className="text-red-500">{errors.email?.message}</span>
//               <br />
//               <div className="mt-3">
//                 <div className="flex items-center justify-between">
//                   <div></div>
//                   <div></div>
//                 </div>
//               </div>
//               <div className="mt-3">
//                 <button
//                   type="submit"
//                   className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 w-full
//                dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//                 >
//                   {submitting}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       {/* )} */}
//     </>
//   );
// }

// function mapStateToProps(state) {
//   const { isLoggedIn } = state.auth;
//   const { message } = state.message;
//   return {
//     isLoggedIn,
//     message,
//   };
// }
// export default connect(mapStateToProps)(SignInShipper);

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link, useHistory } from "react-router-dom";
import * as moment from "moment";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Loader, Dimmer } from "semantic-ui-react";
import AlertError from "../../../components/alert/AlertError";
import AlertSucess from "../../../components/alert/AlertSucess";
import axios from "axios";
import { API_URL } from "../../../../infrastructure/services/api/ApiUrl";
import { setCookie, setLocalStorage } from "../../../../_helper/auth";

function SignInShipper() {
  const [phone, setPhone] = useState("");

  const [submitted, setSubmited] = useState("Sign in");
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  //loading
  const [loading, setLoading] = useState(false);
  const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/; // for phoneNumber .

  const SignUpSchema = yup.object().shape({
    phone: yup
      .string()
      .required()
      .matches(regexPhone, "Phone number is not valid"),
  });

  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const history = useHistory();

  const [addAddress, setAddAddress] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const resetInputs = () => {};

  const onSubmit = (e, data) => {
    setLoading(true); //stop loading when data is fetched
    setSubmited("Loading...");

    axios
      .post(`${API_URL}/auth/shipper/signinShipper`, { phone })
      .then((res) => {
        // if (localStorage.getItem("pharmacyAddress") === null) {
        //   alert("please add your address pharmacy");
        //   setSubmited("Sign up");
        //   return;
        // }

        if (res.data.success === false) {
          setVisible(true);
          setSubmited("Submitted");
          setVisibleSuccess(false);
          setErrorMessage(res.data.errors);
        } else if (res.data !== undefined) {
          if (res.data.success) {
            setVisible(false);
            setSubmited("Submitted");
            setSuccessMessage(res.data.message);
            console.log(res);
            console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", res.data);
            setCookie("token", res.data.token);
            setLocalStorage("user", res.data.user);
            history.push("/shipper/dashboard");

            setVisibleSuccess(true);
            // localStorage.removeItem("pharmacyAddress");
            // setAddAddress(true);
          }
        } else if (res.exist) {
          setErrorMessage(res.message);
          setVisible(true);
        } else if (res.data.success === false && res.data.errors) {
          setVisible(true);
          setSubmited("Submitted");
          setErrorMessage(res.errors);
        }
      });
  };

  return (
    <>
      <div className="h-full w-full py-16 px-4 bg-gray-100">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
            <div className="flex items-center justify-center">
              <img
                src={
                  "https://mpshahhosp.org/wp-content/uploads/2022/03/Delivery-PNG-HD-Image.png"
                }
                className="max-w-fit max-h-full"
              />
            </div>
            <p className="text-2xl  text-center font-extrabold leading-6 text-gray-800 mt-10">
              DELIVERY Espace! 👋
            </p>
            <br />{" "}
            {visible ? (
              <AlertError isOpen={visible} message={errorMessage} />
            ) : (
              <></>
            )}
            {/* {visibleSuccess ? (
             
            ) : (
              <></>
            )} */}
            <form
              className="px-6 py-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* <div className="mt-2 w-full">
                <AddAdress />
              </div> */}

              <div className="mt-2 w-full">
                <label className="text-sm font-medium leading-none text-gray-800">
                  Phone
                </label>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your phone"
                  {...register("phone", {
                    onChange: (e) => {
                      setPhone(e.target.value);
                    },
                    onBlur: (e) => {},
                  })}
                />
                <span className="text-red-500">{errors.phone?.message}</span>
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 w-full
               dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  {submitted}
                </button>
              </div>

              {/* 
              {addAddress && (
                <span className="text-sm font-medium leading-none underline text-blue-700 cursor-pointer">
                  {""}
                  <AddAddress />
                </span>
              )} */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

//norbot reducers b component

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}
export default connect(mapStateToProps)(SignInShipper);
