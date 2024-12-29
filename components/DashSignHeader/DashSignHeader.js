import React from "react";

const DashSignHeader = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-3">
      <img
        src="/images/logo.png"
        alt="mini-logo"
        className="w-[185px] md:w-[240px]"
      />
    </div>
  );
};

export default DashSignHeader;
