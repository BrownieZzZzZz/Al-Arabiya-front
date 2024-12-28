import React from "react";

const DashSignHeader = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <img
        src="/images/dash-icon.png"
        alt="mini-logo"
        className="size-[115px] md:size-[150px]"
      ></img>
      <div className="flex flex-col">
        <div className="inline-block bg-gradient-to-br from-amber-300 to-amber-600 bg-clip-text text-3xl text-nowrap md:text-4xl font-bold tracking-wider text-transparent">
          Golden B.
        </div>
        <div className="bg-gradient-to-r inline-block from-purple-200 to-purple-400 bg-clip-text text-lg md:text-xl font-semibold tracking-widest text-transparent">
          Management
        </div>
      </div>
    </div>
  );
};

export default DashSignHeader;
