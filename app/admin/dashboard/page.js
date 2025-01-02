"use client";

import "./page.css";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DashFeaturedProducts from "@/components/DashFeaturedProducts/DashFeaturedProducts";

const page = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setFeaturedProducts(data.data.featuredProducts);
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
    <div className="flex w-full flex-col gap-10 overflow-auto px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
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
            <DashFeaturedProducts
              ChangeUrl={ChangeUrl}
              featuredProducts={featuredProducts}
              setFeaturedProducts={setFeaturedProducts}
              loading={loading}
              setLoading={setLoading}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default page;
