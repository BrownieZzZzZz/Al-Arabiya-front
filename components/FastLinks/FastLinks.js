"use client";

import { usePathname } from "next/navigation";
import "./FastLinks.css";

import { useRef, useEffect } from "react";

const FastLinks = () => {
  const pathname = usePathname();
  const Go_Top = useRef(null);

  const handleScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const check = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      Go_Top?.current?.classList?.add("showGoTop");
    } else {
      Go_Top?.current?.classList?.remove("showGoTop");
    }
  };

  useEffect(() => {
    window.onscroll = function () {
      check();
    };
  }, []);
  if (pathname.includes("sign") || pathname.includes("reset")) return <></>;
  return (
    <div>
      <div
        className="gotop bottom-5 left-10 z-10"
        ref={Go_Top}
        onClick={() => {
          handleScroll();
        }}
      >
        <i className="fa-solid fa-chevron-up text-[var(--theme)]"></i>
      </div>
    </div>
  );
};

export default FastLinks;
