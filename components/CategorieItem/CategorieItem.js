"use client";

import  { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const CategorieItem = ({ item, changeSelectedCategorie }) => {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.get("selectedCategories")
    ? JSON.parse(decodeURIComponent(searchParams.get("selectedCategories")))
    : {};
  const [active, setActive] = useState(selectedCategories[item.name] == true);

  useEffect(() => {
    setActive(selectedCategories[item.name] == true);
  }, [selectedCategories[item.name]]);

  return (
    <label
      dir="rtl"
      className={cn(
        "rounded-md border-2 border-neutral-300 bg-[#ffffff] px-1 py-1 text-center text-xl font-semibold text-neutral-300 shadow-sm drop-shadow-sm transition-all duration-300 hover:cursor-pointer hover:bg-neutral-100 active:scale-95 lg:hover:scale-105",
        active
          ? "border-[var(--theme)] bg-[var(--hover-theme)] text-[var(--theme)] hover:bg-[var(--hover-theme)]"
          : "",
      )}
      onClick={(e) => {
        e.preventDefault();
        setActive(!active);
        changeSelectedCategorie(item.name);
      }}
    >
      <input type="radio" style={{ display: "none" }} />
      {item.name}
    </label>
  );
};

export default CategorieItem;
