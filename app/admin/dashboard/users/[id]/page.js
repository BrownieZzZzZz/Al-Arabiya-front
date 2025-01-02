"use client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const page = () => {
  const param = useParams();
  const id = param.id;
  const [menu, setMenu] = useState(1);
  const { toast } = useToast();

  const deleteRef = useRef(null);

  const deletePopUp = () => {
    deleteRef.current.click();
  };

  const handleDelete = () => {
    toast({
      title: "تم ",
      description: "تم حذف الطلب بنجاح",
      variant: "success",
      duration: 2000,
    });
  };
  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        معطيات الطلب
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)]">
        <div className="flex items-center justify-center gap-6 border-b-[3px] border-[var(--dash-theme)]">
          <div
            onClick={() => setMenu(1)}
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 1 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              الحريف
            </span>
          </div>
          <div
            onClick={() => setMenu(2)}
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 2 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
            طلباته {" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
