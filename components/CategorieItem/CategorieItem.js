"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const CategorieItem = ({ item, changeSelectedCategorie }) => {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.get("selectedCategories")
    ? JSON.parse(decodeURIComponent(searchParams.get("selectedCategories")))
    : {};
  const [active, setActive] = useState(selectedCategories[item] == true);


  useEffect(() => {
    setActive(selectedCategories[item] == true);
  }, [selectedCategories[item]]);


  return (
    <label dir="rtl"
      className={cn(
        "border-2 border-neutral-300 px-1 bg-[#ffffff] duration-300 transition-all shadow-sm drop-shadow-sm active:scale-95 lg:hover:scale-105 hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1",
        active
          ? "border-[var(--theme)] text-[var(--theme)] bg-[var(--hover-theme)] hover:bg-[var(--hover-theme)]"
          : ""
      )}
      onClick={(e) => {
        e.preventDefault();
        setActive(!active);
        changeSelectedCategorie(item);
      }}
    >
      <input type="radio" style={{ display: "none" }} />
      {item}
    </label>
  );
};

export default CategorieItem;
