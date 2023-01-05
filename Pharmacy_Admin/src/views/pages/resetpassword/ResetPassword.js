import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { Loader, Dimmer } from "semantic-ui-react";

import {
  forgetPassword,
  resetPassword,
  SignInAction,
} from "../../../app/redux/actions/Auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAuth } from "../../../_helper/auth";
import AlertError from "../../components/alert/AlertError";
import AlertSucess from "../../components/alert/AlertSucess";
function ResetPassword({ match }) {
  const history = useHistory();

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState("Send");

  const dispatch = useDispatch();

  //loading
  const [loading, setLoading] = useState(false);

  const ResetPassSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(6, "Password length should be at least 6 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirm: yup
      .string()
      .required("Confirm Password is required")
      .min(6, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("newPassword")], "Passwords do not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ResetPassSchema),
  });

  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setToken(token);
    }
  }, []);
  //Consomation reset Password api call

  const handleResetPassword = (e) => {
    setLoading(true);

    dispatch(resetPassword(newPassword, token)).then((res) => {
      console.log(res);
      if (res.data.success === true) {
        setSubmitting("Submitted");
        setSuccessMessage(res.data.message);
        setVisibleSuccess(true);
      } else {
        setSubmitting("Submitted");
        setErrorMessage(res.data.error);
        setVisible(true);
      }
    });
  };

  return (
    <>
      <div className="h-full w-full py-16 px-4 bg-gray-100">
        {isAuth() ? <Redirect to="/" /> : null}

        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
            <div className="flex items-center justify-center">
              <img src={"assets/images/dwaya.png"} className="w-14 h-14" />
            </div>
            <p className="text-2xl text-center font-extrabold leading-6 text-gray-800 mt-3">
              Reset Password
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
              onSubmit={handleSubmit(handleResetPassword)}
              noValidate
            >
              <div className="mt-2 w-full">
                <label className="text-sm font-medium leading-none text-gray-800">
                  Password
                </label>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Enter your  new password"
                  name="newPassword"
                  {...register("newPassword", {
                    onChange: (e) => {
                      setNewPassword(e.target.value);
                    },
                    onBlur: (e) => {},
                  })}
                />
                <span className="text-red-500">
                  {errors.newPassword?.message}
                </span>
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
export default connect(mapStateToProps)(ResetPassword);
