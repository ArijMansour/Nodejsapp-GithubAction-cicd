import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import CardStats from "../cards/CardStats";

// components

export default function HeaderStats() {
  const [CountList, setCountList] = useState([]);
  const [CountDiagnoseList, setCountiagnoseList] = useState([]);
  const [CountHospitalList, setCountHospitalList] = useState([]);
  const [CountDoctorList, setCountDoctorList] = useState([]);

  //   useEffect(() => {
  //     Axios.get("http://localhost:3001/user/count").then((response) => {
  //       setCountList(response.data);
  //       console.log(response.data);
  //     });

  //     Axios.get("http://localhost:3001/diagnostique/count").then((response) => {
  //       setCountiagnoseList(response.data);
  //       console.log(response.data);
  //     });
  //     Axios.get("http://localhost:3001/hospital/count").then((response) => {
  //       setCountHospitalList(response.data);
  //       console.log(response.data);
  //     });
  //     Axios.get("http://localhost:3001/user/stat").then((response) => {
  //       setCountDoctorList(response.data);
  //       console.log(response.data);
  //     });
  //   }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-gray-300 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total User"
                  statTitle={CountList}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Test"
                  statTitle={CountDiagnoseList}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Admin"
                  statTitle={CountHospitalList}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Hospital"
                  statTitle={CountHospitalList}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
