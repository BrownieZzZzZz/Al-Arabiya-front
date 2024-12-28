"use client";
import DashSearch from "@/components/DashSearch/DashSearch";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full flex-col gap-4 px-5 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <DashSearch placeholder="عطر زهر، كريم مرطب... " />
    </div>
  );
};

export default page;
