import React, { useEffect, useState } from "react";
import messages from "./message.json";
import two from "./two.svg";
import three from "./three.svg";
import four from "./four.svg";
// import github1 from "./github-mark-white.svg";
import github2 from "./github-mark.svg";

const Mobile = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [text, setText] = useState(null);

  useEffect(() => {
    const numbers = [2, 3, 4];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const pickedNumber = numbers[randomIndex];
    setRandomNumber(pickedNumber);
  }, [randomNumber]);

  useEffect(() => {
    const total = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const randomIndex = Math.floor(Math.random() * total.length);
    const picked = total[randomIndex];
    setText(picked);
  }, [text]);

  return (
    <>
      <div className="w-screen h-screen bg-white dark:bg-black">
        <img
          className="w-[100%] h-[65%]"
          src={randomNumber === 2 ? two : randomNumber === 3 ? three : four}
          alt="Image"
        />
        <h2 className=" p-8 font-bold dark:text-white text-[20px] font-mono text-black">
          {messages[text]}
        </h2>
        {/* <button className="text-black font-mono text-right ">Demo</button> */}

        <button
          type="button"
          onClick={()=>(window.location.href = 'https://github.com/coderight1')}
          class="ml-40 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          <img src={github2} className="h-4 w-4 mr-2"></img>
          Unleash the Geek in Me!
        </button>
      </div>
    </>
  );
};

export default Mobile;
