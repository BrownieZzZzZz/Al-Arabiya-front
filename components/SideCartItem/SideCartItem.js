import "./SideCartItem.css";

import { Separator } from "../ui/separator";

const SideCartItem = ({ item, closeButton, index, ChangeUrl }) => {
  const product = {
    id: 1234,
    name: "مرطب الوجه الطبيعي",
    description: "مرطب طبيعي خفيف مناسب لجميع أنواع البشرة.",
    img: [
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg",
      "/images/product5.jpg",
      "/images/product6.jpg",
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg",
      "/images/product5.jpg",
      "/images/product6.jpg",
    ],
    brand: { img: "/images/sheglam.png", name: "Sheglam" },
    onSold: true,
    soldPercentage: 15,
    normalSinglePrice: 45.0,
    soldSinglePrice: 38.25,
    normalMultiPrice: 40,
    soldMultiPrice: 34,
    in_Stock: true,
    category: { name: "العناية بالبشرة" },
  };
  return (
    <div
      onClick={() => {
        setTimeout(() => {
          closeButton?.current?.click();
        }, 500);
        ChangeUrl(`/products/${item.productId}`);
      }}
      className="flex flex-col"
    >
      {index != 0 ? <Separator className="bg-neutral-300" /> : <></>}
      <div
        dir="rtl"
        className="relative flex flex-row items-center gap-3 p-3 transition-colors duration-200 hover:cursor-pointer hover:bg-neutral-200"
      >
        <div
          onClick={() => {
            alert("Item removed from cart");
          }}
          className="group absolute left-2 top-1 z-10 grid size-6 place-items-center rounded-full border-[2px] border-transparent transition-colors duration-200 hover:cursor-pointer hover:border-yellow-600 hover:bg-zinc-100"
        >
          <i className="fa-solid fa-x text-[10px] text-neutral-500 transition-colors duration-200 group-hover:text-yellow-600"></i>
        </div>
        <div className="relative">
          {product.onSold && (
            <div className="absolute right-0 top-0 z-10 grid place-items-center rounded-bl-lg rounded-tr-lg bg-emerald-600 p-1">
              <span className="text-xs font-semibold text-white">
                {product.soldPercentage}%
              </span>
            </div>
          )}
          <img
            alt="product"
            src={product.img[0]}
            className="h-[80px] w-[110px] rounded-lg object-cover shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-sm font-medium text-neutral-800">
            {product.brand.name}
          </span>
          <span className="font-lato font-semibold text-neutral-700">
            {product.name}
          </span>
          <span className="font-lato text-sm text-neutral-500">
            {" "}
            {product.category.name}{" "}
          </span>
          <div dir="rtl" className="flex flex-row items-center gap-1 text-end">
            {product.onSold ? (
              <>
                {item.quantity >= 5 ? (
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
                {item.quantity >= 5 ? (
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
              {item.quantity} x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartItem;
