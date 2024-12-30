import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

const CheckoutCartItem = ({ quantity, productId, setTotalPrice }) => {
  const [product, setProduct] = useState();
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
      console.log(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-between gap-2 px-2 py-2.5">
        <span
          className="flex items-center gap-2 font-cairo text-neutral-500"
          dir="rtl"
        >
          {loadingProduct ? (
            <Skeleton className={"h-5 w-[150px] bg-neutral-300"} />
          ) : (
            product.name
          )}
          <font className="font-bold">x {loadingProduct ? 1 : quantity}</font>
        </span>
        <span className="flex min-w-[90px] items-center text-end font-medium text-neutral-500">
          {loadingProduct
            ? // <Skeleton className={"h-5 w-[30px] bg-neutral-300"} />
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
      </div>
      <div className="h-[1px] w-full bg-zinc-200" />
    </div>
  );
};

export default CheckoutCartItem;
