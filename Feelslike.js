import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import locations from "./resources/locations.json";
import feels_like_img from "./resources/thermometer.svg";

const FeelsLike = () => {
  const page = useSelector((state) => state.page);
  const location = locations.find((loc) => loc.page === page);
  const [feelsLike, setFeelsLike] = useState(0);

  useEffect(() => {
    if (location) {
      setFeelsLike(location.feels_like);
    }
  }, [location]);


  const calculateProgressBarWidth = (feelsLikeValue) => {
    return (feelsLikeValue / 50) * 100; // Adjusted for a maximum value of 50
  };

  return (
    <>
      <div className="bg-white h-[100px] w-[28%] p-0 ml-[5.2%] mt-[2%] rounded-[16px] justify-between">
        <div className="flex flex-row">
          <p className="font-custom text-black text-[13px] mt-[7%] ml-[15%] font-bold">
            Feels Like
          </p>
          <img
            src={feels_like_img}
            className="h-5 w-5 ml-[40%] mt-[7%]"
            alt="Feels Like Icon"
          ></img>
        </div>

        <div className="flex flex-row justify-center mr-[5%]">
          <p className="font-custom text-[18px] font-black text-black mt-[3%]">
            {feelsLike}°C
          </p>
        </div>

        <div className="flex flex-row text-[10px]">
          <p className="ml-[10%]">0°</p>
          <p className="ml-[30%]">25°</p>
          <p className="ml-[30%]">50°</p>
        </div>

        <div className="w-[80%] mx-auto">
          <div className="relative h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-[#5c9ce5] rounded-full"
              style={{
                width: `${calculateProgressBarWidth(feelsLike)}%`,
                transition: "width 0.5s ease-in-out", // Add transition property
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeelsLike;
