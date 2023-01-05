import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import Chart from "chart.js";

export default function CardBarChart() {
  const [StatList, setStatList] = useState([]);
  React.useEffect(() => {
    const element2 = [];
    const element2s = [];
    const element3 = [];
    const element3s = [];
    const Res1 = [];

    Axios.get("http://localhost:3001/diagnostique/statDiagnostic")
      .then((response) => {
        Res1 = response.data;
        // console.log( Res1)

        //console.log(response.data);

        element2.push(Res1[0]._id);
        element2s.push(Res1[0].nb_user);
        element3.push(Res1[1]._id);
        element3s.push(Res1[1].nb_user);

        console.log("element2 ", element2);
        console.log("element2s", element2s);
        console.log("element3 ", element3);
        console.log("element3s", element3s);
      })
      .catch((err) => {
        console.log(err);
      });
    const config = {
      type: "bar",
      data: {
        labels: [element2, element3],

        datasets: [
          {
            label: "positive",
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: element2s,
            fill: false,
            barThickness: 8,
          },
          {
            label: "négative",
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: element3s,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    const ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Covid 19
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Number of test result
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
