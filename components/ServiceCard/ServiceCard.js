"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const ServiceCard = ({ title, description, logo}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      className="flex flex-col p-10 gap-4 bg-white border-[1px] border-neutral-100 shadow-sm drop-shadow-sm"
    >
      <div
        className={cn(
          "bg-[#f0f1f2] transition-colors duration-200 text-center rounded-full w-12 h-12",
          hover && "bg-[var(--theme)]"
        )}
      >
        <i className={`${logo} text-[44px] relative top-1 -left-4 text-neutral-700`}/>
      </div>
      <div
        className={cn(
          "text-slate-800 w-fit text-start text-xl font-semibold font-lato py-2 border-b-[4px] border-b-[#ebebed] transition-colors duration-200",
          hover && "border-b-[var(--theme)]"
        )}
      >
        { title }
      </div>
      <div className="text-slate-600 text-base">
        { description }
      </div>
    </div>
  );
};

export default ServiceCard;
