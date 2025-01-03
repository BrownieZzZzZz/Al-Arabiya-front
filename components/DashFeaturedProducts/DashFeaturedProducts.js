import { useState, useEffect } from "react";

import Cookies from "js-cookie";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DashProductCard from "@/components/DashProductCard/DashProductCard";
import DashSearch from "@/components/DashSearch/DashSearch";
import SkeletonDashProductCard from "@/components/DashProductCard/SkeletonDashProductCard";

const DashFeaturedProducts = ({
  ChangeUrl,
  featuredProducts,
  setFeaturedProducts,
  loading,
  setLoading,
  addProduct,
  deleteProduct,
}) => {
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(8);

  const fetchProducts = async (search = null) => {
    try {
      setLoadingProducts(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product?${search ? `name=${search.trim()}` : ``}&page=1&limit=999`,
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <section dir="ltr">
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
                        className="flex w-full pl-1 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="flex w-full p-2">
                          <SkeletonDashProductCard />
                        </div>
                      </CarouselItem>
                    ))
                  : featuredProducts.map((product, index) => (
                      <CarouselItem
                        key={product.id}
                        className="flex w-full pl-1 min-[630px]:basis-1/2 md:basis-2/3 lg:basis-1/2 xl:basis-1/3"
                      >
                        <div className="flex w-full p-2">
                          <DashProductCard
                            className="w-full"
                            ChangeUrl={ChangeUrl}
                            product={product}
                            isDelete={true}
                            deleteProduct={deleteProduct}
                          />
                        </div>
                      </CarouselItem>
                    ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 border-0 bg-[var(--dash-theme1)] text-xl text-white" />
              <CarouselNext className="-right-6 border-0 bg-[var(--dash-theme1)] text-xl text-white" />
            </Carousel>
          </div>
        </div>
      </section>
      <div className="mb-10 mt-16 flex w-full flex-col gap-10">
        <div className="text-center text-4xl font-bold text-[var(--dash-theme5)]">
          أضف منتج
        </div>
        <DashSearch
          placeholder="عطر زهر، كريم مرطب، أو يمكنك إدخال معرف المنتوج... "
          search={(query) => fetchProducts(query)}
        />
        <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {loadingProducts
            ? Array.from({ length: limit }).map((_, index) => (
                <SkeletonDashProductCard key={index} />
              ))
            : products
                .filter(
                  (product) =>
                    !featuredProducts.some(
                      (featuredProduct) => featuredProduct.id === product.id,
                    ),
                )
                .map((product, index) => (
                  <DashProductCard
                    key={product.id}
                    product={product}
                    ChangeUrl={ChangeUrl}
                    isAdd={true}
                    addProduct={addProduct}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

export default DashFeaturedProducts;
