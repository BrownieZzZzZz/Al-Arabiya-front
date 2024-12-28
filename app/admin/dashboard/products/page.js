"use client";
import DashSearch from "@/components/DashSearch/DashSearch";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full flex-col gap-4 px-5 pt-5 md:px-0 md:pr-10 md:pt-8 lg:pr-20 lg:pt-10">
      <DashSearch placeholder="Mobile table, Bowl sink..." />
    </div>
  );
};

export default page;
