import AddCategory from "@/components/AddCategory/AddCategory";
import Category from "@/components/Category/Category";
import DashSearch from "@/components/DashSearch/DashSearch";
import React from "react";

const page = () => {
  const categories = [
    "Work Tables",
    "Cabinets",
    "Sink Tables",
    "Shelves & Racks",
    "Hoods",
    "Trolleys",
    "Gratings & Traps",
    "Waste Management",
    "Work Tables",
    "Cabinets",
    "Sink Tables",
    "Shelves & Racks",
    "Hoods",
    "Trolleys",
    "Gratings & Traps",
    "Waste Management",
    "Work Tables",
    "Cabinets",
    "Sink Tables",
    "Shelves & Racks",
    "Hoods",
    "Trolleys",
    "Gratings & Traps",
    "Waste Management",
    "Work Tables",
    "Cabinets",
    "Sink Tables",
    "Shelves & Racks",
    "Hoods",
    "Trolleys",
    "Gratings & Traps",
    "Waste Management",
  ];
  return (
    <div className="flex w-full flex-col gap-8 px-5 pt-5 md:px-0 md:pr-10 md:pt-8 lg:pr-20 lg:pt-10">
      <DashSearch placeholder="Sink tables, Cabinets..." />
      <div className="grid auto-rows-fr w-full 2xl:grid-cols-4 xl:grid-cols-3 min-[500px]:grid-cols-2 gap-6">
        <AddCategory />
        { categories.map((category, index) => (
          <Category category={category} key={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
