import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "chart.js";
import moment from "moment";
import locations from "./resources/locations.json";
import down_arrow from "./resources/down_greyy.svg";
import right_black from "./resources/right_black.svg";
import sunSvg from "./resources/sun_whe.svg";
import thunderSvg from "./resources/thunderstorm.svg";
import cloudSvg from "./resources/cloud.svg";

export default function CardLineChart() {
  const page = useSelector((state) => state.page);
  const location = locations.find((loc) => loc.page === page);

  useEffect(() => {
    if (location) {
      const labels = [];
      const data = [];

      const currentTime = moment().tz(location.Country);
      labels.push(currentTime.format("HH:mm"));
      data.push(location.temps[0]);

      for (let i = 1; i < location.precipitation.length; i++) {
        currentTime.add(1, "hour");
        labels.push(currentTime.format("HH:mm"));
        data.push(location.precipitation[i]);
      }

      const data_per = data.map((label) => label + "%");

      var config = {
        type: "line",
        data: {
          labels: data_per,
          datasets: [
            {
              label: "Precipitation",
              backgroundColor: "#5c9ce5",
              borderColor: "#5c9ce5",
              data: data,
              fill: true,
              pointRadius:0
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "",
                },
                gridLines: {
                  display: true,
                  color: "#b6b6b6"
                },
              },
            ],
            yAxes: [
              {
                display: false,
                ticks: {
                  max: 100,
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              title: function (tooltipItems, data) {
                const index = tooltipItems[0].index;
                return labels[index];
              },
              label: function (tooltipItems) {
                const index = tooltipItems.index;
                return `Precipitation: ${data[index]}`;
              },
            },
          },
        },
      };

      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    }
  }, [location]);

  const renderUpcomingHours = () => {
    if (!location || location.precipitation.length === 0) return null;

    const temps_per = location.temps.map((label) => label + "°");

    const upcomingHours = [];
    const currentTime = moment().tz(location.Country);

    let icon;
    // let hour = currentTime.format("HH");

    if (location.temps[0] > 0) {
      icon = <img src={sunSvg} className="mr-2" alt="Sun Icon" />;
    }
    if (location.precipitation[0] > 40) {
      icon = <img src={cloudSvg} className="mr-2" alt="Cloud Icon" />;
    }
    if (location.precipitation[0] > 80) {
      icon = <img src={thunderSvg} className="mr-2" alt="Thunder Icon" />;
    }

    upcomingHours.push(
      <span
        key={0}
        className="flex flex-col items-center w-[15%] min-w-0"
        style={{display: "inline-block" }}
      >
        {"now"}
        <div className="ml-0">{icon}</div>
        <div className="ml-0.5">{temps_per[0]}</div>
      </span>
    );

    for (let i = 1; i < location.precipitation.length; i++) {
      const hour = currentTime.add(1, "hour").format("HH");
      let icon;

      if (location.temps[i] > 0) {
        icon = <img src={sunSvg} className="mr-2" alt="Sun Icon" />;
      }
      if (location.precipitation[i] > 40) {
        icon = <img src={cloudSvg} className="mr-2" alt="Cloud Icon" />;
      }
      if (location.precipitation[i] > 80) {
        icon = <img src={thunderSvg} className="mr-2" alt="Thunder Icon" />;
      }

      upcomingHours.push(
        <span
          key={i}
          className="w-[15.8%] min-w-0"
          style={{ display: "inline-block" }}
        >
          {hour}:00
          <div className="ml-1">
            {icon}
            <div className="ml-1">{temps_per[i]}</div>
          </div>
        </span>
      );
    }

    return (
      <div
        className="text-gray-500 text-[14px] ml-5 mt-1"
        style={{ whiteSpace: "nowrap" }}
      >
        {upcomingHours}
      </div>
    );
  };

  return (
    <div className="relative w-[100%]"> 
      <div className="ml-[4%] mr-[4%] flex flex-col mt-0 min-w-0 break-words mb-6 shadow-lg rounded-[40px] bg-white">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-black text-[14px] ml-5 mt-2 font-semibold font-custom">
                Upcoming hours
              </h2>
            </div>
            <div className="mr-1 flex flex-row content-end justify-center bg-[#f1f1f1] justify-items-center rounded-[8px] pt-1 pb-1">
              <button className="ml-2 text-[12px] flex flex-row justify-center align-middle ">
                Rain precipitation
              </button>
              <img
                src={down_arrow}
                className="ml-1 mr-1 mt-0.5 h-4 w-4"
                alt="Down Arrow"
              />
            </div>
            <div className="ml-6 flex flex-row content-end justify-center bg-[#f1f1f1] justify-items-center rounded-[8px] mr-3">
              <button className="text-black ml-2 mt-0.5 text-[12px] flex flex-row justify-center align-middle ">
                Next days
              </button>
              <img src={right_black} className="mt-0" alt="Right Arrow" />
            </div>
          </div>
        </div>
        {renderUpcomingHours()}
        <div className="flex-auto">
          <div className="relative pl-4 pr-4"  style={{ height: "80px" }} >
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
