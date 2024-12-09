// components/Footer.js
"use client";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import "./Footer.css";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);
  if (pathname.includes("sign") || pathname.includes("reset")) return <></>;
  return (
    <footer className={cn("mt-20 bg-white pt-10")}>
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      <div className="mx-auto px-6">
        <div
          dir="rtl"
          className="grid gap-8 sm:grid-cols-2 min-[950px]:grid-cols-4"
        >
          <div className="font-ubuntu mb-4 sm:col-span-2 min-[950px]:col-span-1">
            <div
              className="flex items-center justify-center hover:cursor-pointer"
              onClick={() => {
                startTransition(() => {
                  router.push("/");
                });
              }}
            >
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-[100px]"
              ></img>
            </div>
            <p className="mx-auto mt-4 max-w-screen-sm text-center text-neutral-700">
            العربية – متجر إلكتروني رائد مختص في بيع مستحضرات تجميل عالية
              الجودة. نقدم لكِ مجموعة متكاملة من منتجات العناية بالبشرة،
              المكياج، والعطور المصممة لتلبية احتياجاتك اليومية وتعزيز جمالك
              الطبيعي. في العربية، نؤمن بأن الجمال يبدأ من الداخل، ولهذا نحرص
              على تقديم منتجات تجمع بين الفخامة والجودة لتمنحكِ تجربة تسوق
              استثنائية. اكتشفي الآن جمالكِ معنا!
            </p>
            {/* Social Media Icons */}
            <div className="mb-5 mt-4 flex justify-center gap-5">
              <a
                href="https://www.facebook.com/arabiya.cosmetics"
                target="_"
                className="transition-colors duration-300 hover:text-[var(--theme)]"
              >
                <FaFacebook size={26} />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--theme)]"
              >
                <FaInstagram size={26} />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--theme)]"
              >
                <FaWhatsapp size={26} />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--theme)]"
              >
                <FaTiktok size={26} />
              </a>
            </div>
          </div>

          <div dir="rtl">
            <h3 className="text-xl font-semibold">دعم </h3>
            <ul className="mt-2 space-y-1">
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    className="hover:cursor-pointer"
                    // onClick={() => {
                    //   startTransition(() => {
                    //     router.push("/about#faq");
                    //   });
                    // }}
                  >
                    دعم الحريف
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    className="hover:cursor-pointer"
                    // onClick={() => {
                    //   startTransition(() => {
                    //     router.push("/terms-and-conditions#privacy");
                    //   });
                    // }}
                  >
                    سياسة الخصوصية
                  </a>
                </div>
              </li>
              <li>
                <div
                  // onClick={() => {
                  //   startTransition(() => {
                  //     router.push("/terms-and-conditions");
                  //   });
                  // }}
                  className={cn("link text-neutral-700")}
                >
                  <a className="hover:cursor-pointer">الشروط والأحكام</a>
                </div>
              </li>
            </ul>
          </div>
          <div dir="rtl">
            <h3 className="text-xl font-semibold">روابط مهمة</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    onClick={() => {
                      setLoadingPage(true);
                      startTransition(() => {
                        router.push("/");
                      });
                    }}
                    className="hover:cursor-pointer"
                  >
                    الصفحة الرئيسية
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    // onClick={() => {
                    //   setLoadingPage(true);
                    //   startTransition(() => {
                    //     router.push("/about");
                    //   });
                    // }}
                    onClick={() => {
                      router.push("/products");
                    }}
                    className="hover:cursor-pointer"
                  >
                    منتجاتنا
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    // onClick={() => {
                    //   setLoadingPage(true);
                    //   startTransition(() => {
                    //     router.push("/about");
                    //   });
                    // }}
                    onClick={() => {
                      router.push("/about");
                    }}
                    className="hover:cursor-pointer"
                  >
                    من نحن
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    // onClick={() => {
                    //   setLoadingPage(true);
                    //   startTransition(() => {
                    //     router.push("/contact");
                    //   });
                    // }}

                    onClick={() => {
                      router.push("/contact");
                    }}
                    className="hover:cursor-pointer"
                  >
                    إتصل بنا
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    // onClick={() => {
                    //   setLoadingPage(true);
                    //   startTransition(() => {
                    //     router.push("/services");
                    //   });
                    // }}
                    onClick={() => {
                      router.push("/services");
                    }}
                    className="hover:cursor-pointer"
                  >
                    خدمات
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Side: Contact Us */}
          <div dir="rtl">
            <h3 className="text-xl font-semibold">إتصل بنا</h3>
            <ul className="mt-2 space-y-1">
              <li className="flex flex-row items-center pb-2 text-neutral-700">
                <i className="fa-solid fa-location-dot ml-2 text-[20px]"></i>
                مدنين، 4100
              </li>
              <li
                className="flex flex-row items-center pb-2 text-neutral-700 transition-all duration-100 hover:cursor-pointer hover:text-[var(--theme1)]"
                onClick={() => {
                  window.open("mailto:Example@gmail.com");
                }}
              >
                <i className="fa-solid fa-envelope ml-2 text-[20px]"></i>
                Example@gmail.com
              </li>
              <li
                className="flex flex-row items-center text-neutral-700 transition-all duration-100 hover:cursor-pointer hover:text-[var(--theme1)]"
                onClick={() => {
                  window.open("mailto:recipevault@gmail.com");
                }}
              >
                <i className="fa-solid fa-phone ml-2 text-[20px]"></i>
                <span dir="ltr">+216 12 345 678</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-mask mt-8 h-[3px] w-full bg-[var(--theme2)] min-[950px]:mt-0"></div>
        <div dir="rtl" className="py-3 text-center text-black">
          حقوق الطبع والنشر © 2024{" "}
          <a
            onClick={() => {
              setLoadingPage(true);
              startTransition(() => {
                router.push("/");
              });
            }}
            className="text-lg font-bold text-[var(--theme)] hover:cursor-pointer"
          >
            العربية
          </a>
          <span className="font-semibold">&nbsp;للتجميل والعطور، </span>
          كل الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
