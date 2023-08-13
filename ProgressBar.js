const ProgressBar = ({ width, value }) => {
    
  return (
    <div>
      <div className="relative h-2 bg-gray-300 rounded-full"
      style={{width:`${width}`}}>
        <div
          className="absolute top-0 left-0 h-full bg-[#5c9ce5] rounded-full"
          style={{
            width: `${value}%`,
            transition: "width 0.5s ease-in-out", 
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
