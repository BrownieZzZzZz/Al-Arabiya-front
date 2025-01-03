import "./SideCartItem.css";

import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import { eventBus } from "@/lib/utils";
const SideCartItem = ({
  productId,
  quantity,
  closeButton,
  index,
  ChangeUrl,
  setTotalPrice,
}) => {
  const [product, setProduct] = useState({});

  const [loadingProduct, setLoadingProduct] = useState(true);

  const fetchProduct = async () => {
    setLoadingProduct(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/byid/${productId}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProduct(data.data);

      setTotalPrice((prev) => {
        const returnObject = { ...prev };
        returnObject[data.data.id] =
          (data.data.onSold
            ? quantity >= 5
              ? data.data.soldMultiPrice
              : data.data.soldSinglePrice
            : quantity >= 5
              ? data.data.normalMultiPrice
              : data.data.normalSinglePrice) * quantity;
        return returnObject;
      });

      setLoadingProduct(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const removeItem = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    delete cart[productId];

    localStorage.setItem("cart", JSON.stringify(cart));

    eventBus.emit("updateCart");
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (closeButton.current) {
      closeButton.current.click();
    }
  });

  return (
    <div
      onClick={() => {
        ChangeUrl(`/products/${productId}`);
      }}
      className="flex flex-col"
    >
      {index != 0 ? <Separator className="bg-neutral-300" /> : <></>}
      <div
        dir="rtl"
        className="relative flex flex-row items-center gap-3 p-3 transition-colors duration-200 hover:cursor-pointer hover:bg-neutral-200"
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeItem();
          }}
          className="group absolute left-2 top-1 z-10 grid size-6 place-items-center rounded-full border-[2px] border-transparent transition-colors duration-200 hover:cursor-pointer hover:border-yellow-600 hover:bg-zinc-100"
        >
          <i className="fa-solid fa-x text-[10px] text-neutral-500 transition-colors duration-200 group-hover:text-yellow-600" />
        </div>
        <div className="relative">
          {!loadingProduct && product.onSold && (
            <div className="absolute right-0 top-0 z-10 grid place-items-center rounded-bl-lg rounded-tr-lg bg-emerald-600 p-1">
              <span className="text-xs font-semibold text-white">
                {product.soldPercentage}%
              </span>
            </div>
          )}
          {loadingProduct ? (
            <Skeleton className="my-1 h-[80px] w-[110px] rounded-lg bg-neutral-300 object-cover shadow-lg" />
          ) : (
            <img
              alt="product"
              src={product.img[0]}
              className="h-[80px] w-[110px] rounded-lg object-cover shadow-lg"
            />
          )}
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-sm font-medium text-neutral-800">
            {loadingProduct ? (
              <Skeleton className={"my-1 h-5 w-[80px] bg-neutral-300"} />
            ) : (
              product.brand.name
            )}
          </span>
          <span className="font-lato font-semibold text-neutral-700">
            {loadingProduct ? (
              <Skeleton className={"my-1 h-5 w-[150px] bg-neutral-300"} />
            ) : (
              product.name
            )}
          </span>
          <span className="font-lato text-sm text-neutral-500">
            {loadingProduct ? (
              <Skeleton className={"my-1 h-5 w-[90px] bg-neutral-300"} />
            ) : (
              product.category.name
            )}
          </span>
          <div dir="rtl" className="flex flex-row items-center gap-1 text-end">
            {loadingProduct ? (
              <Skeleton className={"my-1 h-5 w-[60px] bg-neutral-300"} />
            ) : product.onSold ? (
              <>
                {quantity >= 5 ? (
                  <div className="flex flex-row-reverse items-center justify-center gap-1">
                    <span className="font-medium text-[var(--theme)]">
                      {product.soldMultiPrice}DT
                    </span>
                    <span className="text-neutral-500 line-through">
                      {product.normalMultiPrice}DT
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row-reverse items-center justify-center gap-1">
                    <span className="font-medium text-[var(--theme)]">
                      {product.soldSinglePrice}DT
                    </span>
                    <span className="text-neutral-500 line-through">
                      {product.normalSinglePrice}DT
                    </span>
                  </div>
                )}
              </>
            ) : (
              <>
                {quantity >= 5 ? (
                  <>
                    <span className="font-medium text-[var(--theme)]">
                      {product.normalMultiPrice}DT
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-medium text-[var(--theme)]">
                      {product.normalSinglePrice}DT
                    </span>
                  </>
                )}
              </>
            )}
            <span
              dir="ltr"
              className="font-lato font-semibold text-neutral-400"
            >
              {loadingProduct ? 0 : quantity} x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartItem;
