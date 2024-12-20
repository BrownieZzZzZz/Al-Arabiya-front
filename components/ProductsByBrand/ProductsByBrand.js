"use client";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "../ProductCard/ProductCard";

const ProductsByBrand = ({ lng, ChangeUrl }) => {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [loadingProducts, setloadingProducts] = useState(false);

  const [brands, setBrands] = useState([
    {
      name: "Sheglam",
      logo: "/images/sheglam.png",
    },
    {
      name: "Sheglam",
      logo: "/images/sheglam.png",
    },
    {
      name: "Sheglam",
      logo: "/images/sheglam.png",
    },
    {
      name: "Sheglam",
      logo: "/images/sheglam.png",
    },
    {
      name: "Sheglam",
      logo: "/images/sheglam.png",
    },
    {
      name: "Sheglam",
      logo: "/images/sheglam.png",
    },
    {
      name: "Sheglam",
      logo: "/images/sheglam.png",
    },
  ]);

  const [product, setproduct] = useState([
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product1.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product2.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product3.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product4.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "0",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product5.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product6.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
  ]);

  useEffect(() => {
    setloadingProducts(true);

    setTimeout(() => {
      setloadingProducts(false);
    }, 2000);
  }, [selectedBrand]);
  //
  return (
    <section className="mx-4 mt-20">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="mb-2 flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12"></div>
          <span className="text-center text-4xl font-bold text-neutral-800">
            منتجات حسب الماركة
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12"></div>
        </div>

        <div className="mt-5 flex w-full flex-shrink-0 flex-row gap-6 overflow-x-auto pb-4 min-[700px]:justify-center">
          {brands.map((brand, index) => (
            <div
              className={cn(
                "w-[100px] flex-shrink-0 rounded-lg p-3 font-semibold transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-stone-200",
                selectedBrand === index
                  ? "bg-stone-300 hover:bg-stone-300"
                  : "",
              )}
              onClick={() => {
                setSelectedBrand(index);
              }}
              key={index}
            >
              <img src={brand.logo} alt="logo"></img>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "flex w-full items-center justify-center delay-0",
            loadingProducts ? "animate-fadeoutdown" : "animate-fadeinup",
          )}
        >
          <div className="w-full max-w-[1400px] px-10">
            <Carousel
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className="-ml-1">
                {product.map((product, index) => (
                  <CarouselItem
                    key={index}
                    className="flex w-full pl-1 min-[600px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="flex w-full p-2">
                      <ProductCard className="w-full" product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-10 border-0 text-xl" />
              <CarouselNext className="-right-10 border-0 text-xl" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsByBrand;
