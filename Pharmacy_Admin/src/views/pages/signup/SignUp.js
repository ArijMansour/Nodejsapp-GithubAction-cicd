import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link, useHistory } from "react-router-dom";
import * as moment from "moment";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { register, SignUpAction } from "../../../app/redux/actions/Auth";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Loader, Dimmer } from "semantic-ui-react";
import AlertError from "../../components/alert/AlertError";
import AlertSucess from "../../components/alert/AlertSucess";
import AddAddress from "../patient/address/AddAdress";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [pharmacyAddress, setPharmacyAddress] = useState("");

  const [submitted, setSubmited] = useState("Sign up");
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const dispatch = useDispatch(SignUpAction());

  useEffect(() => {
    setAddAddress(true);
  }, []);

  //loading
  const [loading, setLoading] = useState(false);
  const regexPhone = /^(\+\d{1,3}[- ]?)?\d{10}$/; // for phoneNumber .

  const SignUpSchema = yup.object().shape({
    username: yup.string().min(4).max(40).required(),
    email: yup.string().email().required(),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirm: yup
      .string()
      .required("Confirm Password is required")
      .min(6, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    phone: yup
      .string()
      .required()
      .matches(regexPhone, "Phone number is not valid"),
  });

  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [addAddress, setAddAddress] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const resetInputs = () => {
    setEmail("");
    setUsername("");
    setPhone("");
    setPharmacyAddress("");
  };

  const onSubmit = (e, data) => {
    setLoading(true); //stop loading when data is fetched
    setSubmited("Loading...");

    dispatch(SignUpAction(username, phone, email, password, confirm)).then(
      (res) => {
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
      }
    );
  };

  return (
    <>
      <div className="h-full w-full py-16 px-4 bg-gray-100">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
            <div className="flex items-center justify-center">
              <img src={"assets/images/dwaya.png"} className="w-14 h-14" />
            </div>
            <p className="text-2xl text-center font-extrabold leading-6 text-gray-800 mt-3">
              Welcome to Dwaya! 👋
            </p>
            <br />{" "}
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
            <form
              className="px-6 py-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <label className="text-sm font-medium leading-none text-gray-800">
                Username
              </label>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Enter your username"
                name="username"
                {...register("username", {
                  onChange: (e) => {
                    setUsername(e.target.value);
                  },
                  onBlur: (e) => {},
                })}
              />
              <span className="text-red-500">{errors.username?.message}</span>

              <div className="mt-2 w-full">
                <label className="text-sm font-medium leading-none text-gray-800">
                  Email
                </label>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your email"
                  {...register("email", {
                    onChange: (e) => {
                      setEmail(e.target.value);
                    },
                    onBlur: (e) => {},
                  })}
                />
                <span className="text-red-500">{errors.email?.message}</span>
              </div>
              <div className="mt-2 w-full">
                <label className="text-sm font-medium leading-none text-gray-800">
                  Password
                </label>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  {...register("password", {
                    onChange: (e) => {
                      setPassword(e.target.value);
                    },
                    onBlur: (e) => {},
                  })}
                />
                <span className="text-red-500">{errors.password?.message}</span>
              </div>

              <div className="mt-2 w-full">
                <label className="text-sm font-medium leading-none text-gray-800">
                  Confirm Password
                </label>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Enter your confirm password"
                  {...register("confirm", {
                    onChange: (e) => {
                      setConfirm(e.target.value);
                    },
                    onBlur: (e) => {},
                  })}
                />
                <span className="text-red-500">{errors.confirm?.message}</span>
              </div>
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
              <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                Don't have account? {""}
                <Link to="/signin">
                  <span className="text-sm font-medium leading-none underline text-blue-700 cursor-pointer">
                    {""}
                    Sign in here
                  </span>
                </Link>
              </p>
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
export default connect(mapStateToProps)(SignUp);
