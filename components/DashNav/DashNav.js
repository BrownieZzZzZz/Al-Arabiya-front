"use client";

import { useEffect, useTransition, useState, useRef, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AuthContext } from "@/contexts/AuthContext";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashHeader from "../DashHeader/DashHeader";
import DashMenu from "../DashMenu/DashMenu";

const DashNav = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const closeButton = useRef(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    if (closeButton.current) {
      closeButton.current.click();
    }
  });

  if (pathname.includes("sign") || pathname.includes("reset")) {
    return (
      <>
        {loadingPage && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
          </div>
        )}
      </>
    );
  }

  if (!pathname.includes("dashboard")) {
    return <></>;
  }

  return (
    <div className="relative">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      {/* MOBILE SIDE NAV BELOW  */}

      <div className="flex w-full items-center border-b border-[#2c2d33] bg-transparent p-5 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <i className="fa-solid fa-bars-staggered text-2xl text-[var(--dash-theme5)]" />
          </SheetTrigger>
          <SheetContent
            dir="rtl"
            closeClass="text-white"
            side="right"
            className="w-[250px] overflow-auto border-transparent bg-[var(--dash-theme)]"
          >
            <SheetTitle />
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

            <SheetClose className="hidden" ref={closeButton} />
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDE NAV BELOW */}

      <div
        className={cn(
          "sticky left-0 top-0 ml-10 hidden min-h-[100vh] w-[250px] flex-col items-center gap-8 border-l border-[#2c2d33] bg-transparent px-5 py-8 md:flex lg:ml-20",
        )}
      >
        <DashHeader />
        <DashMenu
          setLoadingPage={setLoadingPage}
          ChangeUrl={(url) => {
            ChangeUrl(url);
          }}
        />
      </div>
    </div>
  );
};

export default DashNav;
