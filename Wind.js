import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import locations from "./resources/locations.json";
import wind_img from "./resources/wind.svg";
import ProgressBar from "./ProgressBar";

const Wind = () => {
  const page = useSelector((state) => state.page);
  const location = locations.find((loc) => loc.page === page);
  const [wind, setWind] = useState(0);
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);

  const labels = ["one", "two", "three", "four", "five"];

  useEffect(() => {
    if (location) {
      // setHumidity(90);
      setWind(location.wind);

      if (wind <= 5) {
        setOne(Math.round((wind / 5) * 100));
        setTwo(0);
        setThree(0);
        setFour(0);
        setFive(0);
      } else if (wind > 5 && wind <= 10) {
        setOne(100);
        setTwo(Math.round(((wind - 5) / 50) * 100));
        setThree(0);
        setFour(0);
        setFive(0);
      } else if (wind > 10 && wind <= 20) {
        setOne(100);
        setTwo(100);
        setThree(Math.round(((wind - 30) / 50) * 100));
        setFour(0);
        setFive(0);
      }
    }
  }, [location, wind]);

  const calculateCircleProgress = () => {
    const circumference = 2 * Math.PI * 25; // Radius is 25
    return 188.5 - (wind / 40) * 188.5; // Adjust the range and values as needed
  };

  return (
    <>
      <div className="bg-white h-[100px] w-[28%] p-0 ml-[5%] mt-[0.7%] rounded-[16px] justify-between">
        <div className="flex flex-row">
          <p className="font-custom text-black text-[13px] mt-[7%] ml-[15%] font-bold">
            Wind
          </p>
          <img
            src={wind_img}
            className="h-5 w-5 ml-[40%] mt-[7%]"
            alt="Humidity Icon"
          ></img>
        </div>

        <div className="flex flex-row justify-center mr-[5%]">
          <p className="font-custom text-[18px] font-black text-black mt-[3%]">
            {wind}km/h
          </p>
        </div>

        <div className="flex flex-row text-[10px]">
          <p className=" ml-[14%]">0</p>
          <p className=" ml-[10%]">5</p>
          <p className=" ml-[10%]">10</p>
          <p className=" ml-[9%]">20</p>
          <p className=" ml-[12%]">30</p>
          <p className=" ml-[8%]">40</p>
        </div>

        <div className={"flex flex-row w-full justify-between px-8"}>
          {labels.map((label) => {
            return <ProgressBar width={"2.0rem"} value={label === "one"
            ? one
            : label === "two"
            ? two
            : label === "three"
            ? three
            : label === "four"
            ? four
            : five
            } key={label} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Wind;
