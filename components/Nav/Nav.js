"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useTransition } from "react";
import "./Nav.css";
import Menu from "../Menu/Menu";
import {
  Sheet,
  SheetClose,
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
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";


const Nav = () => {
  const searchInputPC = useRef("");
  const searchInputMB = useRef("");
  const router = useRouter();
  const closeButton = useRef(null);
  const closeDialog = useRef(null);
  const pathname = usePathname();
  const [loadingUser, setLoadingUser] = useState(false);
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  
  // const checkUser = async () => {
  //   try {
  //     setLoadingUser(true);

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/users/account`,
  //       {
  //         method: "GET",
  //         headers: {
  //           access_token: Cookies.get("access_token"),
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );
  //     const data = await response.json();

  //     if (data.data === null) {
  //       throw new Error(data.message);
  //     }

  //     setLoadingUser(false);
  //     setSigned(true);
  //     setUser(data.data);
  //   } catch (error) {
  //     setLoadingUser(false);
  //   }
  //   setLoadingUser(false);
  // };

  // const logout = () => {
  //   Cookies.remove("access_token");
  //   setLoadingPage(true);
  //   location.href = "/sign-in";
  // };

  // useEffect(() => {
  //   checkUser();
  //   setLoadingPage(false);
  // }, []);

  // useEffect(() => {
  //   setLoadingPage(isPending);
  // }, [isPending]);


  // const menu = useRef(null);
  // const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if(scrollTop >= 90){
  //       setIsVisible(false)
  //     }
  //     else{
  //       setIsVisible(true);
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll);
    
  //   handleScroll();

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };

  // }, []);

  return (
    <div
      className={cn(
        "flex w-full flex-row-reverse items-center justify-between bg-white p-2 pb-4 pt-4 min-[500px]:px-5 md:px-10",
      )}
    >
      {/* <SocketNotifications user={user} /> */}
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}

      <div className="flex flex-row-reverse items-center gap-12 text-lg font-semibold">
        <div
          className="flex justify-center items-center hover:cursor-pointer "
          onClick={() => {
            setLoadingPage(true);

            startTransition(() => {
              router.push("/");
            });
          }}
        >
          <img src="/images/logo.png" alt="logo" className="w-[100px]"></img>
        </div>
        <Menu
          user={user}
          orientation="row"
          setLoadingPage={(boolean) => {
            setLoadingPage(boolean);
          }}
        />
      </div>
      <div className="flex flex-row-reverse gap-3">
        {!pathname.includes("recipes") && (
          <div className="mr-1 hidden flex-row items-center gap-1 rounded-md border px-2 py-2 min-[800px]:mr-4 min-[880px]:flex">
            <i className="fa-solid fa-magnifying-glass text-md px-2 text-neutral-500"></i>
            <input
              dir="rtl"
              placeholder={"ابحث عن منتج"}
              className="bg-transparent placeholder-neutral-500 outline-none"
              ref={searchInputPC}
            />
            <button
              onClick={() => {
                setLoadingPage(true);

                startTransition(() => {
                  router.push(
                    `/recipes/?search=${searchInputPC.current.value}`,
                  );
                });
              }}
              type="button"
              className="mr-1 rounded-xl bg-[var(--theme)] px-2.5 py-2 text-white transition-all duration-200 hover:scale-105"
            >
              ابحث
            </button>
          </div>
        )}
        {!pathname.includes("recipes") && (
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center justify-center rounded-md p-2 transition-all duration-200 active:scale-105 active:bg-zinc-100 min-[880px]:hidden">
                <i className="fa-solid fa-magnifying-glass text-2xl"></i>
              </div>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center px-2 py-12">
              <DialogTitle></DialogTitle>
              <div className="flex flex-col w-full items-center justify-center gap-4">
                <div className="text-xl font-semibold text-neutral-500">
                تريد البحث عن ماذا ؟ 
                </div>
                <div className="flex-row w-full flex items-center gap-2 rounded-md border px-2 py-2">
                  {/* <i className="fa-solid fa-magnifying-glass text-md px-1 text-neutral-500"></i> */}
                  
                  <input
                    dir="rtl"
                    placeholder={"ابحث عن منتج "}
                    className="placeholder-neutral-500 w-full outline-none"
                    ref={searchInputMB}
                  />
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        closeDialog.current?.click();
                      }, 500);
                      setLoadingPage(true);

                      startTransition(() => {
                        router.push(
                          `/recipes/?search=${searchInputMB.current.value}`,
                        );
                      });
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

        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => {
                  console.log("notification Bar");
                }}
                className={cn(
                  "flex-row items-center gap-2 rounded-lg px-2 transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-zinc-100",
                  signed ? "flex" : "hidden",
                )}
              >
                <i className="fa-regular fa-bell text-2xl min-[500px]:text-xl"></i>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                // onClick={() => {
                //   if (!loadingUser) {
                //     if (signed) {
                //       setLoadingPage(true);

                //       startTransition(() => {
                //         router.push("/profile");
                //       });
                //     } else {
                //       setLoadingPage(true);

                //       startTransition(() => {
                //         router.push("/sign-in");
                //       });
                //     }
                //   }
                // }}
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
            <div className="flex p-2 self-center min-[1180px]:hidden">
              <i className="fa-solid fa-bars self-center text-2xl"></i>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[220px] bg-white">
            <DialogTitle></DialogTitle>
            <Menu
              user={user}
              orientation="col"
              closeButton={closeButton}
              setLoadingPage={(boolean) => {
                setLoadingPage(boolean);
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
