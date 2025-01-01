"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

const DashSearch = ({ placeholder, search }) => {
  const [searchState, setSearchState] = useState(false);
  const searchRef = useRef(null);
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
          <i className="fa-solid fa-magnifying-glass text-neutral-400 opacity-50" />
        </div>
        <input
          id="search"
          type="text"
          className="w-full bg-transparent text-[17px] font-semibold text-neutral-200 placeholder-neutral-400 placeholder-opacity-50 outline-none"
          placeholder={placeholder}
          ref={searchRef}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          if (search) search(searchRef.current.value);
        }}
        className="my-2.5 ml-2.5 rounded-lg bg-[var(--dash-theme5)] px-3 py-1.5 text-center text-lg font-semibold text-white transition-all duration-200 hover:bg-[var(--dash-theme6)] active:scale-95"
      >
        ابحث
      </button>
    </div>
  );
};

export default DashSearch;
