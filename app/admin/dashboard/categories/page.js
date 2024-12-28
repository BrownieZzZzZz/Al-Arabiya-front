import AddCategory from "@/components/AddCategory/AddCategory";
import Category from "@/components/Category/Category";
import DashSearch from "@/components/DashSearch/DashSearch";
import React from "react";

const page = () => {
  const categories = [
    "العناية بالشعر",
    "العناية بالبشرة",
    "العناية بالجسم",
    "العناية بالأظافر",
    "العناية بالأسنان",
    "العناية بالعيون",
    "العناية بالشفاه",
    "العناية بالأطفال",
    "العناية بالرجال",
    "العناية بالنساء",
  ];
  return (
    <div className="flex w-full flex-col gap-8 px-5 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <DashSearch placeholder="العناية بالشعر، المكياج..." />
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
