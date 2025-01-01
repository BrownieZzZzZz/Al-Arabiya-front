"use client";
import DashNotFoundComp from "@/components/DashNotFoundComp/DashNotFoundComp";
import DashProductCard from "@/components/DashProductCard/DashProductCard";
import DashSearch from "@/components/DashSearch/DashSearch";
import NotFoundComp from "@/components/NotFoundComp/NotFoundComp";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";

const page = () => {
  const router = useRouter();
  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, { ...options });
    });
  };
  const products = [
    {
      id: 1,
      name: "عطر زهري",
      category: { name: "عطور" },
      brand: {
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
      img: ["/images/product1.jpg"],
      description:
        "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
      onSold: false,
      normalSinglePrice: 100,
      soldSinglePrice: 80,
      multiNormalPrice: 80,
      multiSoldPrice: 64,
      soldPercentage: 20,
    },
    {
      id: 1,
      name: "عطر زهري",
      category: "عطور",
      brand: {
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
      img: ["/images/product1.jpg"],
      description:
        "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
      onSold: false,
      normalSinglePrice: 100,
      soldSinglePrice: 80,
      multiNormalPrice: 80,
      multiSoldPrice: 64,
      soldPercentage: 20,
    },
    {
      id: 1,
      name: "عطر زهري",
      category: "عطور",
      brand: {
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
      img: ["/images/product1.jpg"],
      description:
        "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
      onSold: false,
      normalSinglePrice: 100,
      soldSinglePrice: 80,
      multiNormalPrice: 80,
      multiSoldPrice: 64,
      soldPercentage: 20,
    },
    {
      id: 1,
      name: "عطر زهري",
      category: "عطور",
      brand: {
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
      img: ["/images/product1.jpg"],
      description:
        "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
      onSold: false,
      normalSinglePrice: 100,
      soldSinglePrice: 80,
      multiNormalPrice: 80,
      multiSoldPrice: 64,
      soldPercentage: 20,
    },
    {
      id: 1,
      name: "عطر زهري",
      category: "عطور",
      brand: {
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
      img: ["/images/product1.jpg"],
      description:
        "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
      onSold: false,
      normalSinglePrice: 100,
      soldSinglePrice: 80,
      multiNormalPrice: 80,
      multiSoldPrice: 64,
      soldPercentage: 20,
    },
    {
      id: 1,
      name: "عطر زهري",
      category: "عطور",
      brand: {
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
      img: ["/images/product1.jpg"],
      description:
        "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
      onSold: true,
      normalSinglePrice: 100,
      soldSinglePrice: 80,
      multiNormalPrice: 80,
      multiSoldPrice: 64,
      soldPercentage: 20,
    },
  ];
  return (
    <div className="flex w-full flex-col gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <DashSearch placeholder="عطر زهر، كريم مرطب، أو يمكنك إدخال معرف المنتوج... " />
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

        {/* ADD PRODUCT */}
        <div onClick={() => {
          ChangeUrl("/admin/dashboard/products/add");
        }} className="flex items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-5 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2b2b36]">
          <div className="flex flex-col items-center justify-between gap-2">
            <div className="grid size-[40px] place-items-center rounded-full border-2 border-neutral-300 text-center text-2xl font-semibold text-neutral-300">
              <div className="mb-1">+</div>
            </div>
            <div className="text-center text-xl font-semibold text-neutral-300">
              أضف منتوج جديدة{" "}
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        {products.map((product, index) => (
          <DashProductCard
            key={index}
            product={product}
            ChangeUrl={ChangeUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
