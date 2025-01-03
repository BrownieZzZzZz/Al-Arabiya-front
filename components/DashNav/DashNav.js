"use client";

import { useEffect, useTransition, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashHeader from "../DashHeader/DashHeader";
import DashMenu from "../DashMenu/DashMenu";

const DashNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const closeButton = useRef(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [Admin, setAdmin] = useState({});
  const [Adminsigned, setAdminSigned] = useState(false);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  const ChangePath = () => {
    if (Adminsigned) {
      if (pathname.includes("sign") || pathname.includes("reset")) {
        ChangeUrl("/admin/dashboard");
        return;
      }
    } else if (!Adminsigned) {
      ChangeUrl("/admin/sign-in");
      return;
    }
  };

  const checkAdmin = async () => {
    try {
      setLoadingAdmin(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/account`,
        {
          method: "GET",
          headers: {
            admin_access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setLoadingAdmin(false);
      setAdminSigned(true);
      setAdmin(data.data);
    } catch (error) {
      console.error(error);

      setLoadingAdmin(false);
    }
    setLoadingAdmin(false);
  };

  useEffect(() => {
    if (!loadingAdmin) {
      ChangePath();
    }
  }, [Adminsigned, loadingAdmin]);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (closeButton.current) {
      closeButton.current.click();
    }
  });

  return (
    <div className="relative">
      {(loadingPage || loadingAdmin) && (
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
