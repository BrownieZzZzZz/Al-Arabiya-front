import React from "react";

const AddCategory = () => {
  return (
    <div className="flex items-center justify-center rounded-xl bg-[var(--dash-theme2)] py-5 px-4 transition-all duration-200 hover:bg-[#2b2b36] hover:cursor-pointer hover:scale-[1.02]">
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="grid place-items-center text-center size-[40px] rounded-full border-2 text-2xl text-neutral-300 font-semibold border-neutral-300">
          <div className="mb-1">+</div>
        </div>
        <div className="font-semibold text-xl text-neutral-300 text-center">Add a new category</div>
      </div>
    </div>
  );
};

export default AddCategory;
