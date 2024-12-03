"use client";
import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="image relative flex h-[700px] w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="absolute left-0 top-0 z-10 h-[700px] w-full bg-neutral-900 opacity-40"></div>
      <div dir="rtl" className="grid h-full w-full md:grid-cols-2">
        <div
          className={
            "absolute z-20 flex h-full md:w-full md:max-w-[700px] xl:max-w-[900px] flex-col  justify-center gap-6 transition-opacity duration-1000 m-3 md:mr-10"
          }
        >
          <div
            dir="rtl"
            className="text-5xl font-semibold text-[var(--theme2)] opacity-95 md:text-6xl"
          >
            مرحبًا بك في العربية – وجهتك الأولى للجمال!
          </div>
          <div
            dir="rtl"
            className="text-3xl font-extralight tracking-wider text-[var(--theme2)] opacity-90 md:text-4xl"
          >
            اكتشفي مجموعة واسعة من مستحضرات التجميل الفاخرة المصممة لإبراز جمالك
            الطبيعي. تسوقي الآن واحصلي على أفضل المنتجات التي تستحقينها.
          </div>
          <button
            dir="rtl"
            type="button"
            className="place-self-start rounded-lg border-2 border-[var(--theme)] bg-transparent px-6 py-3 mt-5 text-center text-xl text-[var(--theme)] transition-all duration-200 hover:scale-110 hover:border-[var(--theme)] hover:bg-[var(--theme)] hover:text-white md:px-12 md:py-4 md:text-3xl"
          >
            استكشف
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
