import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader, Dimmer } from "semantic-ui-react";

import requestSvg from "../../../assets/images/demand.svg";

function ApproveRequest({ match }) {
  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);

  const [formData, setFormData] = useState({
    name: "",
    token: "",
    state: false,
    show: true,
  });

  useEffect(() => {
    const token = match.params.token;
    const state = match.params.state;
    const { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name, state);
  }, [match.params]);
  const { name, token, state, show } = formData;

  //ALERT WITH FOOTER
  const handleFooterAlert = (message) => {
    return MySwal.fire({
      icon: "error",
      title: message,
      text: "Please login first to complete this action",
      footer: '<a href="/login">Go To Login?</a>',
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });
  };

  const handleApproveSubmit = (e) => {
    e.preventDefault();
    return MySwal.fire({
      title: "Are you sure?",
      text: "You will approve this pharmacy request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      customClass: {
        confirmButton:
          "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
        cancelButton:
          "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        const token = formData.token;
        const state = true;
        const config = {
          headers: { Authorization: `${Cookies.get("token")}` },
        };
        axios
          .post(
            `http://localhost:5000/api/v1/request/approveRequest`,
            {
              token,
              state,
            },
            config
          )
          .then((res) => {
            if (res.data.exist) {
              return MySwal.fire({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                customClass: {
                  confirmButton:
                    "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
                },
                buttonsStyling: false,
              });
            } else {
              MySwal.fire({
                icon: "success",
                title: "Approved!",
                text: "Request pharmacy to join was accepted.",
                customClass: {
                  confirmButton:
                    "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
                },
                buttonsStyling: false,
              });

              // localStoarge.removeItem("pharmacyAddress");
            }
          })
          .catch((err) => {
            alert("err", err);
          });
      }
    });
  };

  const handleDeclineSubmit = (e) => {
    e.preventDefault();
    return MySwal.fire({
      title: "Are you sure?",
      text: "You will decline this pharmacy request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, decline it!",
      customClass: {
        confirmButton:
          "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
        cancelButton:
          "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        const token = formData.token;
        const state = false;
        const config = {
          headers: { Authorization: `${Cookies.get("token")}` },
        };
        axios
          .post(
            `http://localhost:5000/api/v1/request/approveRequest`,
            {
              token,
              state,
            },
            config
          )
          .then((res) => {
            if (res.data.exist) {
              return MySwal.fire({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                customClass: {
                  confirmButton:
                    "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
                },
                buttonsStyling: false,
              });
            } else {
              MySwal.fire({
                icon: "success",
                title: "declined!",
                text: "Request pharmacy to join was declined.",
                customClass: {
                  confirmButton:
                    "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
                },
                buttonsStyling: false,
              });
            }
          })
          .catch((err) => {
            handleFooterAlert(err.response.data.message);
          });
      }
    });
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
              <div className="flex flex-col items-center justify-center">
                <img src={`${requestSvg}`} className="w-2/4 h-2/3" />
                <p class="mb-5 text-base text-center py-8 text-gray-500 sm:text-lg dark:text-gray-400">
                  The Webtrends Marketing Lab website in IIS uses the default
                  IUSR account credentials to access the web pages it serves.
                </p>
              </div>

              <div className="flex items-center justify-center py-4">
                <button
                  onClick={(e) => handleApproveSubmit(e)}
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Accept
                  </span>
                </button>

                <button
                  onClick={(e) => handleDeclineSubmit(e)}
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Decline{" "}
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-center">
                <Link to="/signin">
                  <span className="  m-2 text-sm font-medium leading-none underline text-blue-800 cursor-pointer">
                    {""}
                    Go To sign in
                  </span>
                </Link>
              </div>
              {/* <button
                type="submit"
                class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 w-full
                     dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Sign up
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApproveRequest;
