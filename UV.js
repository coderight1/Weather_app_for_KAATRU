import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import locations from "./resources/locations.json";
import uv_img from "./resources/sun_blue.svg";

const UV = () => {
  const page = useSelector((state) => state.page);
  const location = locations.find((loc) => loc.page === page);
  const [uvIndex, setUVIndex] = useState(0);
  const [uvIndexText, setUVIndexText] = useState("");

  useEffect(() => {
    if (location) {
      setUVIndex(location.UV_index);
      setUVIndexText(getUVIndexText(location.UV_index));
    }
  }, [location]);

  const getUVIndexText = (uvValue) => {
    if (uvValue >= 11) {
      return "Extreme";
    } else if (uvValue >= 8) {
      return "Very High";
    } else if (uvValue >= 6) {
      return "High";
    } else if (uvValue >= 3) {
      return "medium";
    } else {
      return "Low";
    }
  };

  return (
    <>
      <div className="bg-white h-[100px] w-[28%] p-0 ml-[5%] mt-[2%] rounded-[16px] justify-between">
        <div className="flex flex-row">
          <p className="font-custom text-black text-[13px] mt-[7%] ml-[15%] font-bold">
            UV Index
          </p>
          <img
            src={uv_img}
            className="h-5 w-5 ml-[40%] mt-[7%]"
            alt="UV Index Icon"
          ></img>
        </div>

        <div className="flex flex-row justify-center mr-[5%]">
          <p className="font-custom text-[18px] font-black text-black mt-[3%]">
            {uvIndex}
          </p>
          <p className="font-custom text-[15px] ml-[4%] mt-[4.5%] font-bold text-black">
            {uvIndexText}
          </p>
        </div>

        <div className="flex flex-row text-[10px]">
          <p className="ml-[10%]">0-2</p>
          <p className="ml-[11%]">3-5</p>
          <p className="ml-[9%]">6-7</p>
          <p className="ml-[7%]">8-10</p>
          <p className="ml-[5%]">11+</p>
        </div>

        <div className="w-[80%] mx-auto">
          <div className="relative h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-[#5c9ce5] rounded-full"
              style={{
                width: `${(uvIndex / 15) * 100}%`,
                transition: "width 0.5s ease-in-out", // Add transition property
              }}
            ></div>
            <div className="absolute top-0 left-[20%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[40%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[60%] h-full bg-white w-1"></div>
            <div className="absolute top-0 left-[80%] h-full bg-white w-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UV;
