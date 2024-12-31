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
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import HomeSkeletonProductCard from "../ProductCard/HomeSkeletonProductCard";

const FeaturedProducts = ({ ChangeUrl }) => {
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limit, setLimit] = useState(8);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/mostpopular?page=1&limit=${limit}`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProducts(data.data.data);

      setLoadingProducts(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="mx-4 mt-20">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12" />
          <span className="font-lato text-center text-4xl font-bold text-neutral-800">
            المنتجات الأكثر طلباً
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12" />
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
              {loadingProducts
                ? Array.from({ length: limit }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="flex w-full pl-1 min-[600px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="flex w-full p-2">
                        <HomeSkeletonProductCard />
                      </div>
                    </CarouselItem>
                  ))
                : products.map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="flex w-full pl-1 min-[500px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="flex w-full p-2">
                        <ProductCard
                          className="w-full"
                          ChangeUrl={ChangeUrl}
                          product={product}
                        />
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
