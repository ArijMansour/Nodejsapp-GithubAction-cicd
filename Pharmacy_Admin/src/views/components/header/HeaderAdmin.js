import React from "react";
import CardStats from "../cards/CardStats";
import UserDropdown from "../Dropdowns/UserDropdown";


export default function HeaderAdmin() {
  return (

   
      <>
        {/* Header */}
        <div className="relative bg-[#F3F4F6] md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="Total User"
                    // statTitle={CountList}
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
                    // statTitle={CountDiagnoseList}
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
                    // statTitle={CountHospitalList}
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
                    // statTitle={CountHospitalList}
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
