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
      category: "عطور",
      brand: {
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
      img: ["/images/product1.jpg"],
      description: "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
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
      description: "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
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
      description: "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
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
      description: "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
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
      description: "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
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
      description: "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
      onSold: true,
      normalSinglePrice: 100,
      soldSinglePrice: 80,
      multiNormalPrice: 80,
      multiSoldPrice: 64,
      soldPercentage: 20,
    },
  ];
  return (
    <div className="flex w-full flex-col gap-10 px-5 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10 pb-10">
      <DashSearch placeholder="عطر زهر، كريم مرطب، أو يمكنك إدخال معرف المنتوج... " />
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.length !== 0 ? (
          products.map((product, index) => (
            <DashProductCard key={index} product={product} ChangeUrl={ChangeUrl} />
          ))
        ) : (
          <DashNotFoundComp text="لا يوجد منتجات " />
        )}
      </div>
    </div>
  );
};

export default page;
