/*eslint-disable*/
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuth, signout } from "../../../_helper/auth";
import UserDropdown from "../Dropdowns/UserDropdown";

// import NotificationDropdown from "../Dropdowns/NotificationDropdown.js";

export default function Sidebar() {
  const [id, setId] = useState();
  const [role, setRole] = useState();

  const history = useHistory();
  useEffect(() => {
    if (isAuth()) {
      setId(isAuth().id);
      setRole(isAuth().role);
    }
  }, [id, role]);

  const [dataAddress, setDataAddress] = useState({});
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

  const handleSignout = (e) => {
    e.preventDefault();
    signout();
    history.push("/signin");
  };
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      {role && role === "ADMIN" ? (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            >
              <i className="fas fa-bars"></i>
            </button>
            {/* Brand */}
            <Link className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              My Dashboard
            </Link>
            {/* User */}
            <ul className="md:hidden items-center flex flex-wrap list-none">
              <li className="inline-block relative">
                {/* <NotificationDropdown /> */}
              </li>
              <li className="inline-block relative">
                <UserDropdown />
              </li>
            </ul>
            {/* Collapse */}
            <div
              className={
                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }
            >
              {/* Collapse header */}
              <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                      to="/"
                    >
                      Dwaya Admin
                    </Link>
                  </div>
                  <div className="w-6/12 flex justify-end">
                    <button
                      type="button"
                      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                      onClick={() => setCollapseShow("hidden")}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Form */}
              <form className="mt-6 mb-4 md:hidden">
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                  />
                </div>
              </form>

              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
              {/* Heading */}
              <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Admin Layout Pages
              </h6>
              {/* Navigation */}

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/dashboard"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Dashboard
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf(
                        "/updateProfilePharmacy/" + id
                      ) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to={`/updateProfilePharmacy/${id}`}
                  >
                    <i
                      className={
                        "fas fa-tools mr-2 text-sm " +
                        (window.location.href.indexOf(
                          "/updateProfilePharmacy/" + id
                        ) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Account Settings
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/patients") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/patients"
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/patients") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Users
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/category") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/category"
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/category") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Category Medecines
                  </Link>
                </li>
              </ul>

              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
              {/* Heading */}

              {/* Navigation */}
              <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <li className="items-center">
                  <button
                    onClick={(e) => {
                      handleSignout(e);
                    }}
                    className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-400 to-gray-600 group-hover:from-gray-400 group-hover:to-gray-300 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-800"
                  >
                    <span className="relative px-5 w-full py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Signout
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            >
              <i className="fas fa-bars"></i>
            </button>
            {/* Brand */}
            <Link className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              My Dashboard
            </Link>
            {/* User */}
            <ul className="md:hidden items-center flex flex-wrap list-none">
              <li className="inline-block relative">
                {/* <NotificationDropdown /> */}
              </li>
              <li className="inline-block relative">
                <UserDropdown />
              </li>
            </ul>
            {/* Collapse */}
            <div
              className={
                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }
            >
              {/* Collapse header */}
              <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                      to="/"
                    >
                      Dwaya
                    </Link>
                  </div>
                  <div className="w-6/12 flex justify-end">
                    <button
                      type="button"
                      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                      onClick={() => setCollapseShow("hidden")}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Form */}
              <form className="mt-6 mb-4 md:hidden">
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                  />
                </div>
              </form>

              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
              {/* Heading */}
              <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Pharmacy Layout Pages
              </h6>
              {/* Navigation */}

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/dashboard"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Dashboard
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/shippers") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/shippers"
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/shippers") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Shipper
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf(
                        "/updateProfilePharmacy/" + id + "/" + dataAddress._id
                      ) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to={`/updateProfilePharmacy/${id}/${dataAddress._id}`}
                  >
                    <i
                      className={
                        "fas fa-tools mr-2 text-sm " +
                        (window.location.href.indexOf(
                          "/updateProfilePharmacy/" + id + "/" + dataAddress._id
                        ) !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Account Settings
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/patients") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/patients"
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/patients") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Patients
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/medecines") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/medecines"
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/medecines") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Medecines
                  </Link>
                </li>
                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/stocks") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/stocks"
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/stocks") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Stock
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/orders") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/orders"
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/orders") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Orders
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/admin/tablesReview") !==
                      -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/tablesReview"
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/tablesReview") !==
                        -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Reviews
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/prescriptions/") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to={`/prescriptions`}
                  >
                    <i
                      className={
                        "fas fa-tools mr-2 text-sm " +
                        (window.location.href.indexOf("/prescriptions") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Prescriptions
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/admin/maps") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/maps"
                  >
                    <i
                      className={
                        "fas fa-map-marked mr-2 text-sm " +
                        (window.location.href.indexOf("/admin/maps") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Suppliers
                  </Link>
                </li>
              </ul>

              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
              {/* Heading */}

              {/* Navigation */}
              <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <li className="items-center">
                  <button
                    onClick={(e) => {
                      handleSignout(e);
                    }}
                    className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-400 to-gray-600 group-hover:from-gray-400 group-hover:to-gray-300 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-800"
                  >
                    <span className="relative px-5 w-full py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Signout
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
