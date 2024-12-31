"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Category = ({ category }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("تعديل");
  const categoryRef = useRef(null);
  const { toast } = useToast();

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(!isEditing);
      setEditText("حفظ");
      return;
    }
    setIsEditing(!isEditing);
    setEditText("تعديل");
  };

  const handleDelete = () => {};

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]">
          {category}
        </div>
      </DialogTrigger>
      <DialogContent
        closeClass="text-white"
        className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
      >
        <DialogTitle />
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="text-2xl font-semibold text-white">إسم الفئة </div>
          <input
            ref={categoryRef}
            readOnly={!isEditing}
            defaultValue={category}
            dir="rtl"
            type="text"
            placeholder="العناية بالشعر"
            className={cn(
              "my-2 w-3/4 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2",
              !isEditing
                ? "hover:cursor-not-allowed"
                : "focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]",
            )}
          />
          <div className="flex w-3/4 flex-row gap-4">
            <button
              onClick={() => handleEdit()}
              type="button"
              className={cn(
                "w-full rounded-lg border-2 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                isEditing
                  ? "border-emerald-500 bg-emerald-500 hover:bg-transparent hover:text-emerald-500"
                  : "border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500",
              )}
            >
              {editText}
            </button>
            <button
              onClick={() => handleDelete()}
              type="button"
              className="w-full rounded-lg border-2 border-red-500 bg-red-500 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-red-500"
            >
              إحذف{" "}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Category;
