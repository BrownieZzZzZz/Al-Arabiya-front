"use client";

import DashProductCard from "@/components/DashProductCard/DashProductCard";
import DashSearch from "@/components/DashSearch/DashSearch";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import SkeletonDashProductCard from "@/components/DashProductCard/SkeletonDashProductCard";

const page = () => {
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, { ...options });
    });
  };

  const fetchProducts = async (search = null) => {
    try {
      setLoadingProducts(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product?${search ? `name=${search.trim()}` : ``}&page=1&limit=999`,
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
      <DashSearch
        placeholder="عطر زهر، كريم مرطب، أو يمكنك إدخال معرف المنتوج... "
        search={(query) => fetchProducts(query)}
      />
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* ADD PRODUCT */}
        <div
          onClick={() => {
            ChangeUrl("/admin/dashboard/products/add");
          }}
          className="flex min-h-[300px] items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-5 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2b2b36]"
        >
          <div className="flex flex-col items-center justify-between gap-2">
            <div className="grid size-[40px] place-items-center rounded-full border-2 border-neutral-300 text-center text-2xl font-semibold text-neutral-300">
              <div className="mb-1">+</div>
            </div>
            <div className="text-center text-xl font-semibold text-neutral-300">
              أضف منتوج جديدة
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        {loadingProducts
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonDashProductCard key={index} />
            ))
          : products.map((product, index) => (
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
