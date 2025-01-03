"use client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import  { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const page = () => {
  const param = useParams();
  const id = param.id;
  const [menu, setMenu] = useState(1);
  const [order, setOrder] = useState({
    id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
    state: "Waiting to get Accepted...",
    created_At: "2024-12-30T21:42:35.210Z",
    first_name: "jawhar",
    last_name: "hmidis",
    phone: "+21650974080",
    email: "jawharhmidi01@gmail.com",
    city: "mannouba",
    address: "medneine, Lessifr",
    deliveryPrice: 0,
    type: "delivery",
    order_Products: [
      {
        id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
        quantity: 2,
        price: 80,
        product: {
          id: "77733c30-be54-48c7-8963-71d3c4621c70",
          name: "زيت الأرغان للعناية بالشعر",
          description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
          img: [
            "/images/product2.jpg",
            "/images/product1.jpg",
            "/images/product2.jpg",
            "/images/product3.jpg",
            "/images/product4.jpg",
            "/images/product5.jpg",
            "/images/product6.jpg",
          ],
          onSold: false,
          soldPercentage: 0,
          normalSinglePrice: 80,
          soldSinglePrice: 80,
          normalMultiPrice: 200,
          soldMultiPrice: 200,
          in_Stock: true,
          created_At: "2024-12-27T23:17:08.320Z",
        },
      },
      {
        id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
        quantity: 2,
        price: 80,
        product: {
          id: "77733c30-be54-48c7-8963-71d3c4621c70",
          name: "زيت الأرغان للعناية بالشعر",
          description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
          img: [
            "/images/product2.jpg",
            "/images/product1.jpg",
            "/images/product2.jpg",
            "/images/product3.jpg",
            "/images/product4.jpg",
            "/images/product5.jpg",
            "/images/product6.jpg",
          ],
          onSold: false,
          soldPercentage: 0,
          normalSinglePrice: 80,
          soldSinglePrice: 80,
          normalMultiPrice: 200,
          soldMultiPrice: 200,
          in_Stock: true,
          created_At: "2024-12-27T23:17:08.320Z",
        },
      },
      {
        id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
        quantity: 2,
        price: 80,
        product: {
          id: "77733c30-be54-48c7-8963-71d3c4621c70",
          name: "زيت الأرغان للعناية بالشعر",
          description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
          img: [
            "/images/product2.jpg",
            "/images/product1.jpg",
            "/images/product2.jpg",
            "/images/product3.jpg",
            "/images/product4.jpg",
            "/images/product5.jpg",
            "/images/product6.jpg",
          ],
          onSold: false,
          soldPercentage: 0,
          normalSinglePrice: 80,
          soldSinglePrice: 80,
          normalMultiPrice: 200,
          soldMultiPrice: 200,
          in_Stock: true,
          created_At: "2024-12-27T23:17:08.320Z",
        },
      },
      {
        id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
        quantity: 2,
        price: 80,
        product: {
          id: "77733c30-be54-48c7-8963-71d3c4621c70",
          name: "زيت الأرغان للعناية بالشعر",
          description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
          img: [
            "/images/product2.jpg",
            "/images/product1.jpg",
            "/images/product2.jpg",
            "/images/product3.jpg",
            "/images/product4.jpg",
            "/images/product5.jpg",
            "/images/product6.jpg",
          ],
          onSold: false,
          soldPercentage: 0,
          normalSinglePrice: 80,
          soldSinglePrice: 80,
          normalMultiPrice: 200,
          soldMultiPrice: 200,
          in_Stock: true,
          created_At: "2024-12-27T23:17:08.320Z",
        },
      },
      {
        id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
        quantity: 2,
        price: 80,
        product: {
          id: "77733c30-be54-48c7-8963-71d3c4621c70",
          name: "زيت الأرغان للعناية بالشعر",
          description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
          img: [
            "/images/product2.jpg",
            "/images/product1.jpg",
            "/images/product2.jpg",
            "/images/product3.jpg",
            "/images/product4.jpg",
            "/images/product5.jpg",
            "/images/product6.jpg",
          ],
          onSold: false,
          soldPercentage: 0,
          normalSinglePrice: 80,
          soldSinglePrice: 80,
          normalMultiPrice: 200,
          soldMultiPrice: 200,
          in_Stock: true,
          created_At: "2024-12-27T23:17:08.320Z",
        },
      },
      {
        id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
        quantity: 2,
        price: 80,
        product: {
          id: "77733c30-be54-48c7-8963-71d3c4621c70",
          name: "زيت الأرغان للعناية بالشعر",
          description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
          img: [
            "/images/product2.jpg",
            "/images/product1.jpg",
            "/images/product2.jpg",
            "/images/product3.jpg",
            "/images/product4.jpg",
            "/images/product5.jpg",
            "/images/product6.jpg",
          ],
          onSold: false,
          soldPercentage: 0,
          normalSinglePrice: 80,
          soldSinglePrice: 80,
          normalMultiPrice: 200,
          soldMultiPrice: 200,
          in_Stock: true,
          created_At: "2024-12-27T23:17:08.320Z",
        },
      },
    ],
  });

  const { toast } = useToast();

  const deleteRef = useRef(null);

  const deletePopUp = () => {
    deleteRef.current.click();
  };

  const handleSave = () => {
    toast({
      title: "تم ",
      description: "تم حفظ التغييرات بنجاح",
      variant: "success",
      duration: 2000,
    });
  };

  const handleDelete = () => {
    toast({
      title: "تم ",
      description: "تم حذف الطلب بنجاح",
      variant: "success",
      duration: 2000,
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        معطيات الطلب
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)]">
        <div className="flex items-center justify-center gap-6 border-b-[3px] border-[var(--dash-theme)]">
          <div
            onClick={() => setMenu(1)}
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 1 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              الحريف
            </span>
          </div>
          <div
            onClick={() => setMenu(2)}
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 2 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              الطلب{" "}
            </span>
          </div>
        </div>
        {menu === 1 && (
          <div className="flex flex-col gap-3 px-4 py-6 sm:px-10">
            <div className="mb-2 text-3xl font-bold text-white">
              معطيات الحريف
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <div className="flex w-full flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  الاسم
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  defaultValue={order.first_name}
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                  اللقب
                </span>
                <input
                  type="text"
                  readOnly
                  disabled
                  defaultValue={order.last_name}
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                الهاتف
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.phone}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                البريد الالكتروني
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.email}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                المدينة
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.city}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                العنوان
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.address}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
          </div>
        )}
        {menu === 2 && (
          <div className="flex flex-col gap-3 px-4 py-6 sm:px-10">
            <div className="mb-2 text-3xl font-bold text-white">
              معطيات الطلب
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                معرف الطلب
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.id}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                السعر الاجمالي
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={
                  order.order_Products.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0,
                  ) +
                  order.deliveryPrice +
                  " دينار"
                }
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                سعر المنتجات
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={
                  order.order_Products.reduce(
                    (acc, product) => acc + product.price * product.quantity,
                    0,
                  ) + " دينار"
                }
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                سعر التوصيل
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.deliveryPrice + " دينار"}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-[var(--dash-theme5)]">
                تاريخ الانشاء
              </span>
              <input
                type="text"
                readOnly
                disabled
                defaultValue={order.created_At}
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
              />
            </div>
            <div className="mb-2 text-3xl font-bold text-white">
              تفاصيل المنتجات
            </div>
            {order.order_Products.map((product, index) => (
              <div
                key={index}
                className="flex w-full items-start justify-between rounded-lg bg-cyan-100/70 p-4 shadow"
              >
                <div className="flex flex-col">
                  <div className="text-neutral-800">{product.product.name}</div>
                  <div className="text-sm text-neutral-200">
                    الكمية: {product.quantity}
                  </div>
                  <div className="text-sm text-neutral-200">
                    السعر: {product.price}DT
                  </div>
                </div>
                <div className="h-16 w-16">
                  <img
                    src={product.product.img[0]}
                    alt={product.product.name}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full max-w-[800px] flex-row gap-2 pr-4 sm:pr-10">
        <button
          onClick={() => handleSave()}
          type="button"
          className="w-[120px] bg-emerald-700 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-emerald-500"
        >
          حفظ
        </button>
        <button
          onClick={() => deletePopUp()}
          type="button"
          className="w-[120px] bg-red-900 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500"
        >
          حذف
        </button>
      </div>
      <Dialog>
        <DialogTrigger ref={deleteRef} className="hidden" />
        <DialogContent
          closeClass="text-white"
          className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
        >
          <DialogTitle />
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="w-3/4 text-center text-3xl font-bold text-red-500">
              تحذير
            </div>
            <div className="text-medium w-3/4 text-center text-xl text-white">
              حذف هذا الطلب  سينجم عنه حذف كل البيانات المرتبطة بهذا المنتج
            </div>
            <button
              onClick={() => handleDelete()}
              type="button"
              className={cn(
                "mt-4 w-3/4 rounded-lg bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500",
              )}
            >
              أنا متأكد
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
