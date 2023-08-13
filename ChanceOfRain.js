import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import locations from "./resources/locations.json";
import humidity_img from "./resources/rain_drop.svg";

const ChanceOfRain = () => {
  const page = useSelector((state) => state.page);
  const location = locations.find((loc) => loc.page === page);
  const [chanceOfRain, setChanceOfRain] = useState(0);

  useEffect(() => {
    if (location) {
      setChanceOfRain(location.rain);
    }
  }, [location]);


  return (
    <>
      <div className="bg-white h-[100px] w-[28%] p-0 ml-[3.5%] mt-[2%] rounded-[16px] justify-between">
        <div className="flex flex-row">
          <p className="font-custom text-black text-[13px] mt-[7%] ml-[15%] font-bold">
            Chance of Rain
          </p>
          <img
            src={humidity_img}
            className="h-5 w-5 ml-[22%] mt-[7%]"
            alt="Rain Icon"
          ></img>
        </div>

        <div className="flex flex-row justify-center mr-[5%]">
          <p className="font-custom text-[18px] font-black text-black mt-[3%]">
            {chanceOfRain}%
          </p>
          
        </div>

        <div className="flex flex-row text-[10px]">
          <p className=" ml-[10%]">0%</p>
          <p className=" ml-[10%]">25%</p>
          <p className=" ml-[8%]">50%</p>
          <p className=" ml-[8%]">75%</p>
          <p className=" ml-[8%]">100%</p>
        </div>

        <div className="w-[80%] mx-auto">
          <div className="relative h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-[#5c9ce5] rounded-full"
              style={{
                width: `${chanceOfRain}%`,
                transition: "width 0.5s ease-in-out", // Add transition property
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChanceOfRain;
