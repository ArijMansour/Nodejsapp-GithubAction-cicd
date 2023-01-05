import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { Loader, Dimmer } from "semantic-ui-react";

import { SignInAction } from "../../../app/redux/actions/Auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAuth } from "../../../_helper/auth";
import AlertError from "../../components/alert/AlertError";
import AlertSucess from "../../components/alert/AlertSucess";

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState("Sign in");

  const dispatch = useDispatch(SignInAction());

  //loading
  const [loading, setLoading] = useState(false);

  const SignInSchema = yup.object().shape({
    email: yup.string().email().required(),

    password: yup.string().min(6).required(),
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
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e, data) => {
    setLoading(true); //stop loading when data is fetched
    setSubmitting("Loading...");

    dispatch(SignInAction(email, password)).then((res) => {
      if (res) {
        // toast.error(<ErrorToast  error={res} />, {
        //   transition: Zoom,
        //   position: toast.POSITION.TOP_RIGHT,

        //   hideProgressBar: true,
        // });
        setSubmitting("Submitted");

        setErrorMessage(res);
        setVisible(true);
      } else {
        setVisible(false);

        if (isAuth().role === "PHARMACY") {
          setSubmitting("Submitted");

          history.push("/pharmacy/dashboard");
          // return <Redirect to="/" />;
        } else if (isAuth().role === "ADMIN") {
          history.push("/admin/dashboard");
          window.location.reload();
        } else if (isAuth().role === "PATIENT") {
          history.push("/");
        }
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
        {/* {isAuth() ? <Redirect to="/" /> : null} */}

        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
            <div className="flex items-center justify-center">
              <img src={"assets/images/dwaya.png"} className="w-14 h-14" />
            </div>
            <p className="text-2xl text-center font-extrabold leading-6 text-gray-800 mt-3">
              Login to your account
            </p>
            <br />{" "}
            {visible ? (
              <AlertError isOpen={visible} message={errorMessage} />
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
              <br />
              <label className="text-sm font-medium leading-none text-gray-800">
                Password
              </label>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  onChange: (e) => {
                    setPassword(e.target.value);
                  },
                  onBlur: (e) => {},
                })}
              />{" "}
              <span className="text-red-500">{errors.password?.message}</span>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label
                      className="block text-gray-500 font-bold"
                      for="remember"
                    >
                      <input
                        className="ml-2 leading-tight"
                        type="checkbox"
                        id="remember"
                        name="remember"
                      />
                      <span className="text-sm m-2">Remember me</span>
                    </label>
                  </div>
                  <div></div>
                  <Link to="/forgotpassword">
                    <span className="  m-2 text-sm font-medium leading-none underline text-blue-800 cursor-pointer">
                      {""}
                      Forget Password ?
                    </span>
                  </Link>
                </div>
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
              <div className="w-full flex items-center justify-between py-4 mt-1">
                <hr className="w-full bg-gray-400" />
                <p className="text-base font-medium leading-4 px-2 text-gray-400">
                  OR{" "}
                </p>
                <hr className="w-full bg-gray-400" />
              </div>
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Continue with Google"
                className="w-full flex items-center justify-center py-4 mt-1"
                // onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                Don't have account? {""}
                <Link to="/check">
                  <span className="text-sm font-medium leading-none underline text-blue-700 cursor-pointer">
                    {""}
                    Sign up here
                  </span>
                </Link>
              </p>
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
export default connect(mapStateToProps)(SignIn);
