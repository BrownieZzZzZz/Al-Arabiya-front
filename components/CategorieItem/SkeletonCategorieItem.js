"use client";

import { Skeleton } from "../ui/skeleton";

const SkeletonCategorieItem = () => {
  return (
    <label className="rounded-md border-2 border-neutral-300 bg-[#ffffff] px-1 py-1 text-center text-xl font-semibold text-neutral-300 shadow-sm drop-shadow-sm transition-all duration-300 hover:cursor-pointer hover:bg-neutral-100 active:scale-95 lg:hover:scale-105">
      <input type="radio" style={{ display: "none" }} />
      <Skeleton className={"m-auto h-7 w-[120px] bg-neutral-200"} />
    </label>
  );
};

export default SkeletonCategorieItem;
