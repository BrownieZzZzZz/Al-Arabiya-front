"use client";

import "./Menu.css";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Menu = ({ orientation, ChangeUrl, user }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "menu hidden flex-row items-center gap-8 text-[15px] min-[1260px]:flex",
        orientation == "col" && "flex flex-col items-start gap-7 text-lg",
      )}
    >
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("contact") && "active",
          )}
        >
          <a
            onClick={() => {
              ChangeUrl("/contact");
            }}
            className="hover:cursor-pointer"
          >
            إتصل بنا
          </a>
        </div>
      </div>
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("services") && "active",
          )}
        >
          <a
            onClick={() => {
              ChangeUrl("/services");
            }}
            className="hover:cursor-pointer"
          >
            خدمات
          </a>
        </div>
      </div>
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("about") && "active",
          )}
        >
          <a
            onClick={() => {
              ChangeUrl("/about");
            }}
            className="hover:cursor-pointer"
          >
            من نحن
          </a>
        </div>
      </div>
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("products") && "active",
          )}
        >
          <a
            onClick={() => {
              ChangeUrl("/products");
            }}
            className="hover:cursor-pointer"
          >
            منتجاتنا
          </a>
        </div>
      </div>
      <div>
        <div
          className={cn("link text-neutral-700", pathname === "/" && "active")}
        >
          <a
            onClick={() => {
              ChangeUrl("/");
            }}
            className="hover:cursor-pointer"
          >
            الصفحة الرئيسية
          </a>
        </div>
      </div>
      {/* <div dir="rtl">
        <div>
          <div className={cn("link text-neutral-700")}>
            <a
              onClick={() => {
                ChangeUrl("/");
              }}
              className="hover:cursor-pointer"
            >
              الصفحة الرئيسية
            </a>
          </div>
        </div>
        <div>
          <div className={cn("link text-neutral-700")}>
            <a
              onClick={() => {
                ChangeUrl("/products");
              }}
              className="hover:cursor-pointer"
            >
              منتجاتنا
            </a>
          </div>
        </div>
        <div>
          <div className={cn("link text-neutral-700")}>
            <a
              onClick={() => {
                ChangeUrl("/about");
              }}
              className="hover:cursor-pointer"
            >
              من نحن
            </a>
          </div>
        </div>
        <div>
          <div className={cn("link text-neutral-700")}>
            <a
              onClick={() => {
                ChangeUrl("/contact");
              }}
              className="hover:cursor-pointer"
            >
              إتصل بنا
            </a>
          </div>
        </div>
        <div>
          <div className={cn("link text-neutral-700")}>
            <a
              onClick={() => {
                ChangeUrl("/services");
              }}
              className="hover:cursor-pointer"
            >
              خدمات
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Menu;
