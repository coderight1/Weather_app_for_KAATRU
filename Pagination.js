// import React, { useState } from "react";
// import Location from "./Location";
import { useDispatch } from "react-redux";
import { changePage } from "./store";
import { useSelector } from "react-redux";

const Pagination = ({ totalPages }) => {
    const king_page = useSelector((state) => state.page);
    const dispatch = useDispatch();

    const handleClick = (page) => {
      dispatch(changePage(page));
    };

  return (
    <div className="flex justify-center mt-9 ml-20">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`h-2 ${
            index + 1 === king_page ? "w-8" : "w-4"
          } rounded-full mx-1 ${
            index + 1 === king_page ? "bg-white" : "bg-[#9dc3ef]"
          } transition-all duration-300`}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default Pagination;


