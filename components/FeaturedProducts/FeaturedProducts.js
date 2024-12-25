"use client";

import "./FeaturedProducts.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "../ProductCard/ProductCard";
import { useState } from "react";

const FeaturedProducts = ({ ChangeUrl }) => {
  const [products, setProducts] = useState([
    {
      id: 1234,
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product1.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "0",
    },
    {
      id: 5678,
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product2.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      id: 8765,
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product3.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      id: 4321,
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product4.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "0",
    },
    {
      id: 9101,
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product5.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      id: 2131,
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product6.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
  ]);

  return (
    <section className="mx-4 mt-20">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12"></div>
          <span className="font-lato text-center text-4xl font-bold text-neutral-800">
            المنتجات الأكثر طلباً
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12"></div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-[1400px] px-10">
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="-ml-1">
              {products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="flex w-full pl-1 min-[500px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div
                    className="flex w-full p-2"
                  >
                    <ProductCard className="w-full" ChangeUrl={ChangeUrl} product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-10 border-0 text-xl" />
            <CarouselNext className="-right-10 border-0 text-xl" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
