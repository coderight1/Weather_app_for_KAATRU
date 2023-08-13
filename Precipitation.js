import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import locations from "./resources/locations.json";
import humidity_img from "./resources/rain.svg";

const Precipitation = () => {
  const page = useSelector((state) => state.page);
  const location = locations.find((loc) => loc.page === page);
  const [precipitation, setPrecipitation] = useState(0);
  const [pre, setPrecipitation2] = useState(0);

  useEffect(() => {
    if (location) {
      setPrecipitation(location.precipitation_val * 10);
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      setPrecipitation2(location.precipitation_val);
    }
  }, [location]);

  return (
    <>
      <div className="bg-white h-[100px] w-[28%] p-0 ml-[3.5%] mt-[0.7%] rounded-[16px] justify-between">
        <div className="flex flex-row">
          <p className="font-custom text-black text-[13px] mt-[7%] ml-[15%] font-bold">
            Precipitation
          </p>
          <img
            src={humidity_img}
            className="h-5 w-5 ml-[28%] mt-[7%]"
            alt="Precipitation Icon"
          />
        </div>

        <div className="flex flex-row justify-center mr-[5%]">
          <p className="font-custom text-[18px] font-black text-black mt-[3%]">
            {pre}cm
          </p>
        </div>

        <div className="flex flex-row text-[10px]">
          <p className="ml-[12%]">0</p>
          <p className="ml-[4%]">10</p>
          <p className="ml-[4%]">20</p>
          <p className="ml-[3%]">30</p>
          <p className="ml-[3%]">40</p>
          <p className="ml-[2%]">50</p>
          <p className="ml-[2%]">60</p>
          <p className="ml-[2%]">70</p>
          <p className="ml-[2%]">80</p>
          <p className="ml-[2%]">90</p>
        </div>

        <div className="w-[80%] mx-auto">
          <div className="relative h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-[#5c9ce5] rounded-full"
              style={{
                width: `${precipitation}%`,
                transition: "width 0.5s ease-in-out", // Add transition property
              }}
            />
            <div className="absolute top-0 left-[10%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[20%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[30%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[40%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[50%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[60%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[70%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[80%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[90%] h-full bg-white w-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Precipitation;

