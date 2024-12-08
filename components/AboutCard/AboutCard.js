import React from "react";
import { cn } from "@/lib/utils";

const AboutCard = ({ text, logo }) => {
  return (
    <div className="grid h-full w-full max-w-[500px] grid-cols-1 place-items-center gap-10 border-[1px] border-neutral-200 bg-white px-4 py-5 shadow-md drop-shadow-md min-[1100px]:max-w-[580px] min-[1375px]:max-w-[450px]">
      {logo}
      <span className="text-center text-3xl font-medium text-neutral-700">{text}</span>
    </div>
  );
};

export default AboutCard;
