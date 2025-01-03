"use client";
import  { useEffect, useState } from "react";
import DashMenuItem from "../DashMenuItem/DashMenuItem";
import { usePathname } from "next/navigation";

const DashMenu = ({ closeButton, ChangeUrl, setLoadingPage }) => {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState("" || pathname);

  const dashMenuItems = [
    {
      title: "إعدادات",
      path: "",
      icon: "fa-solid fa-gear",
    },
    {
      title: "عروض خاصة",
      path: "/special-offers",
      icon: "fas fa-th-large",
    },
    {
      title: "الطلبات",
      path: "/orders",
      icon: "fa-solid fa-shopping-cart"
    },
    {
      title: "منتجات",
      path: "/products",
      icon: "fa-solid fa-layer-group",
    },
    {
      title: "ماركات ",
      path: "/brands",
      icon: "fa-brands fa-font-awesome fa-flip-horizontal",
    },
    {
      title: "فئات",
      path: "/categories",
      icon: "fa-solid fa-sliders",
    },
    {
      title: "المستخدمين",
      path: "/users",
      icon: "fa-solid fa-users",
    },
    {
      title: "حسابك",
      path: "/account",
      icon: "fa-regular fa-user",
    },
    {
      title: "الخروج",
      path: "/sign-in",
      icon: "fa-solid fa-arrow-right-from-bracket",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {dashMenuItems.map((item, index) => (
        <DashMenuItem
          setLoadingPage={setLoadingPage}
          key={index}
          title={item.title}
          path={item.path}
          icon={item.icon}
          menuState={menuState}
          setMenuState={setMenuState}
          closeButton={closeButton}
          ChangeUrl={(url) => {
            ChangeUrl(url);
          }}
        />
      ))}
    </div>
  );
};

export default DashMenu;
