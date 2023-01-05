import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import imgDoctor from "../../assets/images/Medicine-bro.png";
import axios from "axios";
export default function TableDoctors({ color }) {
  const [DoctorList, setDoctorList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/back").then((response) => {
      setDoctorList(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h1
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Doctors
              </h1>
            </div>
          </div>
        </div>

        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1"></div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
              </tr>
            </thead>

            <tbody>
              {DoctorList.map((val, index) => {
                return (
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src="https://flyclipart.com/thumb2/user-icon-png-pnglogocom-133466.png"
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        <div key={index}>
                          <h3>{"Dr." + val.username}</h3>
                        </div>
                      </span>
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div key={index}>
                        <h3>{val.email}</h3>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

TableDoctors.defaultProps = {
  color: "light",
};

TableDoctors.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
