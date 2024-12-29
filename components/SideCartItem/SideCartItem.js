import "./SideCartItem.css";

import { Separator } from "../ui/separator";

import Image from "next/image";

const SideCartItem = ({
  name,
  dimension,
  price,
  id,
  closeButton,
  index,
  ChangeUrl,
}) => {
  return (
    <div
      onClick={() => {
        setTimeout(() => {
          closeButton?.current?.click();
        }, 500);
        ChangeUrl(`/products/${id}`);
      }}
      className="flex flex-col"
    >
      {index != 0 ? <Separator className="bg-neutral-300" /> : <></>}
      <div className="relative flex flex-row items-center gap-3 p-3 transition-colors duration-200 hover:cursor-pointer hover:bg-neutral-200">
        <div className="group absolute right-2 top-1 grid size-6 place-items-center rounded-full border-[2px] border-transparent transition-colors duration-200 hover:cursor-pointer hover:border-emerald-700 hover:bg-zinc-100">
          <i className="fa-solid fa-x text-[10px] text-neutral-500 transition-colors duration-200 group-hover:text-emerald-700"></i>
        </div>
        <Image
          width={60}
          height={0}
          alt="product"
          src="/images/product1.jpg"
        />
        <div className="flex flex-col justify-between">
          <span className="font-lato font-semibold text-neutral-700">
            {name}
          </span>
          <div>
            <span className="font-lato font-semibold text-neutral-700">
              Dimension:{" "}
            </span>
            <span className="font-lato text-sm text-neutral-500">
              {dimension}
            </span>
          </div>
          <div>
            <span className="font-lato font-semibold text-neutral-400">
              1 x
            </span>
            <span className="font-lato font-semibold text-[var(--theme)]">
              {" "}
              {`${price} QR`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartItem;
