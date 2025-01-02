"use client";

import { useToast } from "@/hooks/use-toast";
import { cn, validateEmail, validateNumberInput, cities } from "@/lib/utils";
import { useRef, useState, useTransition, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingUser, setLoadingUser] = useState(true);
  var menu = parseInt(searchParams.get("menu")) || 1;
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    orders: [],
  });
  const [editText, setEditText] = useState("تعديل");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("");
  const addressRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const router = useRouter();

  const { toast } = useToast();

  const handleEdit = async () => {
    if (isEditing) {
      var errorTest = false;

      if (firstNameRef.current.value.trim() === "") {
        toast({
          title: "خطأ",
          description: "الرجاء ادخال الاسم",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (lastNameRef.current.value.trim() === "") {
        toast({
          title: "خطأ",
          description: "الرجاء ادخال اللقب",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (
        emailRef.current.value.trim() === "" ||
        !validateEmail(emailRef.current.value.trim())
      ) {
        toast({
          title: "خطأ",
          description: "الرجاء ادخال البريد الالكتروني",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (phoneRef.current.value.trim() === "") {
        toast({
          title: "خطأ",
          description: "الرجاء ادخال رقم الهاتف",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }
      if (addressRef.current.value.trim() === "") {
        toast({
          title: "خطأ",
          description: "الرجاء ادخال عنوان السكن",
          variant: "destructive",
          duration: 2000,
        });
        errorTest = true;
      }

      if (errorTest) {
        firstNameRef.current.value = user.full_name.split(" ")[0];
        lastNameRef.current.value =
          user.full_name.split(" ").length > 1
            ? user.full_name.split(" ")[1]
            : "";
        emailRef.current.value = user.email;
        phoneRef.current.value = user.phone;
        addressRef.current.value = user.address;
        setSelectedCity(user.city);
        setIsEditing(false);
        setEditText("تعديل");
        return;
      }

      const body = {
        full_name: `${firstNameRef.current.value.trim()} ${lastNameRef.current.value.trim()}`,
        email: emailRef.current.value.trim(),
        phone: phoneRef.current.value.trim(),
        address: addressRef.current.value.trim(),
        city: selectedCity,
      };

      try {
        setLoadingUser(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              access_token: Cookies.get("access_token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          },
        );
        const data = await response.json();
        if (data.message === "User updated successfully") {
          toast({
            title: "تم",
            description: "تم حفظ البيانات بنجاح",
            variant: "success",
            duration: 2000,
          });
        }
        setLoadingUser(false);
      } catch (error) {
        console.error(error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حفظ البيانات",
          variant: "destructive",
          duration: 2000,
        });
        setLoadingUser(false);
      }
      setEditText("تعديل");
    } else {
      setEditText("حفظ");
    }
    setIsEditing(!isEditing);
  };

  const savePassword = async () => {
    if (!passwordRef.current.value) {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال كلمة المرور",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (!confirmPasswordRef.current.value) {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال تأكيد كلمة المرور",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    const body = {
      password: passwordRef.current.value,
    };

    try {
      setLoadingUser(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.message === "User updated successfully") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailRef.current.value.trim(),
              password: passwordRef.current.value,
            }),
          },
        );

        if (res.ok) {
          const dataRes = await res.json();

          const expires = 30;

          if (dataRes.data !== null) {
            Cookies.set("access_token", dataRes.data?.access_token, {
              expires,
            });
            toast({
              title: "تم",
              description: "تم تغيير كلمة المرور بنجاح",
              variant: "success",
              duration: 2000,
            });

            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
          }
        }
      }
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
        duration: 2000,
      });
      setLoadingUser(false);
    }
  };

  const checkUser = async () => {
    try {
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

      setUser(data.data);
      setSelectedCity(data.data.city);
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingPage(true);
      location.href = "/sign-in";
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب البيانات",
        variant: "destructive",
      });
    }
  };

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div
      dir="rtl"
      className="mx-auto mt-20 flex w-full items-center justify-center"
    >
      {(loadingPage || loadingUser) && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="flex w-full max-w-[600px] flex-col rounded-lg bg-white shadow-lg min-[600px]:mx-4">
        <div className="flex items-center justify-center gap-6 border-b-2 border-[var(--theme2)]">
          <div
            onClick={() => ChangeUrl("/profile?menu=1")}
            className={cn(
              "border-b-4 border-neutral-300 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 1 && "border-[var(--theme)] hover:border-[var(--theme)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-700">
              حسابك
            </span>
          </div>
          <div
            onClick={() => ChangeUrl("/profile?menu=2")}
            className={cn(
              "border-b-4 border-neutral-300 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-400",
              menu === 2 && "border-[var(--theme)] hover:border-[var(--theme)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-700">
              طلباتك{" "}
            </span>
          </div>
        </div>

        {/* PROFILE */}

        {menu === 1 && (
          <div className="flex w-full flex-col items-center gap-4 px-4 py-6 min-[600px]:px-8">
            <div className="flex w-full flex-col gap-2">
              <div className="mb-4 text-2xl font-semibold text-neutral-700">
                معلومات شخصية
              </div>
              <div className="flex w-full flex-col gap-2 min-[550px]:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">الاسم</div>
                  <input
                    defaultValue={user.full_name.split(" ")[0]}
                    ref={firstNameRef}
                    readOnly={!isEditing} 
                    type="text"
                    placeholder="الاسم"
                    className={cn(
                      "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                      !isEditing
                        ? "hover:cursor-default"
                        : "outline-[var(--theme)]",
                    )}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">اللقب </div>
                  <input
                    defaultValue={
                      user.full_name.split(" ").length > 1
                        ? user.full_name.split(" ")[1]
                        : ""
                    }
                    ref={lastNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder="اللقب "
                    className={cn(
                      "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                      !isEditing
                        ? "hover:cursor-default"
                        : "outline-[var(--theme)]",
                    )}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-neutral-400">البريد الالكتروني</div>
                <input
                  defaultValue={user.email}
                  ref={emailRef}
                  readOnly={!isEditing}
                  type="email"
                  placeholder="البريد الالكتروني"
                  className={cn(
                    "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                    !isEditing
                      ? "hover:cursor-default"
                      : "outline-[var(--theme)]",
                  )}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-neutral-400">رقم الهاتف</div>
                <input
                  ref={phoneRef}
                  dir="rtl"
                  defaultValue={user.phone}
                  readOnly={!isEditing}
                  type="tel"
                  placeholder="رقم الهاتف"
                  className={cn(
                    "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                    !isEditing
                      ? "hover:cursor-default"
                      : "outline-[var(--theme)]",
                  )}
                  disabled={!isEditing}
                  onInput={() => validateNumberInput(phoneRef)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-neutral-400">عنوان السكن </div>
                <input
                  ref={addressRef}
                  defaultValue={user.address}
                  readOnly={!isEditing}
                  type="text"
                  placeholder="عنوان السكن "
                  className={cn(
                    "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                    !isEditing
                      ? "hover:cursor-default"
                      : "outline-[var(--theme)]",
                  )}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-neutral-400">المدينة </div>

                <Select
                  onValueChange={setSelectedCity}
                  value={selectedCity}
                  className={cn(
                    "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                    !isEditing
                      ? "hover:cursor-default"
                      : "outline-[var(--theme)]",
                  )}
                  disabled={!isEditing}
                >
                  <SelectTrigger
                    dir="rtl"
                    className={cn(
                      "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                      !isEditing
                        ? "hover:cursor-default"
                        : "outline-[var(--theme)]",
                    )}
                    // className="border-neutral-300 bg-transparent text-right focus:ring-[var(--theme)]"
                  >
                    <SelectValue dir="rtl" placeholder="اختر المدينة.." />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectGroup dir="rtl">
                      {cities.map((city, index) => (
                        <SelectItem
                          dir="rtl"
                          className="text-right transition-colors duration-150 hover:cursor-pointer focus:bg-zinc-200"
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
              <button
                onClick={() => handleEdit()}
                type="button"
                className={cn(
                  "mt-4 w-full max-w-[227px] self-start border-2 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent",
                  isEditing
                    ? "border-emerald-500 bg-emerald-500 hover:text-emerald-500"
                    : "border-blue-500 bg-blue-500 hover:text-blue-500",
                )}
              >
                {editText}{" "}
              </button>
              <div className="mb-4 mt-4 self-start text-2xl font-semibold text-neutral-700">
                كلمة المرور
              </div>
              <div className="flex w-full flex-col gap-2 min-[550px]:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">كلمة المرور</div>
                  <input
                    placeholder="كلمة المرور"
                    type="password"
                    ref={passwordRef}
                    className="w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-[var(--theme)]"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">التثبت من كلمة المرور </div>
                  <input
                    placeholder="التثبت من كلمة المرور"
                    ref={confirmPasswordRef}
                    type="password"
                    className="w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-[var(--theme)]"
                  />
                </div>
              </div>
              <button
                onClick={() => savePassword()}
                type="button"
                className="mt-4 w-full max-w-[227px] self-start border-2 border-[var(--theme)] bg-[var(--theme)] py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-[var(--theme)]"
              >
                حفض كلمة المرور
              </button>
            </div>
          </div>
        )}

        {/* ORDERS */}

        {menu === 2 && (
          <div className="flex w-full flex-col items-center gap-6 px-4 py-6 min-[600px]:px-8">
            <div className="w-full text-right text-2xl font-semibold text-neutral-700">
              طلباتك
            </div>
            {user.orders.length > 0 ? (
              <div className="flex w-full flex-col gap-6">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="w-full rounded-lg bg-[var(--theme2)] p-6 shadow-lg"
                  >
                    <div className="mb-4 flex flex-col text-right">
                      <div className="text-lg font-semibold text-neutral-700">
                        الطلب رقم: {order.id}
                      </div>
                      <div className="text-sm text-neutral-500">
                        الحالة: {order.state}
                      </div>
                      <div className="text-sm text-neutral-500">
                        تاريخ الإنشاء:{" "}
                        {new Date(order.created_At).toLocaleDateString("ar")}
                      </div>
                    </div>
                    <div className="mb-4 text-right">
                      <div className="mb-2 text-lg font-semibold text-neutral-700">
                        تفاصيل العميل
                      </div>
                      <div className="text-sm text-neutral-600">
                        الاسم: {order.first_name} {order.last_name}
                      </div>
                      <div className="text-sm text-neutral-600">
                        الهاتف: {order.phone}
                      </div>
                      <div className="text-sm text-neutral-600">
                        البريد الإلكتروني: {order.email}
                      </div>
                      <div className="text-sm text-neutral-600">
                        المدينة: {order.city}
                      </div>
                      <div className="text-sm text-neutral-600">
                        العنوان: {order.address}
                      </div>
                      <div className="text-sm text-neutral-600">
                        نوع الطلب: {order.type}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2 text-lg font-semibold text-neutral-700">
                        تفاصيل المنتجات
                      </div>
                      <ul className="flex flex-col gap-4">
                        {order.order_Products.map((product) => (
                          <li
                            key={product.id}
                            className="flex w-full items-start justify-between rounded-lg bg-white p-4 shadow"
                          >
                            <div className="flex flex-col">
                              <div className="text-neutral-800">
                                {product.product.name}
                              </div>
                              <div className="text-sm text-neutral-500">
                                الكمية: {product.quantity}
                              </div>
                              <div className="text-sm text-neutral-500">
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
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full text-center text-lg text-neutral-500">
                لا توجد طلبات حتى الآن.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      }
    >
      <ProfilePage />
    </Suspense>
  );
};

export default Page;
