import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";
import DashProductCard from "../DashProductCard/DashProductCard";
import Brand from "../Brand/Brand";
import DashSearch from "../DashSearch/DashSearch";

const DashProductsByBrand = ({
  ChangeUrl,
  brands,
  setBrands,
  loading,
  setLoading,
  addBrand,
  deleteBrand,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limitBrands, setLimitBrands] = useState(6);
  const [limitProducts, setLimitProducts] = useState(8);
  const [products, setProducts] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [brandsData, setBrandsData] = useState([]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product/search?brand=${brands[selectedBrand]?.name}&page=1&limit=${limitProducts}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
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
    setLoadingProducts(false);
  };

  const fetchBrands = async (search = null) => {
    setLoadingBrands(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/brand?${search ? `name=${search.trim()}` : ``}&page=1&limit=999`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setBrandsData(data.data.data);

      setLoadingBrands(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingBrands(false);
    }
    setLoadingBrands(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchProducts();
    }
  }, [loading, selectedBrand]);
  return (
    <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
      <div className="text-center text-4xl font-bold text-[var(--dash-theme5)]">
        منتجات حسب الماركة
      </div>

      <div className="mt-5 flex w-full flex-shrink-0 flex-row items-center gap-6 overflow-x-auto pb-4 min-[700px]:justify-center">
        {loading
          ? Array.from({ length: limitBrands }).map((_, index) => (
              <div
                className={cn(
                  "flex-shrink-0 rounded-lg p-2 font-semibold transition-all duration-200 hover:scale-105 hover:cursor-pointer",
                )}
                key={index}
              >
                <Skeleton className={"h-[35px] w-[100px] bg-neutral-300"} />
              </div>
            ))
          : brands.map((brand, index) => (
              <div
                className={cn(
                  "flex-shrink-0 rounded-lg p-2 font-semibold transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-stone-200",
                  selectedBrand === index
                    ? "bg-stone-300 hover:bg-stone-300"
                    : "",
                )}
                onClick={() => {
                  setSelectedBrand(index);
                }}
                key={index}
              >
                {brand.name}
              </div>
            ))}
      </div>

      <div className="h-full w-full overflow-hidden">
        <div
          className={cn(
            "flex w-full items-center justify-center overflow-hidden delay-0",
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
                {products.map((product, index) => (
                  <CarouselItem
                    key={index}
                    className="flex w-full pl-1 min-[630px]:basis-1/2 md:basis-2/3 lg:basis-1/2 xl:basis-1/3"
                  >
                    <div className="flex w-full p-2">
                      <DashProductCard
                        product={product}
                        ChangeUrl={(url) => ChangeUrl(url)}
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
      </div>

      <div className="mb-10 mt-16 flex w-full flex-col gap-8">
        <DashSearch
          placeholder="...Sheglam, Vaseline"
          search={(search) => fetchBrands(search)}
        />
        <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {loadingBrands
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]"
                >
                  <Skeleton className={"h-7 w-[100px] bg-neutral-200"} />
                </div>
              ))
            : brandsData.map((brand) => (
                <Brand
                  key={brand.id}
                  brand={brand}
                  fetchBrands={() => fetchBrands()}
                  isAdd={!brands.find((b) => b.id === brand.id)}
                  addBrand={addBrand}
                  isDelete={brands.find((b) => b.id === brand.id)}
                  deleteBrand={deleteBrand}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default DashProductsByBrand;
