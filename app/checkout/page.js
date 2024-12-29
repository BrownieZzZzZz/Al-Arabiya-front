"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useTransition, useState } from "react";

const page = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  const cities = [
    { value: "1", text: "City 1" },
    { value: "2", text: "City 2" },
    { value: "3", text: "City 3" },
    { value: "4", text: "City 4" },
    { value: "5", text: "City 5" },
    { value: "6", text: "City 6" },
    { value: "7", text: "City 7" },
    { value: "8", text: "City 8" },
    { value: "9", text: "City 9" },
    { value: "10", text: "City 10" },
    { value: "11", text: "City 11" },
  ];
  const items = [
    {
      name: "Work Table Under Shelf",
      quantity: "3",
      price: 2000,
    },
    {
      name: "Mobile Table With Two Shelf",
      quantity: "5",
      price: 1500,
    },
    {
      name: "Single Bowl Sink Table",
      quantity: "2",
      price: 1800,
    },
    {
      name: "Base Cabinet With 3 Layer Drawer",
      quantity: "1",
      price: 1400,
    },
  ];
  return (
    <div className="mx-auto mt-6 flex w-full flex-col items-center justify-center">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"/>
        </div>
      )}
      <div className="grid w-full max-w-[1300px] grid-cols-1 gap-8 bg-white px-3 xsm:px-6 sm:px-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5 pt-6">
          <div className="font-lato text-2xl font-bold text-neutral-800">
            BILLING & SHIPPING
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="first-name" className="font-lato text-lg">
                First Name <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="First Name"
                type="text"
                id="first-name"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="last-name" className="font-lato text-lg">
                Last Name <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="Last Name"
                type="text"
                id="last-name"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="company" className="font-lato text-lg">
              Company (optional)
            </label>
            <input
              placeholder="Example Inc."
              type="text"
              id="company"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tax-number" className="font-lato text-lg">
              Tax Number (optional)
            </label>
            <input
              placeholder="Tax Identification Number"
              type="text"
              id="tax-number"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
            />
          </div>
          {/* <div className="grid grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="font-lato text-lg">
                Country <font className="text-rose-500">*</font>
              </label>
              <span
                id="country"
                className="font-lato text-xl font-semibold text-[var(--theme3)]"
              >
                Qatar
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="state" className="font-lato text-lg">
                State <font className="text-rose-500">*</font>
              </label>
              <span
                id="state"
                className="font-lato text-xl font-semibold text-[var(--theme3)]"
              >
                Doha
              </span>
            </div>
          </div> */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="font-lato text-lg">
                Country <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="Country"
                type="text"
                id="country"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
                required
                defaultValue={"Qatar"}
                readOnly={true}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="state" className="font-lato text-lg">
                State <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="State"
                type="text"
                id="state"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
                required
                defaultValue={"Doha"}
                readOnly={true}
                disabled={true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="font-lato text-lg">
              City <font className="text-rose-500">*</font>
            </label>
            <Select>
              <SelectTrigger className="border-neutral-300 bg-transparent focus:ring-[var(--theme3)]">
                <SelectValue placeholder="Select a city.." />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  <SelectLabel>Doha</SelectLabel>
                  {cities.map((city, index) => (
                    <SelectItem
                      className="transition-colors duration-150 hover:cursor-pointer focus:bg-zinc-200"
                      key={index}
                      value={city.value}
                    >
                      {city.text}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="font-lato text-lg">
              Street / District Address <font className="text-rose-500">*</font>
            </label>
            <input
              type="text"
              id="address"
              placeholder="Street / District Address"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-lato text-lg">
              Phone <font className="text-rose-500">*</font>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+974 123 456 78"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-lato text-lg">
              Email <font className="text-rose-500">*</font>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Example@domain.com"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme3)]"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 bg-[#f1f1f1] p-6 shadow-sm drop-shadow-sm">
          <span className="font-lato self-center text-2xl font-bold text-neutral-800">
            YOUR ORDER
          </span>
          <div className="flex h-fit w-full flex-col justify-between gap-3 self-center bg-[#f7f7f7] p-7">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  PRODUCT
                </span>
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  SUBTOTAL
                </span>
              </div>
              <div className="h-[2px] w-full bg-neutral-200"/>
              {items.map((item, index) => (
                <div key={index}>
                  <div className="flex flex-row justify-between gap-2 px-2 py-2.5">
                    <span className="font-lato text-neutral-500">
                      {item.name}{" "}
                      <font className="font-bold">{`x ${item.quantity}`}</font>
                    </span>
                    <span className="min-w-[90px] text-end font-medium text-neutral-500">{`${item.price * item.quantity} QR`}</span>
                  </div>
                  <div className="border-mask h-[1px] w-full bg-zinc-200 px-2"/>
                </div>
              ))}
              <div className="flex flex-row justify-between px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  Subtotal
                </span>
                <span className="text-lg font-medium text-[var(--theme3)]">
                  145000 QR
                </span>
              </div>
              <div className="h-[2px] w-full bg-neutral-200"/>
              <div className="flex flex-row items-center justify-between gap-5 px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  Shipping
                </span>
                <div className="flex flex-col gap-4 text-right text-neutral-600">
                  <div>
                    <label
                      htmlFor="weight"
                      className="radio-wrapper-8 hover:cursor-pointer"
                    >
                      <input
                        type="radio"
                        id="weight"
                        name="shipping"
                        defaultChecked
                        className="relative left-[2px] top-[6px] float-end accent-emerald-700 hover:cursor-pointer"
                      />
                      Shipping cost depends on weight:{" "}
                      <font className="font-bold text-[var(--theme3)]">
                        750 QR
                      </font>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="hq" className="hover:cursor-pointer">
                      <input
                        type="radio"
                        id="hq"
                        name="shipping"
                        className="relative left-[2px] top-[6px] float-end accent-emerald-700 hover:cursor-pointer"
                      />
                      Receipt from the company's headquarters (QATAR){" "}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="truck" className="hover:cursor-pointer">
                      <input
                        type="radio"
                        id="truck"
                        name="shipping"
                        className="relative left-[2px] top-[6px] float-end accent-emerald-700 hover:cursor-pointer"
                      />
                      A shipping truck for several products (from{" "}
                      <font className="font-bold text-[var(--theme3)]">
                        500
                      </font>{" "}
                      to{" "}
                      <font className="font-bold text-[var(--theme3)]">
                        2000 QR
                      </font>
                      ) contact customer service after ordering for shipping
                      cost.
                    </label>
                  </div>
                </div>
              </div>
              <div className="h-[2px] w-full bg-neutral-200"/>
              <div className="flex flex-row items-center justify-between gap-2 px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  Duration
                </span>
                <span className="font-lato text-end text-[17px] font-semibold text-[var(--theme3)]">
                  Shipping within 4-10 business days
                </span>
              </div>

              <div className="h-[2px] w-full bg-neutral-200"/>

              <div className="flex flex-row items-center justify-between px-2 py-4">
                <span className="font-lato text-lg font-semibold text-neutral-800">
                  Total
                </span>
                <div className="flex flex-col justify-between">
                  <span className="font-lato text-2xl font-bold text-[var(--theme3)]">
                    146750 QR
                  </span>
                  <span className="font-lato text-sm text-neutral-400">
                    (includes{" "}
                    <span className="text-[var(--theme3)]">1000 QR</span> Tax)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-neutral-300"/>
          <div className="text-neutral-500">
            Your personal data will be used to process your order, support your
            experience throughout this website, and for other purposes described
            in our{" "}
            <font
              onClick={() => {
                ChangeUrl("/terms-and-conditions#privacy");
              }}
              className="font-bold text-neutral-700 transition-colors duration-200 hover:cursor-pointer hover:text-[var(--theme)]"
            >
              privacy policy
            </font>
            .
          </div>
          <button
            className="bg-[var(--theme3)] px-2 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-[var(--theme)]"
            type="button"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
