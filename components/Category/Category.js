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
import Cookies from "js-cookie";

const Category = ({ category, fetchCategories }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("تعديل");
  const [loadingCategory, setLoadingCategory] = useState(false);
  const categoryRef = useRef(null);
  const { toast } = useToast();
  const confirmDeleteRef = useRef(null);

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(!isEditing);
      setEditText("حفظ");
      return;
    }
    if (!categoryRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم الفئة",
        variant: "warning",
      });
      return;
    }
    try {
      setLoadingCategory(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            name: categoryRef.current.value.trim(),
          }),
        },
      );

      const data = await response.json();
      if (data.data == null) {
        setLoadingCategory(false);
        if (data.message === "Category already exists") {
          toast({
            title: "خطأ",
            description: "فئة موجودة بالفعل",
            variant: "destructive",
            duration: 2500,
          });
          categoryRef.current.value = category.name;
          setIsEditing(!isEditing);
          setEditText("تعديل");

          return;
        }
        throw new Error(data.message);
      }

      toast({
        title: "تم",
        description: "تم تعديل الفئة بنجاح",
        variant: "success",
      });

      if (fetchCategories) fetchCategories();
      setLoadingCategory(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      setLoadingCategory(false);
    }
    setIsEditing(!isEditing);
    setEditText("تعديل");
  };

  const handleDelete = async () => {
    try {
      setLoadingCategory(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category/${category.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
        },
      );
      const data = await response.json();
      if (data.data == null) {
        throw new Error(data.message);
      }
      toast({
        title: "تم",
        description: "تم حذف الفئة بنجاح",
        variant: "success",
        duration: 3000,
      });
      setLoadingCategory(false);
      if (fetchCategories) fetchCategories();
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      set;
      setLoadingCategory(false);
    }
  };

  const confirmDeletePopUp = () => {
    confirmDeleteRef.current.click();
  };

  return (
    <div className="h-full w-full">
      <Dialog>
        <DialogTrigger className="hidden">
          <div ref={confirmDeleteRef} className="hidden"></div>
        </DialogTrigger>
        <DialogContent
          closeClass="text-white"
          className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
        >
          <DialogTitle />
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="w-3/4 text-center text-3xl font-bold text-red-500">
              تحذير
            </div>
            <div className="text-medium w-3/4 text-center text-xl text-white">
              حذف هذه الفئة سينجم عنه حذف كل المنتوجات المرتبطة بهذه الفئة
            </div>
            <button
              onClick={() => handleDelete()}
              type="button"
              disabled={loadingCategory}
              className={cn(
                "mt-4 w-3/4 rounded-lg border-2 border-red-500 bg-red-500 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                loadingCategory
                  ? "opacity-50 hover:cursor-not-allowed"
                  : "hover:border-red-900 hover:bg-red-900",
              )}
            >
              {loadingCategory ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                </div>
              ) : (
                "أنا متأكد"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger
          className="h-full w-full"
          onClick={() => {
            setIsEditing(false);
            setEditText("تعديل");
          }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]">
            {category.name}
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
              defaultValue={category.name}
              dir="rtl"
              type="text"
              placeholder="العناية بالشعر"
              disabled={!isEditing || loadingCategory}
              className={cn(
                "my-2 w-3/4 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2",
                !isEditing && loadingCategory
                  ? "hover:cursor-default"
                  : "focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]",
              )}
            />
            <div className="flex w-3/4 flex-row gap-4">
              <button
                onClick={() => handleEdit()}
                type="button"
                disabled={loadingCategory}
                className={cn(
                  "w-full rounded-lg border-2 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                  isEditing && !loadingCategory
                    ? "border-emerald-500 bg-emerald-500 hover:bg-transparent hover:text-emerald-500"
                    : "border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500",
                )}
              >
                {loadingCategory ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                ) : (
                  editText
                )}
              </button>
              <button
                onClick={() => confirmDeletePopUp()}
                type="button"
                disabled={loadingCategory}
                className="w-full rounded-lg border-2 border-red-500 bg-red-500 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-red-500"
              >
                {/* {loadingCategory ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                ) : (
                  "إحذف"
                )} */}
                إحذف
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Category;
