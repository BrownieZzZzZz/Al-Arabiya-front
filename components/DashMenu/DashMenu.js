"use client";
import React, { useEffect, useState } from "react";
import DashMenuItem from "../DashMenuItem/DashMenuItem";
import { usePathname } from "next/navigation";

const DashMenu = ({ closeButton, ChangeUrl }) => {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState("" || pathname );
  useEffect(() => {
    console.log(pathname)
  }, [])
  const dashMenuItems = [
    {
      title: "Dashboard",
      path: "",
      icon: "fa-solid fa-gear",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: "fa-regular fa-user", 
    },
    {
      title: "Products",
      path: "/products",
      icon: "fa-solid fa-layer-group",
    },
    {
      title: "Categories",
      path: "/categories",
      icon: "fa-solid fa-sliders",
    },
    {
      title: "Logout",
      path: "/sign-in",
      icon: "fa-solid fa-arrow-right-from-bracket",
    },
  ];
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {dashMenuItems.map((item, index) => (
        <DashMenuItem
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
