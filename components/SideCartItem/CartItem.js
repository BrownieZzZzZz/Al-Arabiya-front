import { cn, eventBus } from "@/lib/utils";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const CartItem = ({
  productId,
  quantity,
  setTotalPrice,
  index,
  items,
  setItems,
  ChangeUrl,
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

  const increaseProductNumber = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    cart[productId] = cart[productId] ? 1 + cart[productId] : 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    setTotalPrice((prev) => {
      const returnObject = { ...prev };
      returnObject[productId] =
        (product.onSold
          ? quantity + 1 >= 5
            ? product.soldMultiPrice
            : product.soldSinglePrice
          : quantity + 1 >= 5
            ? product.normalMultiPrice
            : product.normalSinglePrice) *
        (quantity + 1);
      return returnObject;
    });

    setItems(cart);

    eventBus.emit("updateCart");
  };

  const decreaseProductNumber = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (cart[productId] > 1) {
      cart[productId] = cart[productId] - 1;
    } else {
      delete cart[productId];
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setTotalPrice((prev) => {
      const returnObject = { ...prev };
      if (quantity == 1) {
        delete returnObject[productId];
        return returnObject;
      }
      returnObject[productId] =
        (product.onSold
          ? quantity - 1 >= 5
            ? product.soldMultiPrice
            : product.soldSinglePrice
          : quantity - 1 >= 5
            ? product.normalMultiPrice
            : product.normalSinglePrice) *
        (quantity - 1);
      return returnObject;
    });

    setItems(cart);

    eventBus.emit("updateCart");
  };

  const removeItem = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    delete cart[productId];

    localStorage.setItem("cart", JSON.stringify(cart));

    setTotalPrice((prev) => {
      const returnObject = { ...prev };
      delete returnObject[productId];
      return returnObject;
    });

    setItems((prev) => {
      const returnObject = { ...prev };
      delete returnObject[productId];
      return returnObject;
    });

    eventBus.emit("updateCart");
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <tbody>
      <tr
        className={cn(
          "hidden border-neutral-200 md:table-row",
          index == items.length - 1 ? "" : "border-b",
        )}
      >
        <td
          className="p-[10px]"
          onClick={() => {
            if (loadingProduct) return;
            removeItem();
          }}
        >
          <i className="fa-solid fa-x text-[11px] text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-[var(--theme)]" />
        </td>
        <td className="h-[70px] w-[110px] p-[10px]">
          <div className="relative">
            {loadingProduct === false && product.onSold && (
              <div className="absolute right-0 top-0 z-10 grid select-none place-items-center rounded-bl-md rounded-tr-lg bg-emerald-600 p-1">
                <span className="text-xs font-semibold text-white">
                  {product.soldPercentage}%
                </span>
              </div>
            )}
            {loadingProduct ? (
              <Skeleton className="h-[70px] w-[110px] rounded-lg bg-neutral-300 object-cover shadow-lg hover:cursor-pointer" />
            ) : (
              <img
                onClick={() => {
                  ChangeUrl(`/products/${productId}`);
                }}
                alt="product"
                src={product.img[0]}
              />
            )}
          </div>
        </td>
        <td className="p-[10px]">
          <div
            onClick={() => {
              if (loadingProduct) return;
              ChangeUrl(`/products/${productId}`);
            }}
            className="font-lato text-[17px] font-bold text-neutral-800 transition-colors duration-200 hover:cursor-pointer hover:text-[var(--theme)]"
          >
            {loadingProduct ? (
              <Skeleton className={"my-1 h-6 w-[150px] bg-neutral-300"} />
            ) : (
              product.name
            )}
          </div>
          <div className="text-sm font-medium text-neutral-500">
            {loadingProduct ? (
              <Skeleton className={"my-1 h-5 w-[70px] bg-neutral-300"} />
            ) : (
              product.brand.name
            )}
          </div>
        </td>
        <td className="p-[10px]">
          {loadingProduct ? (
            <Skeleton className={"my-1 h-6 w-[50px] bg-neutral-300"} />
          ) : product.onSold ? (
            <>
              {quantity >= 5 ? (
                <div className="flex flex-row-reverse items-center justify-center gap-1">
                  <span className="text-lg font-medium text-[var(--theme)]">
                    {product.soldMultiPrice}DT
                  </span>
                  <span className="text-neutral-500 line-through">
                    {product.normalMultiPrice}DT
                  </span>
                </div>
              ) : (
                <div className="flex flex-row-reverse items-center justify-center gap-1">
                  <span className="text-lg font-medium text-[var(--theme)]">
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
        </td>
        <td className="p-[10px]">
          <div className="flex flex-row items-center justify-center gap-2">
            <button
              type="button"
              disabled={loadingProduct}
              onClick={() => {
                if (loadingProduct) return;
                decreaseProductNumber();
              }}
              className={cn(
                "group grid size-[35px] place-items-center border-2 border-neutral-700 font-semibold transition-all duration-200",
                loadingProduct
                  ? "hover:cursor-not-allowed"
                  : "hover:cursor-pointer hover:bg-neutral-700",
              )}
            >
              {loadingProduct ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-neutral-700" />
                </div>
              ) : (
                <i className="fa-solid fa-minus text-neutral-700 group-hover:text-white" />
              )}
            </button>
            <span className="font-lato w-5 text-center text-xl font-semibold">
              {loadingProduct ? 0 : quantity}
            </span>
            <button
              type="button"
              disabled={loadingProduct}
              onClick={() => {
                if (loadingProduct) return;
                increaseProductNumber();
              }}
              className={cn(
                "group grid size-[35px] place-items-center border-2 border-neutral-700 font-semibold transition-all duration-200",
                loadingProduct
                  ? "hover:cursor-not-allowed"
                  : "hover:cursor-pointer hover:bg-neutral-700",
              )}
            >
              {loadingProduct ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-neutral-700" />
                </div>
              ) : (
                <i className="fa-solid fa-plus text-neutral-700 group-hover:text-white" />
              )}
            </button>
          </div>
        </td>
        <td className="p-[10px]">
          <span className="text-lg font-bold text-[var(--theme)]">
            {loadingProduct
              ? //   <Skeleton
                //     className={"mx-1 my-auto inline-block h-5 w-8 bg-neutral-300"}
                //   />
                0
              : product.onSold
                ? quantity >= 5
                  ? quantity * product.soldMultiPrice
                  : quantity * product.soldSinglePrice
                : quantity >= 5
                  ? quantity * product.normalMultiPrice
                  : quantity * product.normalSinglePrice}
            DT
          </span>
        </td>
      </tr>

      <tr className="contents md:hidden">
        <td colSpan={7}>
          <div className="flex w-full flex-row gap-3 border-b border-neutral-200 py-4 min-[420px]:gap-4 sm:gap-8">
            <div className="relative">
              {loadingProduct === false && product.onSold && (
                <div className="absolute right-0 top-0 z-10 grid select-none place-items-center rounded-bl-md rounded-tr-lg bg-emerald-600 p-1">
                  <span className="text-xs font-semibold text-white">
                    {product.soldPercentage}%
                  </span>
                </div>
              )}
              {loadingProduct ? (
                <Skeleton
                  className={
                    "h-[100px] w-[125px] rounded-lg bg-neutral-300 object-cover shadow-lg hover:cursor-pointer"
                  }
                />
              ) : (
                <Image
                  width={100}
                  height={0}
                  alt={product.name}
                  src={product.img[0]}
                  className="h-[100px] w-[125px] rounded-lg object-cover shadow-lg hover:cursor-pointer"
                  onClick={() => {
                    ChangeUrl(`/products/${productId}`);
                  }}
                />
              )}
            </div>
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row justify-between pb-2">
                <div>
                  <div
                    onClick={() => {
                      if (loadingProduct) return;
                      ChangeUrl(`/products/${productId}`);
                    }}
                    className="font-lato text-[17px] font-bold text-neutral-800 transition-colors duration-200 hover:cursor-pointer hover:text-[var(--theme)]"
                  >
                    {loadingProduct ? (
                      <Skeleton
                        className={"my-1 h-6 w-[120px] bg-neutral-300"}
                      />
                    ) : (
                      product.name
                    )}
                  </div>
                  <div className="text-sm font-medium text-neutral-500">
                    {loadingProduct ? (
                      <Skeleton
                        className={"my-1 h-6 w-[70px] bg-neutral-300"}
                      />
                    ) : (
                      product.brand.name
                    )}
                  </div>
                </div>
                <i className="fa-solid fa-x self-center text-[12px] text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-emerald-700" />
              </div>
              <div className="border-mask h-[1px] w-full bg-neutral-200" />
              <div className="flex w-full flex-row justify-between py-2">
                <div className="font-lato my-auto text-[17px] font-semibold text-neutral-800">
                  سعر المنتج
                </div>
                {loadingProduct ? (
                  <Skeleton className={"h-6 w-6 bg-neutral-300"} />
                ) : product.onSold ? (
                  <>
                    {quantity >= 5 ? (
                      <div className="flex flex-row-reverse items-center justify-center gap-1">
                        <span className="text-lg font-medium text-[var(--theme)]">
                          {product.soldMultiPrice}DT
                        </span>
                        <span className="text-neutral-500 line-through">
                          {product.normalMultiPrice}DT
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-row-reverse items-center justify-center gap-1">
                        <span className="text-lg font-medium text-[var(--theme)]">
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
              </div>
              <div className="border-mask h-[1px] w-full bg-neutral-200" />
              <div className="flex w-full flex-row justify-between py-2">
                <div className="font-lato my-auto text-[17px] font-semibold text-neutral-800">
                  الكمية
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={loadingProduct}
                    onClick={() => {
                      if (loadingProduct) return;
                      decreaseProductNumber();
                    }}
                    className={cn(
                      "group grid size-[35px] place-items-center border-2 border-neutral-700 font-semibold transition-all duration-200",
                      loadingProduct
                        ? "hover:cursor-not-allowed"
                        : "hover:cursor-pointer hover:bg-neutral-700",
                    )}
                  >
                    {loadingProduct ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-neutral-700" />
                      </div>
                    ) : (
                      <i className="fa-solid fa-minus text-neutral-700 group-hover:text-white" />
                    )}
                  </button>
                  <span className="font-lato w-5 text-center text-xl font-semibold">
                    {loadingProduct ? 0 : quantity}
                  </span>
                  <button
                    type="button"
                    disabled={loadingProduct}
                    onClick={() => {
                      if (loadingProduct) return;
                      increaseProductNumber();
                    }}
                    className={cn(
                      "group grid size-[35px] place-items-center border-2 border-neutral-700 font-semibold transition-all duration-200",
                      loadingProduct
                        ? "hover:cursor-not-allowed"
                        : "hover:cursor-pointer hover:bg-neutral-700",
                    )}
                  >
                    {loadingProduct ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-neutral-700" />
                      </div>
                    ) : (
                      <i className="fa-solid fa-plus text-neutral-700 group-hover:text-white" />
                    )}
                  </button>
                </div>
              </div>
              <div className="border-mask h-[1px] w-full bg-neutral-200" />
              <div className="flex w-full flex-row justify-between py-2">
                <div className="font-lato my-auto text-[17px] font-semibold text-neutral-800">
                  المجموع
                </div>
                <span className="text-lg font-bold text-[var(--theme)]">
                  {loadingProduct
                    ? 0
                    : product.onSold
                      ? quantity >= 5
                        ? quantity * product.soldMultiPrice
                        : quantity * product.soldSinglePrice
                      : quantity >= 5
                        ? quantity * product.normalMultiPrice
                        : quantity * product.normalSinglePrice}
                  DT
                </span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default CartItem;
