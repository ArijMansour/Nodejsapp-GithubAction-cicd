import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { Loader, Dimmer } from "semantic-ui-react";

import { forgetPassword, SignInAction } from "../../../app/redux/actions/Auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAuth } from "../../../_helper/auth";
import AlertError from "../../components/alert/AlertError";
import AlertSucess from "../../components/alert/AlertSucess";

function ForgetPassword() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState("Send");

  const dispatch = useDispatch(SignInAction());

  //loading
  const [loading, setLoading] = useState(false);

  const SignInSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (e, data) => {
    setLoading(true); //stop loading when data is fetched
    setSubmitting("Loading...");
    dispatch(forgetPassword(email)).then((res) => {
      if (res.status === 400) {
        setSubmitting("Submitted");
        setVisible(true);

        setErrorMessage(res.data.error);
      } else {
        setVisible(false);

        setSubmitting("Submitted");
        setVisibleSuccess(true);
        setSuccessMessage(res.data.message);

        //     history.push("/");
      }
    });
  };

  return (
    <>
      {/* {loading ? (
        <Dimmer active inverted>
          <Loader size="small">Loading</Loader>
        </Dimmer>
      ) : ( */}
      <div className="h-full w-full py-16 px-4 bg-gray-100">
        {isAuth() ? <Redirect to="/" /> : null}

        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
            <div className="flex items-center justify-center">
              <img src={"assets/images/dwaya.png"} className="w-14 h-14" />
            </div>
            <p className="text-2xl text-center font-extrabold leading-6 text-gray-800 mt-3">
              Forgot Password
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
                Email
              </label>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Enter your email"
                name="email"
                {...register("email", {
                  onChange: (e) => {
                    setEmail(e.target.value);
                  },
                  onBlur: (e) => {},
                })}
              />
              <span className="text-red-500">{errors.email?.message}</span>

              <div className="mt-3">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 w-full
               dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  {submitting}
                </button>
              </div>

              <Link to="/signin" className="text-center">
                <span className="text-sm   font-medium leading-none underline text-blue-700 cursor-pointer">
                  {""}
                  Sign in
                </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}
export default connect(mapStateToProps)(ForgetPassword);
