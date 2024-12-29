"use client";

import "./Nav.css";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useTransition } from "react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

import SideCartItem from "../SideCartItem/SideCartItem";
import Menu from "../Menu/Menu";
import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetContent,
  SheetTrigger,
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

const Nav = () => {
  const searchInputPC = useRef(null);
  const searchInputMB = useRef(null);
  const router = useRouter();
  const closeButton = useRef(null);
  const closeDialog = useRef(null);
  const pathname = usePathname();
  const [loadingUser, setLoadingUser] = useState(true);
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const closeCartButton = useRef(null);

  const [items, setItems] = useState([
      {
        productId: 1234,
        quantity: 2
      },
      {
        productId: 1234,
        quantity: 3
      },
      {
        productId: 1234,
        quantity: 4
      },
      {
        productId: 1234,
        quantity: 5
      },
  ]);

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
    } catch (error) {
      setLoadingUser(false);
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (closeButton.current) {
      closeButton.current.click();
    }
    if (closeDialog.current) {
      closeDialog.current.click();
    }
  });

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    if (signed) {
      if (pathname.includes("admin")) {
        if (pathname.includes("sign") || pathname.includes("reset")) {
          if (user.role === "admin") {
            ChangeUrl("/admin/dashboard");
          }
        } else {
          if (user.role !== "admin") {
            ChangeUrl("/");
          }
        }
      } else if (pathname.includes("sign") || pathname.includes("reset")) {
        ChangeUrl("/");
      }
    } else {
      if (pathname.includes("dashboard") && !loadingUser) {
        ChangeUrl("/admin/sign-in");
      }
    }
  }, [signed, loadingUser]);

  if (
    pathname.includes("sign") ||
    pathname.includes("reset") ||
    pathname.includes("admin")
  ) {
    return (
      <>
        {(loadingPage || loadingUser) && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
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
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}

      <div className="flex flex-row-reverse items-center gap-12 text-lg font-semibold">
        <div
          className="flex items-center justify-center hover:cursor-pointer"
          onClick={() => {
            ChangeUrl("/");
          }}
        >
          <img src="/images/logo.png" alt="logo" className="w-[100px]"></img>
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
            <i className="fa-solid fa-magnifying-glass text-md px-2 text-neutral-500"></i>
            <input
              dir="rtl"
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
                <i className="fa-solid fa-magnifying-glass text-2xl"></i>
              </div>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center px-2 py-12">
              <DialogTitle></DialogTitle>
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="text-xl font-semibold text-neutral-500">
                  تريد البحث عن ماذا ؟
                </div>
                <div className="flex w-full flex-row items-center gap-2 rounded-md border px-2 py-2">
                  {/* <i className="fa-solid fa-magnifying-glass text-md px-1 text-neutral-500"></i> */}

                  <input
                    dir="rtl"
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
                      <i className="fa-solid fa-magnifying-glass text-md text-white"></i>
                    </div>
                    <span className="hidden min-[390px]:block">ابحث </span>
                  </button>
                </div>
              </div>
              <DialogClose>
                <a className="hidden" ref={closeDialog}></a>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}

        {/* CART  */}

        <Sheet>
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
                <div className="total-number">{items.length}</div>
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <SheetTitle></SheetTitle>
            <div className="flex h-full flex-col justify-between">
              <div className="border-b-[1px] border-neutral-300 py-3 text-center">
                <span className="font-lato text-2xl font-semibold text-neutral-800">
                  سلة التسوق
                </span>
              </div>
              <div className="cart relative flex w-full flex-1 flex-col overflow-auto">
                {items.map((item, index) => (
                  <SideCartItem
                    key={index}
                    item={item}
                    closeButton={closeCartButton}
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
                    800 DT
                  </span>
                </div>
                <button
                  type="button"
                  className="bg-zinc-200 py-3 text-sm font-bold text-neutral-700 transition-colors duration-200 hover:bg-zinc-300"
                  onClick={() => {
                    closeCartButton.current.click();
                    ChangeUrl("/cart");
                  }}
                >
                  عرض السلة
                </button>
                <button
                  type="button"
                  className="bg-[var(--theme)] py-3 text-sm font-bold text-[#ffffff] transition-colors duration-200 hover:bg-[var(--theme)]"
                  onClick={() => {
                    closeCartButton.current.click();
                    ChangeUrl("/checkout");
                  }}
                >
                  الدفع
                </button>
              </div>
            </div>
            <SheetClose>
              <button
                type="button"
                className="hidden"
                ref={closeCartButton}
              ></button>
            </SheetClose>
          </SheetContent>
        </Sheet>

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
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black"></div>
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
                <i className="fa-regular fa-user text-2xl"></i>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {loadingUser ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black"></div>
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
                  <i className="fa-solid fa-arrow-right-from-bracket text-2xl text-neutral-800"></i>
                </div>
              </TooltipTrigger>
              <TooltipContent>Log out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <div className="flex self-center p-2 min-[1180px]:hidden">
              <i className="fa-solid fa-bars self-center text-2xl"></i>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[220px] bg-white">
            <DialogTitle></DialogTitle>
            <Menu
              user={user}
              orientation="col"
              ChangeUrl={(url, option = {}) => {
                ChangeUrl(url, option);
              }}
            />
            <SheetClose>
              <a className="hidden" ref={closeButton}></a>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Nav;


