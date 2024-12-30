"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

const page = () => {
  const [menu, setMenu] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const user = {
    firstName: "محمد",
    lastName: "عبدالله",
    email: "abdallah2004@gmail.com",
    phone: "56620075",
    address: "الكويت",
  };
  const [editText, setEditText] = useState("تعديل");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const { toast } = useToast();
  const handleEdit = () => {
    if (isEditing) {
      // SAVE DATA
      if(firstNameRef.current.value.trim() === ""){
        toast({
          title: "خطأ",
          description: "الرجاء ادخال الاسم",
          variant: "destructive",
          duration: 2000,
        });
        firstNameRef.current.value = user.firstName;
        setEditText("تعديل");
        return;
      }
      if(lastNameRef.current.value.trim() === ""){
        toast({
          title: "خطأ",
          description: "الرجاء ادخال اللقب",
          variant: "destructive",
          duration: 2000,
        });
        lastNameRef.current.value = user.lastName;
        setEditText("تعديل");
        return;
      }
      if(emailRef.current.value.trim() === ""){
        toast({
          title: "خطأ",
          description: "الرجاء ادخال البريد الالكتروني",
          variant: "destructive",
          duration: 2000,
        });
        emailRef.current.value = user.email;
        setEditText("تعديل");
        return;
      }
      if(phoneRef.current.value.trim() === ""){
        toast({
          title: "خطأ",
          description: "الرجاء ادخال رقم الهاتف",
          variant: "destructive",
          duration: 2000,
        });
        phoneRef.current.value = user.phone;
        setEditText("تعديل");
        return;
      }
      if(addressRef.current.value.trim() === ""){
        toast({
          title: "خطأ",
          description: "الرجاء ادخال عنوان السكن",
          variant: "destructive",
          duration: 2000,
        });
        addressRef.current.value = user.address;
        setEditText("تعديل");
        return;
      }

      // SAVE DATA HERE BJDOG AND DO YOUR MAGIC

      toast({
        title: "تم",
        description: "تم حفظ البيانات بنجاح",
        variant: "success",
        duration: 2000,
      })
      
      setEditText("تعديل");
    } else {
      setEditText("حفظ");
    }
    setIsEditing(!isEditing);
  };
  const savePassword = () => {
    // SAVE PASSWORD MAGIC HERE BJDOG
    toast({
      title: "تم",
      description: "تم تغيير كلمة المرور بنجاح",
      variant: "success",
      duration: 2000,
    })
  }
  return (
    <div
      dir="rtl"
      className="mx-auto mt-20 flex w-full items-center justify-center"
    >
      <div className="flex w-full max-w-[600px] flex-col rounded-lg bg-white shadow-lg min-[600px]:mx-4">
        <div className="flex items-center justify-center gap-6 border-b-2 border-[var(--theme2)]">
          <div
            onClick={() => setMenu(1)}
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
            onClick={() => setMenu(2)}
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
          <div className="flex w-full flex-col items-center gap-4 px-4 min-[600px]:px-8 py-6">
            <div className="w-full flex flex-col gap-2">
              <div className="mb-4 text-2xl font-semibold text-neutral-700">
                معلومات شخصية
              </div>
              <div className="flex w-full flex-col min-[550px]:flex-row gap-2">
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">الاسم</div>
                  <input
                    defaultValue={user.firstName}
                    ref={firstNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder="الاسم"
                    className={cn(
                      "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                      !isEditing
                        ? "hover:cursor-not-allowed"
                        : "outline-[var(--theme)]",
                    )}
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">اللقب </div>
                  <input
                    defaultValue={user.lastName}
                    ref={lastNameRef}
                    readOnly={!isEditing}
                    type="text"
                    placeholder="اللقب "
                    className={cn(
                      "w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-transparent",
                      !isEditing
                        ? "hover:cursor-not-allowed"
                        : "outline-[var(--theme)]",
                    )}
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
                      ? "hover:cursor-not-allowed"
                      : "outline-[var(--theme)]",
                  )}
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
                      ? "hover:cursor-not-allowed"
                      : "outline-[var(--theme)]",
                  )}
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
                      ? "hover:cursor-not-allowed"
                      : "outline-[var(--theme)]",
                  )}
                />
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
              <div className="flex w-full flex-col min-[550px]:flex-row gap-2">
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">كلمة المرور</div>
                  <input
                    placeholder="كلمة المرور"
                    type="password"
                    className="w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-[var(--theme)]"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-neutral-400">التثبت من كلمة المرور </div>
                  <input
                    placeholder="التثبت من كلمة المرور"
                    type="password"
                    className="w-full bg-[var(--theme2)] px-3 py-2 text-lg placeholder-neutral-300 outline-[var(--theme)]"
                  />
                </div> 
              </div>
              <button onClick={() => savePassword()} type="button" className="mt-4 w-full max-w-[227px] self-start border-2 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent bg-[var(--theme)] border-[var(--theme)] hover:text-[var(--theme)]">حفض كلمة المرور</button>
            </div>
          </div>
        )}

        {/* ORDERS */}

        {menu === 2 && <></>}
      </div>
    </div>
  );
};

export default page;
