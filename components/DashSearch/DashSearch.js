"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const DashSearch = ({ placeholder }) => {
  const [searchState, setSearchState] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full flex-row rounded-lg bg-[var(--dash-theme2)] hover:bg-[#2c2d33]",
        searchState && "bg-[#2b2b36]",
      )}
    >
      <label
        htmlFor="search"
        onClick={() => {
          setSearchState(true);
        }}
        onBlur={() => {
          setSearchState(false);
        }}
        className={cn(
          "flex w-full flex-row gap-3 rounded-l-lg px-2.5 py-3 hover:cursor-text",
        )}
      >
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-magnifying-glass text-neutral-400 opacity-50"></i>
        </div>
        <input
          id="search"
          type="text"
          className="w-full bg-transparent text-[17px] font-semibold text-neutral-200 placeholder-neutral-400 placeholder-opacity-50 outline-none"
          placeholder={placeholder}
        />
      </label>
      <button
        type="button"
        className="my-2.5 mr-2.5 rounded-lg bg-[var(--dash-theme5)] px-3 py-1.5 text-center text-lg font-semibold text-white transition-all duration-200 hover:bg-[var(--dash-theme6)] active:scale-95"
      >
        Search
      </button>
    </div>
  );
};

export default DashSearch;
