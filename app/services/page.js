"use client";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import ServiceDescCard from "@/components/ServiceDescCard/ServiceDescCard";
import React from "react";

const page = () => {
  const serviceCardData = [
    {
      title: "",
      description:
        "",
      logo: "fa-solid fa-clipboard fa-flip-horizontal",
    },
    {
      title: "",
      description:
        "",
      logo: "fa-solid fa-screwdriver-wrench fa-flip-horizontal",
    },
    {
      title: "",
      description:
        "",
      logo: "fa-solid fa-industry fa-flip-horizontal",
    },
    {
      title: "",
      description:
        "",
      logo: "fa-solid fa-wrench fa-flip-horizontal",
    },
  ];

  const serviceDescData = [
    {
      title: "",
      description:
        "",
      items: [
        "",
        "",
        "",
      ],
    },
    {
      title: "",
      description:
        "",
      items: [
        "",
        "",
        "",
      ],
    },
    {
      title: "",
      description:
        "",
      items: [
        "",
        "",
        "",
      ],
    },
    {
      title: "",
      description:
        "",
      items: [
        "",
        "",
        "",
      ],
    },
  ];

  return (
    <div dir="rtl" className="mx-auto mt-6 flex w-full flex-col items-center justify-center gap-20">
      {/* Services Title */}

      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          <span className="text-center font-lato text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
            Services
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
        </div>
        <span className="text-center font-lato text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
          What We Do
        </span>
      </div>

      {/* Services cards grid */}

      <div className="mx-2 grid grid-cols-1 gap-4 xxsm:mx-6 xsm:mx-12 md:mx-20 md:grid-cols-2 lg:mx-12 lg:grid-cols-3 xl:mx-4 xl:grid-cols-4">
        {serviceCardData.map((item, index) => (
          <ServiceCard
            key={index}
            title={item.title}
            logo={item.logo}
            description={item.description}
          />
        ))}
      </div>

      {/* Services descriptions cards  */}

      <div className="grid w-full grid-cols-1 gap-12 border-[1px] border-neutral-100 bg-white px-5 py-20 shadow-sm drop-shadow-sm xxsm:px-8 xsm:px-12 sm:px-16 md:grid-cols-2 md:gap-6 md:px-10 lg:grid-cols-3 lg:px-6 xl:grid-cols-4 xl:px-10">
        {serviceDescData.map((item, index) => (
          <ServiceDescCard
            key={index}
            title={item.title}
            description={item.description}
            items={item.items}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
