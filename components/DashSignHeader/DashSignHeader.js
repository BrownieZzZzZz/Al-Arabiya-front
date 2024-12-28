import React from "react";

const DashSignHeader = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <img
        src="/images/logo.png"
        alt="mini-logo"
        className="w-[185px] md:w-[240px]"
      ></img>
      {/* <div className="flex flex-col">
        <div className="inline-block text-nowrap bg-gradient-to-br from-amber-300 to-amber-600 bg-clip-text text-3xl font-bold tracking-wider text-transparent md:text-4xl">
          العربية
        </div>
        <div className="inline-block bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-lg font-semibold tracking-widest text-transparent md:text-xl">
          إدارة
        </div>
      </div> */}
    </div>
  );
};

export default DashSignHeader;
