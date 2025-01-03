"use client";

import { useRef, useState, useTransition, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import {
  cn,
  validateEmail,
  validateNumberInput,
  cities,
  formattedDate,
} from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UserPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingUser, setLoadingUser] = useState(true);
  var menu = parseInt(searchParams.get("menu")) || 1;
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [formattedCreateAtDate, setFormattedCreateAtDate] = useState(null);
  const [role, setRole] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const deleteRef = useRef(null);
  const deletePopUp = () => {
    deleteRef.current.click();
  };
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
        firstNameRef.current.value = user.full_name?.split(" ")[0];
        lastNameRef.current.value =
          user.full_name?.split(" ").length > 1
            ? user.full_name?.split(" ")[1]
            : "";
        emailRef.current.value = user.email;
        phoneRef.current.value = user.phone;
        addressRef.current.value = user.address;
        setSelectedCity(user.city);
        setIsEditing(false);
        return;
      }

      const body = {
        full_name: `${firstNameRef.current.value.trim()} ${lastNameRef.current.value.trim()}`,
        email: emailRef.current.value.trim(),
        phone: phoneRef.current.value.trim(),
        address: addressRef.current.value.trim(),
        city: selectedCity,
      };
      if (role !== user.role) {
        body.role = role;
      }

      try {
        setLoadingUser(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admins/user/${user.id}`,
          {
            method: "PUT",
            headers: {
              admin_access_token: Cookies.get("admin_access_token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          },
        );
        const data = await response.json();
        if (data.data == null) {
          if (data.message === "Email already exists") {
            setLoadingUser(false);
            toast({
              title: "خطأ",
              description:
                "البريد الإلكتروني مستخدم بالفعل، الرجاء استخدام بريد آخر!",

              variant: "destructive",
              duration: 2500,
            });
            emailRef.current.value = user.email;
            return;
          }
          throw new Error(data.message);
        }
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
    } else {
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    deletePopUp();
    try {
      setLoadingUser(true);
      toast({
        title: "جاري مسح البيانات",
        description: "يرجى الانتظار...",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user/${user.id}`,
        {
          method: "DELETE",
          headers: {
            admin_access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      toast({
        title: "تم",
        description: "تم مسح البيانات بنجاح",
        variant: "success",
      });
      ChangeUrl("/admin/dashboard/users");
      // setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء مسح البيانات",
        variant: "destructive",
        duration: 8000,
      });
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user/byid/${id}`,
        {
          method: "GET",
          headers: {
            admin_access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setUser(data.data);
      setRole(data.data.role);
      setSelectedCity(data.data.city);
      setFormattedCreateAtDate(formattedDate(data.data.created_At));
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
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
    fetchUser();
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      {(loadingPage || loadingUser) && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        معطيات الحريف
      </div>
      <div className="flex w-full max-w-[600px] flex-col rounded-lg bg-[var(--dash-theme2)] shadow-lg min-[600px]:mx-4">
        <div className="flex items-center justify-center gap-6 border-b-2 border-[var(--dash-theme)]">
          <div
            onClick={() =>
              ChangeUrl(`/admin/dashboard/users/${user.id}?menu=1`)
            }
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-500",
              menu === 1 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              حسابه
            </span>
          </div>
          <div
            onClick={() =>
              ChangeUrl(`/admin/dashboard/users/${user.id}?menu=2`)
            }
            className={cn(
              "border-b-4 border-neutral-200 p-3 transition-all duration-200 hover:cursor-pointer hover:border-neutral-500",
              menu === 2 &&
                "border-[var(--dash-theme5)] hover:border-[var(--dash-theme5)]",
            )}
          >
            <span className="text-xl font-semibold text-neutral-200">
              طلباته
            </span>
          </div>
        </div>

        {menu === 1 && (
          <div className="flex w-full flex-col items-center gap-4 px-4 py-6 min-[600px]:px-8">
            <div className="flex w-full flex-col gap-2">
              <div className="mb-4 text-2xl font-semibold text-white">
                معلومات شخصية
              </div>
              <div className="flex w-full flex-col gap-2 min-[550px]:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                    الاسم
                  </div>
                  <input
                    defaultValue={user.full_name?.split(" ")[0]}
                    ref={firstNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder="الاسم"
                    className={cn(
                      "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                      !isEditing
                        ? "hover:cursor-default"
                        : "focus:outline-[var(--dash-theme5)]",
                    )}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                    اللقب
                  </div>
                  <input
                    defaultValue={
                      user.full_name?.split(" ").length > 1
                        ? user.full_name?.split(" ")[1]
                        : ""
                    }
                    ref={lastNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder="اللقب "
                    className={cn(
                      "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                      !isEditing
                        ? "hover:cursor-default"
                        : "focus:outline-[var(--dash-theme5)]",
                    )}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  البريد الالكتروني
                </div>
                <input
                  defaultValue={user.email}
                  ref={emailRef}
                  readOnly={!isEditing}
                  type="email"
                  placeholder="البريد الالكتروني"
                  className={cn(
                    "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                    !isEditing
                      ? "hover:cursor-default"
                      : "focus:outline-[var(--dash-theme5)]",
                  )}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  رقم الهاتف
                </div>
                <input
                  ref={phoneRef}
                  dir="rtl"
                  defaultValue={user.phone}
                  readOnly={!isEditing}
                  type="tel"
                  placeholder="رقم الهاتف"
                  className={cn(
                    "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                    !isEditing
                      ? "hover:cursor-default"
                      : "focus:outline-[var(--dash-theme5)]",
                  )}
                  disabled={!isEditing}
                  onInput={() => validateNumberInput(phoneRef)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  عنوان السكن
                </div>
                <input
                  ref={addressRef}
                  defaultValue={user.address}
                  readOnly={!isEditing}
                  type="text"
                  placeholder="عنوان السكن "
                  className={cn(
                    "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                    !isEditing
                      ? "hover:cursor-default"
                      : "focus:outline-[var(--dash-theme5)]",
                  )}
                  disabled={!isEditing}
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
                  defaultValue={formattedCreateAtDate}
                  className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  المدينة
                </div>

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
                      "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                      !isEditing
                        ? "hover:cursor-default"
                        : "focus:outline-[var(--dash-theme5)]",
                    )}
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
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-[var(--dash-theme5)]">
                  الدور
                </div>

                <Select
                  onValueChange={setRole}
                  value={role}
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
                      "w-full bg-[var(--dash-theme)] px-3 py-2 text-lg text-white placeholder-neutral-300 outline-none",
                      !isEditing
                        ? "hover:cursor-default"
                        : "focus:outline-[var(--dash-theme5)]",
                    )}
                  >
                    <SelectValue dir="rtl" placeholder="اختر دور..." />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectGroup dir="rtl">
                      {[
                        { value: "admin", text: "مسؤول" },
                        { value: "client", text: "حريف" },
                      ].map((role, index) => (
                        <SelectItem
                          dir="rtl"
                          className="text-right transition-colors duration-150 hover:cursor-pointer focus:bg-zinc-200"
                          key={index}
                          value={role.value}
                        >
                          {role.text}
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
                {isEditing ? "حفظ" : "تعديل"}
              </button>
            </div>
          </div>
        )}

        {menu === 2 && (
          <div className="flex w-full flex-col items-center gap-6 px-4 py-6 min-[600px]:px-8">
            <div className="w-full text-right text-2xl font-semibold text-white">
              طلبات الحريف
            </div>
            {user.orders?.length > 0 ? (
              <div className="flex w-full flex-col gap-6">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="w-full rounded-lg bg-[var(--dash-theme)] p-6 shadow-lg"
                  >
                    <div className="mb-4 flex flex-col text-right">
                      <div className="text-lg font-semibold text-white">
                        الطلب رقم: {order.id}
                      </div>
                      <div className="text-sm text-neutral-300">
                        الحالة: {order.state}
                      </div>
                      <div className="text-sm text-neutral-300">
                        تاريخ الإنشاء:
                        {order.created_At && formattedDate(order.created_At)}
                      </div>
                    </div>
                    <div className="mb-4 text-right">
                      <div className="mb-2 text-lg font-semibold text-white">
                        تفاصيل الحريف
                      </div>
                      <div className="text-sm text-neutral-300">
                        الاسم: {order.first_name} {order.last_name}
                      </div>
                      <div className="text-sm text-neutral-300">
                        الهاتف: {order.phone}
                      </div>
                      <div className="text-sm text-neutral-300">
                        البريد الإلكتروني: {order.email}
                      </div>
                      <div className="text-sm text-neutral-300">
                        المدينة: {order.city}
                      </div>
                      <div className="text-sm text-neutral-300">
                        العنوان: {order.address}
                      </div>
                      <div className="text-sm text-neutral-300">
                        نوع الطلب: {order.type}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2 text-lg font-semibold text-white">
                        تفاصيل المنتجات
                      </div>
                      <ul className="flex flex-col gap-4">
                        {order.order_Products.map((product) => (
                          <li
                            key={product.id}
                            className="flex w-full items-start justify-between rounded-lg bg-cyan-100/70 p-4 shadow"
                          >
                            <div className="flex flex-col">
                              <div className="text-neutral-800">
                                {product.product.name}
                              </div>
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
      {menu === 1 && (
        <div className="flex w-full max-w-[600px] flex-row gap-2 px-4 min-[600px]:px-8">
          <button
            type="button"
            onClick={() => deletePopUp()}
            className="w-[120px] bg-red-900 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500"
          >
            حذف
          </button>
        </div>
      )}
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
              حذف هذا الحساب سينجم عنه حذف كل البيانات المرتبطة بهذا الحساب
            </div>
            <button
              onClick={() => handleDelete()}
              type="button"
              disabled={loadingUser}
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

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--dash-theme5)]" />
        </div>
      }
    >
      <UserPage />
    </Suspense>
  );
};

export default Page;
