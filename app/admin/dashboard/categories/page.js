"use client";

import Category from "@/components/Category/Category";
import DashSearch from "@/components/DashSearch/DashSearch";
import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const categoryRef = useRef(null);
  const { toast } = useToast();
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const addDialogClose = useRef(null);

  const addCategory = async () => {
    if (!categoryRef.current.value.trim()) {
      toast({
        variant: "warning",
        title: "خطأ",
        description: "الرجاء إدخال إسم الفئة",
        duration: 2000,
      });
      return;
    }
    
    try {
      setLoadingCategory(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category`,
        {
          method: "POST",
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
          categoryRef.current.value = "";

          return;
        }
        throw new Error(data.message);
      }
      toast({
        variant: "success",
        title: "تم",
        description: "تم إنشاء الفئة بنجاح",
        duration: 2000,
      });
      fetchCategories();
      setLoadingCategory(false);
      addDialogClose.current?.click();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الفئة",
        duration: 2000,
      });
      setLoadingCategory(false);
    }
  };

  const fetchCategories = async (search = null) => {
    setLoadingCategories(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category?${search ? `name=${search.trim()}` : ``}&page=1&limit=999`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setCategories(data.data.data);

      setLoadingCategories(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingCategories(false);
    }
    setLoadingCategories(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex w-full flex-col gap-8 px-5 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10 pb-10">
      <DashSearch
        placeholder="العناية بالشعر، المكياج..."
        search={(search) => fetchCategories(search)}
      />
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* ADD CATEGORIE */}

        <Dialog>
          <DialogTrigger>
            <div className="flex items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-5 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2b2b36]">
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="grid size-[40px] place-items-center rounded-full border-2 border-neutral-300 text-center text-2xl font-semibold text-neutral-300">
                  <div className="mb-1">+</div>
                </div>
                <div className="text-center text-xl font-semibold text-neutral-300">
                  أضف فئة جديدة{" "}
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent
            closeClass="text-white"
            className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
          >
            <DialogTitle />
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="text-2xl font-semibold text-white">
                إسم الفئة{" "}
              </div>
              <input
                ref={categoryRef}
                dir="rtl"
                type="text"
                disabled={loadingCategory}
                placeholder="العناية بالشعر"
                className="my-2 w-3/4 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2 focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]"
              />
              <button
                onClick={() => addCategory()}
                type="button"
                disabled={loadingCategory}
                className="w-3/4 rounded-lg bg-[var(--dash-theme6)] p-3 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--dash-theme5)]"
              >
                {loadingCategory ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                ) : (
                  "أضف الفئة"
                )}
              </button>
            </div>
          </DialogContent>
          <DialogClose ref={addDialogClose} className="hidden" />
        </Dialog>

        {loadingCategories
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]"
              >
                <Skeleton className={"h-7 w-[100px] bg-neutral-200"} />
              </div>
            ))
          : categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                fetchCategories={() => fetchCategories()}
              />
            ))}
      </div>
    </div>
  );
};

export default page;
