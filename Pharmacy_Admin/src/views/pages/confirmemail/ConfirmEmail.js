import React, { useEffect, useState } from "react";
import {
  ActivateEmailAction,
  ActivateEmailPatientAction,
  confirmEmail,
} from "../../../app/redux/actions/Auth";

import { useHistory, Link, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { getSavedEmail } from "../../../util/Session/isLoggedIn";
import emailSvg from "../../../assets/images/email.svg";
import AlertError from "../../components/alert/AlertError";
import jwt_decode from "jwt-decode";

import AlertSucess from "../../components/alert/AlertSucess";
import jwt from "jsonwebtoken";
import { Loader, Dimmer } from "semantic-ui-react";

function ConfirmEmail({ match }) {
  const dispatch = useDispatch();

  const history = useHistory();
  const goToSign = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const [visibleButton, setVisibleButton] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    const token = match.params.token;
    const { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name);
  }, [match.params]);
  const { name, token, show } = formData;

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    var decoded = jwt_decode(token);

    if (decoded.role === "PATIENT") {
      dispatch(ActivateEmailPatientAction(token)).then((res) => {
        if (res.success === false) {
          setLoading(false);
          setErrorMessage(res.exist);
          setVisibleSuccess(false);

          setVisible(true);
          setVisibleButton(false);
        } else {
          setLoading(false);
          setSuccessMessage(res.data.message);
          setVisible(false);

          setVisibleSuccess(true);

          setFormData({
            ...formData,
            show: false,
          });

          setVisibleButton(false);
        }
      });
    } else {
      dispatch(ActivateEmailAction(token)).then((res) => {
        if (res.success === false) {
          setLoading(false);
          setErrorMessage(res.errors);
          setVisibleSuccess(false);

          setVisible(true);
          setVisibleButton(false);
        } else {
          setLoading(false);
          setSuccessMessage(res.data.message);
          setVisible(false);

          setVisibleSuccess(true);

          setFormData({
            ...formData,
            show: false,
          });

          setVisibleButton(false);
        }
      });
    }
  };

  return (
    <>
      {loading ? (
        <Dimmer active inverted>
          <Loader size="small">Loading</Loader>
        </Dimmer>
      ) : (
        <div className="h-full w-full mx-auto py-16 px-4 bg-gray-200">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white shadow rounded   w-full p-10  mt-16 max-w-lg">
              <div className="flex items-center justify-center">
                <img src={`${emailSvg}`} className="w-2/4 h-2/3" />
              </div>
              <br />
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
              <h3 className="text-xl text-center font-semibold  text-gray-500 mt-3 ">
                Click to confirm your email
              </h3>
              <div className="flex items-center justify-center py-8"></div>
              <Link to="/signin"></Link>
              <form onSubmit={handleSubmit}>
                {visibleButton ? (
                  <button
                    type="submit"
                    class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 w-full
                     dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Confirm
                  </button>
                ) : (
                  <div className="flex items-center justify-center">
                    <Link to="/signin">
                      <span className="  m-2 text-sm font-medium leading-none underline text-blue-800 cursor-pointer">
                        {""}
                        Go To sign in
                      </span>
                    </Link>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}
export default connect(mapStateToProps)(ConfirmEmail);
