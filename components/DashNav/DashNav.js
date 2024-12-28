"use client";

import React, { useRef } from "react";
import DashMenu from "../DashMenu/DashMenu";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashHeader from "../DashHeader/DashHeader";
import { useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";

const DashNav = () => {
  const closeButton = useRef(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);
  return (
    <div className="relative">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--dash-theme5)]"></div>
        </div>
      )}
      {/* MOBILE SIDE NAV BELOW  */}

      <div className="flex w-full items-center border-b border-[#2c2d33] bg-transparent p-5 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <i className="fa-solid fa-bars-staggered text-2xl text-white"></i>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[250px] border-transparent bg-[var(--dash-theme)]"
          >
            <SheetTitle></SheetTitle>
            <div
              className={cn(
                "flex flex-col items-center gap-8 bg-transparent py-4",
              )}
            >
              <DashHeader />
              <DashMenu
                closeButton={closeButton}
                ChangeUrl={(url) => {
                  ChangeUrl(url);
                }}
              />
            </div>

            <SheetClose>
              <button
                type="button"
                className="hidden"
                ref={closeButton}
              ></button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDE NAV BELOW */}

      <div
        className={cn(
          "mr-10 lg:mr-20 hidden min-h-[100vh] sticky top-0 left-0 w-[250px] flex-col items-center gap-8 border-r border-[#2c2d33] bg-transparent px-5 py-8 md:flex",
        )}
      >
        <DashHeader />
        <DashMenu
          closeButton={closeButton}
          ChangeUrl={(url) => {
            ChangeUrl(url);
          }}
        />
      </div>
    </div>
  );
};

export default DashNav;
