import React, { useState, useEffect } from "react";
import locations from "./resources/locations.json";
import { useSelector, useDispatch } from "react-redux";
import left from "./resources/left.svg";
import right from "./resources/right.svg";
import { changePage } from "./store";
import sun from "./resources/sun.svg";

const Temp = () => {
  const king_page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const [temperature, setTemperature] = useState(null);

  const handleClick2 = () => {
    let nextPage = king_page + 1;
    if (nextPage > 3) {
      nextPage = 1;
    }
    dispatch(changePage(nextPage));
  };

  const handleClick1 = () => {
    let nextPage = king_page - 1;
    if (nextPage < 1) {
      nextPage = 3;
    }
    dispatch(changePage(nextPage));
  };

  useEffect(() => {
    // Find the location with the matching page value
    const location = locations.find((item) => item.page === king_page);

    // Retrieve the temperature if a matching location is found
    const newTemperature = location ? location.temps[0] : null;

    // Update the temperature state with a slight delay for transition effect
    setTimeout(() => {
      setTemperature(newTemperature);
    }, 200);
  }, [king_page]);

  return (
    <div>
      <div className="ml-4 mr-4 flex flex-row justify-between">
        <img src={left} onClick={handleClick1} />
        <div className="">
          <div className="flex flex-col text-white font-custom font-bold text-[80px] transition-opacity duration-200">
            <div className="py-2 px-4">
              {temperature !== null ? `${temperature}°` : ""}
              <div className="ml-4 flex flex-row items-center">
                <img src={sun} className="h-4 w-4 mr-1" alt="Sun" />
                <div className="text-[12px]">Sunny</div>
              </div>
            </div>
          </div>
        </div>
        <img src={right} onClick={handleClick2} />
      </div>
    </div>
  );
};

export default Temp;
