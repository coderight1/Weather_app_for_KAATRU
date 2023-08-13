import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import locations from "./resources/locations.json";
import humidity_img from "./resources/humidity.svg";
import ProgressBar from "./ProgressBar";

const Humidity = () => {
  const page = useSelector((state) => state.page);
  const location = locations.find((loc) => loc.page === page);
  const [humidity, setHumidity] = useState(0);
  const [humidityText, setHumidityText] = useState("");

  const labels = ["good", "normal", "bad"];
  const [goodHumidity, setGoodHumidity] = useState(0);
  const [normalHumidity, setNormalHumidity] = useState(0);
  const [badHumidity, setBadHumidity] = useState(0);

  useEffect(() => {
    if (location) {
      // setHumidity(90);
      setHumidity(location.humidity);
      setHumidityText(getHumidityText(location.humidity));

      if (humidity <= 30) {
        setGoodHumidity(Math.round((humidity / 30) * 100));
        setNormalHumidity(0);
        setBadHumidity(0);
      } else if (humidity > 30 && humidity < 80) {
        setNormalHumidity(Math.round(((humidity - 30) / 50) * 100));
        setGoodHumidity(100);
        setBadHumidity(0);
      } else if (humidity >= 80) {
        setBadHumidity(Math.round(((humidity - 80) / 20) * 100));
        setGoodHumidity(100);
        setNormalHumidity(100);
      }
    }
  }, [location, humidity]);

  const getHumidityText = (humidityValue) => {
    if (humidityValue > 80) {
      return "bad";
    } else if (humidityValue > 50) {
      return "normal";
    } else {
      return "good";
    }
  };

  return (
    <>
      <div className="bg-white h-[100px] w-[28%] p-0 ml-[5%] mt-[0.7%] rounded-[16px] justify-between">
        <div className="flex flex-row">
          <p className="font-custom text-black text-[13px] mt-[7%] ml-[15%] font-bold">
            Humidity
          </p>
          <img
            src={humidity_img}
            className="h-5 w-5 ml-[40%] mt-[7%]"
            alt="Humidity Icon"
          ></img>
        </div>

        <div className="flex flex-row justify-center mr-[5%]">
          <p className="font-custom text-[18px] font-black text-black mt-[3%]">
            {humidity}%
          </p>
          <p
            className={`font-custom text-[15px] ml-[4%] mt-[4.5%] font-bold text-black m`}
          >
            {humidityText}
          </p>
        </div>

        <div className="flex flex-row text-[10px]">
          <p className=" ml-[14%]">good</p>
          <p className=" ml-[16%]">normal</p>
          <p className=" ml-[11%]">bad</p>
        </div>

        <div className={"flex flex-row w-full justify-between px-8"}>
          {labels.map((label) => {
            return (
              <ProgressBar
                width={"2.5rem"}
                value={
                  label === "good"
                    ? goodHumidity
                    : label === "normal"
                    ? normalHumidity
                    : badHumidity
                }
                key={label}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Humidity;
