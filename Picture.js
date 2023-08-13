import React from "react";
import page1Image from "./resources/1.svg";
import page2Image from "./resources/2.svg";
import page3Image from "./resources/3.svg";
import { useSelector } from "react-redux";

const Picture = () => {
  const king_page = useSelector((state) => state.page);

  // Determine the image source based on the page value
  let imageSrc = "";
  switch (king_page) {
    case 1:
      imageSrc = page1Image;
      break;
    case 2:
      imageSrc = page2Image;
      break;
    case 3:
      imageSrc = page3Image;
      break;
    default:
      imageSrc = "";
      break;
  }

  return (
    <div className="picture-container transition-opacity duration-500 hover:scale-105 hover:transition-duration-1000">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`Page ${king_page}`}
          className="picture-image opacity-100 transition-opacity duration-500 h-[20%]"
        />
      )}
    </div>
  );
};

export default Picture;
