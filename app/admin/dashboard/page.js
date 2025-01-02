"use client";

import "./page.css";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from "@/components/ProductCard/ProductCard";
import HomeSkeletonProductCard from "@/components/ProductCard/HomeSkeletonProductCard";
import DashProductCard from "@/components/DashProductCard/DashProductCard";

const page = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(8);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/customization`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      setLoading(false);

      setProducts(data.data.featuredProducts);
      setBrands(data.data.brands);
      setCategories(data.data.categories);
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div className="flex w-full flex-col gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="featuredProducts">
          <AccordionTrigger className="text-white">
            المنتجات الأكثر طلباً
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <section className="mx-4" dir="ltr">
              <div className="text-center text-4xl font-bold text-[var(--dash-theme5)]">
                المنتجات الأكثر طلباً
              </div>

              <div className="flex w-full items-center justify-center">
                <div className="w-full max-w-[1400px] px-5">
                  <Carousel
                    opts={{
                      loop: true,
                    }}
                  >
                    <CarouselContent className="-ml-1">
                      {loading
                        ? Array.from({ length: limit }).map((_, index) => (
                            <CarouselItem
                              key={index}
                              className="flex w-full pl-1"
                            >
                              <div className="flex w-full p-2">
                                <HomeSkeletonProductCard />
                              </div>
                            </CarouselItem>
                          ))
                        : products.map((product, index) => (
                            <CarouselItem
                              key={index}
                              className="flex w-full pl-1"
                            >
                              <div className="flex w-full p-2">
                                <DashProductCard
                                  className="w-full"
                                  ChangeUrl={ChangeUrl}
                                  product={product}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-10 border-0 bg-[var(--dash-theme1)] text-xl text-white" />
                    <CarouselNext className="-right-10 border-0 bg-[var(--dash-theme1)] text-xl text-white" />
                  </Carousel>
                </div>
              </div>
            </section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default page;
