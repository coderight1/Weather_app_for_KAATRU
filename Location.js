import React, { useEffect, useState } from "react";
import arrow from "./resources/arrow.svg";
import moment from "moment-timezone";
import locations from "./resources/locations.json";
import { useSelector } from "react-redux";
import sunrise from "./resources/sunrise.svg";
import sunset from "./resources/sunset.svg";

const getCurrentTime = (timezone) => {
  const currentTime = moment().tz(timezone);
  const day = currentTime.format("DD");
  const month = currentTime.format("MM");
  const month_str = new Date(0, currentTime.month()).toLocaleString('default', { month: 'long' });
  const year = currentTime.format("YYYY");
  const hour = currentTime.format("HH");
  const minute = currentTime.format("mm");
  const second = currentTime.format("ss");
  return { day, month, year, hour, minute, second ,month_str};
};

const Location = () => {
  const [locationData, setLocationData] = useState([
    {
      state: "New York",
      country: "USA",
      time: getCurrentTime("USA/New_York"),
      sunrise: "7:19",  
      sunset: "19:32",
    },
  ]);

  const king_page = useSelector((state) => state.page);

  useEffect(() => {
    const newData = [];

    locations.forEach((item) => {
      const { page, State, Country, sunrise, sunset } = item;
      const timezone = Country;

      if (page === king_page && moment.tz.zone(timezone)) {
        const currentTime = getCurrentTime(timezone);
        const data = {
          state: State,
          country: Country,
          time: currentTime,
          sunrise: sunrise,
          sunset: sunset,
        };
        newData.push(data);
      }
    });

    // console.log(locationData[0].country);
    setLocationData(newData);
  }, [king_page]);

  return (
    <div>
      <div className="flex flex-row mt-7 ml-5 ">
        <div className="flex flex-row w-4/6">
          <img src={arrow} className = "h-5 w-5 mt-10 ml-5"></img>
          <div className="flex flex-row text-[20px] text-white ml-2 mt-9 font-custom font-bold">
            <div className="">{locationData[0].state},</div>
            <div className="justify-center ml-2 text-[13px] text-white mt-2 font-custom">
              {locationData[0].country.split("/")[0]}
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <img src={sunrise} className = "h-7 w-7 mt-9 "></img>
          <p className="text-white mt-10 ml-0 p-0">{locationData[0].sunrise}</p>
        </div>
      </div>


      <div className="flex flex-row">
        <div className="flex flex-row w-4/6">
          <div className="flex flex-row text-[12px] mt-1 text-white ml-2 font-custom">
            <div className="ml-16">Today {locationData[0].time.day} {locationData[0].time.month_str}</div>
          </div>
        </div>
        <div className="flex flex-row">
          <img src={sunset} className = "h-7 w-7 ml-1.5"></img>
          <p className="text-white ml-0 mt-1 p-0">{locationData[0].sunset}</p>
        </div>
      </div>
      </div>
  );
};

export default Location;
