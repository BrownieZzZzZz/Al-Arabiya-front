"use client";

import "./Nav.css";

import { useState, useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { cn, eventBus } from "@/lib/utils";

import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SideCartItem from "../SideCartItem/SideCartItem";
import Menu from "../Menu/Menu";
import { toast } from "@/hooks/use-toast";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchInputPC = useRef(null);
  const searchInputMB = useRef(null);
  const closeButton = useRef(null);
  const closeDialog = useRef(null);
  const closeCartButton = useRef(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState({});
  const [signed, setSigned] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  const logout = () => {
    Cookies.remove("access_token");
    setLoadingPage(true);
    location.href = "/sign-in";
  };

  const checkUser = async () => {
    try {
      setLoadingUser(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/account`,
        {
          method: "GET",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setLoadingUser(false);
      setSigned(true);
      setUser(data.data);
      localStorage.setItem("cart", JSON.stringify(data.data.cart));
      setItems(data.data.cart);
    } catch (error) {
      setLoadingUser(false);
    }
    setLoadingUser(false);
  };

  const updateCart = async () => {
    setItems(JSON.parse(localStorage.getItem("cart") || "{}"));

    if (signed) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
          method: "PUT",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: JSON.parse(localStorage.getItem("cart")) || {},
          }),
        });
      } catch (error) {
        console.error("Error saving cart to database:", error);
      }
    }
  };

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  const ChangePath = () => {
    if (signed) {
      if (pathname.includes("sign") || pathname.includes("reset")) {
        toast({
          title: "تم تسجيل الدخول بالفعل",
          description: "سيتم تحويلك إلى صفحة الملف الشخصي",
          variant: "warning",
          duration: 5000,
        });
        ChangeUrl("/profile");
        return;
      }
    } else if (!signed) {
      if (pathname.includes("profile")) {
        toast({
          title: "غير مسموح بالوصول",
          description: "يرجى تسجيل الدخول أولاً",
          variant: "warning",
          duration: 5000,
        });
        ChangeUrl("/sign-in");
        return;
      }
    }
  };

  const calculateTotalPrice = (product, quantity) => {
    return (
      (product.onSold
        ? quantity >= 5
          ? product.soldMultiPrice
          : product.soldSinglePrice
        : quantity >= 5
          ? product.normalMultiPrice
          : product.normalSinglePrice) * quantity
    );
  };

  const fetchProductById = async (productId) => {
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
      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const UpdatePriceFunction = async () => {
    const updatedPrices = {};
    for (let id of Object.keys(items)) {
      const product = await fetchProductById(id);
      updatedPrices[id] = calculateTotalPrice(product, items[id]);
    }
    setTotalPrice(updatedPrices);
  };

  useEffect(() => {
    UpdatePriceFunction();
  }, [items]);

  useEffect(() => {
    if (!pathname.includes("admin")) {
      checkUser();
    }
  }, []);

  useEffect(() => {
    if (closeButton.current) {
      closeButton.current.click();
    }
    if (closeDialog.current) {
      closeDialog.current.click();
    }
    if (closeCartButton.current) {
      closeCartButton.current.click();
    }
  });

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    if (!loadingUser && !pathname.includes("admin")) {
      ChangePath();
    }

    eventBus.on("updateCart", updateCart);

    return () => {
      eventBus.off("updateCart", updateCart);
    };
  }, [signed, loadingUser]);

  if (pathname.includes("admin")) {
    return <></>;
  }

  if (pathname.includes("sign") || pathname.includes("reset")) {
    return (
      <>
        {(loadingPage || loadingUser) && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={cn(
        "nav flex w-full flex-row-reverse items-center justify-between bg-white p-2 pb-4 pt-4 min-[500px]:px-5 md:px-10",
      )}
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}

      <div className="flex flex-row-reverse items-center gap-12 text-lg font-semibold">
        <div
          className="flex items-center justify-center hover:cursor-pointer"
          onClick={() => {
            ChangeUrl("/");
          }}
        >
          <img src="/images/logo.png" alt="logo" className="w-[100px]" />
        </div>
        <Menu
          user={user}
          orientation="row"
          ChangeUrl={(url, option = {}) => {
            ChangeUrl(url, option);
          }}
        />
      </div>

      <div className="flex flex-row-reverse gap-3">
        {!pathname.includes("products") && (
          <div className="mr-1 hidden flex-row items-center gap-2 rounded-md border px-2 py-2 min-[800px]:mr-4 min-[880px]:flex">
            <i className="fa-solid fa-magnifying-glass text-md px-2 text-neutral-500" />
            <input
              dir="rtl"
              type="text"
              placeholder={"ابحث عن منتج"}
              className="bg-transparent placeholder-neutral-500 outline-none"
              ref={searchInputPC}
            />
            <button
              onClick={() => {
                ChangeUrl(`/products/?search=${searchInputPC.current.value}`);
              }}
              type="button"
              className="mr-1 rounded-xl bg-[var(--theme)] px-2.5 py-2 text-white transition-all duration-200 hover:scale-105"
            >
              ابحث
            </button>
          </div>
        )}

        {!pathname.includes("products") && (
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center justify-center rounded-md p-2 transition-all duration-200 active:scale-105 active:bg-zinc-100 min-[880px]:hidden">
                <i className="fa-solid fa-magnifying-glass text-2xl" />
              </div>
            </DialogTrigger>
            <DialogContent
              closeClass="text-neutral-800"
              className="flex items-center justify-center px-2 py-12"
            >
              <DialogTitle />
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="text-xl font-semibold text-neutral-500">
                  تريد البحث عن ماذا ؟
                </div>
                <div className="flex w-full flex-row items-center gap-2 rounded-md border px-2 py-2">
                  <input
                    dir="rtl"
                    type="text"
                    placeholder={"ابحث عن منتج "}
                    className="w-full placeholder-neutral-500 outline-none"
                    ref={searchInputMB}
                  />
                  <button
                    onClick={() => {
                      ChangeUrl(
                        `/products/?search=${searchInputMB.current.value}`,
                      );
                    }}
                    type="button"
                    className="mr-4 rounded-md bg-[var(--theme)] px-2.5 py-2 text-white transition-all duration-200 hover:scale-105"
                  >
                    <div className="min-[390px]:hidden">
                      <i className="fa-solid fa-magnifying-glass text-md text-white" />
                    </div>
                    <span className="hidden min-[390px]:block">ابحث </span>
                  </button>
                </div>
              </div>
              <DialogClose className="hidden" ref={closeDialog} />
            </DialogContent>
          </Dialog>
        )}

        {/* CART  */}

        {!pathname.includes("checkout") && !pathname.includes("cart") && (
          <Sheet key={"CartSheet"}>
            <SheetTrigger asChild className="cart md:mx-2 md:my-1">
              <button className="cart">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#404040"
                    className="bi bi-handbag"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z" />
                  </svg>
                  <div className="total-number">
                    {Object.keys(items).length}
                  </div>
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SheetTitle />
              <SheetDescription />
              <div className="flex h-full flex-col justify-between">
                <div className="border-b-[1px] border-neutral-300 py-3 text-center">
                  <span className="font-lato text-2xl font-semibold text-neutral-800">
                    سلة التسوق
                  </span>
                </div>
                <div className="cart relative flex w-full flex-1 flex-col overflow-auto">
                  {Object.keys(items).map((id, index) => (
                    <SideCartItem
                      key={index}
                      productId={id}
                      quantity={items[id]}
                      index={index}
                      ChangeUrl={(url) => {
                        ChangeUrl(url);
                      }}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2 border-t-[1px] border-neutral-300 p-4">
                  <div className="flex flex-row-reverse justify-between">
                    <span className="font-lato text-xl font-semibold text-neutral-700">
                      المجموع
                    </span>
                    <span className="font-lato text-xl font-semibold text-[var(--theme)]">
                      {sumValues(totalPrice)} DT
                    </span>
                  </div>
                  <button
                    type="button"
                    className="bg-zinc-200 py-3 text-sm font-bold text-neutral-700 transition-colors duration-200 hover:bg-zinc-300"
                    onClick={() => {
                      ChangeUrl("/cart");
                    }}
                  >
                    عرض السلة
                  </button>
                  <button
                    type="button"
                    className="bg-[var(--theme)] py-3 text-sm font-bold text-[#ffffff] transition-colors duration-200 hover:bg-[var(--theme)]"
                    onClick={() => {
                      ChangeUrl("/checkout");
                    }}
                  >
                    الدفع
                  </button>
                </div>
              </div>
              <SheetClose ref={closeCartButton} className="hidden" />
            </SheetContent>
          </Sheet>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => {
                  if (!loadingUser) {
                    if (signed) {
                      ChangeUrl("/profile");
                    } else {
                      ChangeUrl("/sign-in");
                    }
                  }
                }}
                className={cn(
                  "flex flex-row items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-zinc-100",
                  loadingUser && "hover:cursor-not-allowed",
                )}
              >
                <div className="hidden text-lg min-[800px]:block">
                  {loadingUser ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black" />
                    </div>
                  ) : signed ? (
                    user.full_name
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")
                  ) : (
                    "تسجيل دخول "
                  )}
                </div>
                <i className="fa-regular fa-user text-2xl" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {loadingUser ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black" />
                </div>
              ) : signed ? (
                "Profile"
              ) : (
                "Login / Register"
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {signed && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => {
                    logout();
                  }}
                  className="flex items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:cursor-pointer md:px-4 md:py-1 md:hover:scale-110 md:hover:bg-zinc-100"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-2xl text-neutral-800" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Log out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <div className="flex self-center p-2 min-[1180px]:hidden">
              <i className="fa-solid fa-bars self-center text-2xl" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[220px] bg-white">
            <DialogTitle />
            <Menu
              user={user}
              orientation="col"
              ChangeUrl={(url, option = {}) => {
                ChangeUrl(url, option);
              }}
            />
            <SheetClose className="hidden" ref={closeButton} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Nav;
