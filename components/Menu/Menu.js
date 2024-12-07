"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import "./Menu.css";

const Menu = ({ orientation, closeButton, setLoadingPage, user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);


  return (
    <div
      className={cn(
        "hidden flex-row items-center gap-8 text-[15px] min-[1260px]:flex",
        orientation == "col" && "flex flex-col items-start gap-7 text-lg",
      )}
    >
      <div
        className={cn(
          "link text-neutral-700",
          pathname.includes("contact") && "active",
        )}
      >
        <a
          // onClick={() => {
          //   setLoadingPage(true);
          //   startTransition(() => {
          //     router.push("/contact");
          //   });
          //   setTimeout(() => {
          //     closeButton?.current.click();
          //   }, 500);
          // }}

          onClick={() => {
            router.push("/contact");
          }}
          className="hover:cursor-pointer"
        >
          إتصل بنا 
        </a>
      </div>
      <div
        className={cn(
          "link text-neutral-700",
          pathname.includes("services") && "active",
        )}
      >
        <a
          // onClick={() => {
          //   setLoadingPage(true);
          //   startTransition(() => {
          //     router.push("/services");
          //   });
          //   setTimeout(() => {
          //     closeButton?.current.click();
          //   }, 500);
          // }}
          className="hover:cursor-pointer"
        >
          خدمات 
        </a>
      </div>
      <div
        className={cn(
          "link text-neutral-700",
          pathname.includes("about") && "active",
        )}
      >
        <a
          // onClick={() => {
          //   setLoadingPage(true);
          //   startTransition(() => {
          //     router.push("/about");
          //   });
          //   setTimeout(() => {
          //     closeButton?.current.click();
          //   }, 500);
          // }}
          className="hover:cursor-pointer"
        >
          من نحن 
        </a>
      </div>
      <div
        className={cn(
          "link text-neutral-700",
          pathname.includes("about") && "active",
        )}
      >
        <a
          // onClick={() => {
          //   setLoadingPage(true);
          //   startTransition(() => {
          //     router.push("/about");
          //   });
          //   setTimeout(() => {
          //     closeButton?.current.click();
          //   }, 500);
          // }}
          className="hover:cursor-pointer"
        >
          منتجاتنا 
        </a>
      </div>
      <div
        className={cn("link text-neutral-700", pathname === "/" && "active")}
      >
        <a
          onClick={() => {
            setLoadingPage(true);
            startTransition(() => {
              router.push("/");
            });
            setTimeout(() => {
              closeButton?.current.click();
            }, 500);
          }}
          className="hover:cursor-pointer"
        >
           الصفحة الرئيسية 
        </a>
      </div>
      
    </div>
  );
};

export default Menu;
