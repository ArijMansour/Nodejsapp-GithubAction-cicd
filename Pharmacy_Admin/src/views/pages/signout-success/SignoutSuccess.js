import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import GoogleLogin from "react-google-login";
import Header from "../header/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { Loader, Dimmer } from "semantic-ui-react";

import { forgetPassword, login } from "../../../app/redux/actions/Auth";

import { isLoggedIn, saveEmail } from "../../../util/Session/isLoggedIn";

export default function SignoutSuccess({ history }) {
  //loading
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Dimmer active inverted>
          <Loader size="small">Loading</Loader>
        </Dimmer>
      ) : (
        <div className="h-full w-full py-16 px-4 bg-gray-100">
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
              <div className="flex items-center justify-center">
                <img src={"assets/images/logo.png"} className="w-1/5 h-1/5" />
              </div>
              <p className="text-2xl text-center font-extrabold leading-6 text-gray-800 mt-3">
                Who you are ?
              </p>
              <form className="px-6 py-6" onSubmit={handleSubmit} noValidate>
                <div className="mt-3">
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
