import React from "react";
import profilePhoto from "./resources/profile-photo.svg";
import HamburgerMenu from "./HamburgerMenu";

const Hero = ({ name }) => {
  const Handle = () => {
    window.open("https://github.com/coderight1");
  };
  return (
    <div className="flex items-center justify-between p-4 pb-2.5 mt-[1%] mb-0">
      <div className="text-left ml-10">
        <h2 className="font-custom text-[16px] font-bold text-black">
          Welcome back {name}!
        </h2>
        <p className="ml-1 font-custom text-[14px] text-black font-semi-bold">
          Check out today's weather information.
        </p>
      </div>
      <div className="overflow-hidden flex flex-row mr-6 justify-center items-center">
        <HamburgerMenu />
        <img
          onClick={Handle}
          title="Click to visit my GitHub"
          src={profilePhoto}
          alt="Profile"
          className="w-12 h-10 object-cover rounded-[15px]"
        ></img>
      </div>
      
    </div>
    
  );
};

export default Hero;
