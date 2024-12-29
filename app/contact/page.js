"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const page = () => {
  const phoneRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const validateNumberInput = (price) => {
    const input = price.current;
    let value = input.value;

    const regex = /^\+{0,1}[0-9]*$/;

    if (!regex.test(value)) {
      input.value = value.slice(0, -1);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const message = formData.get("message");

    if (name.trim() === "") {
      toast({
        title: "خطأ",
        description: "حقل الاسم مطلوب",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (phone.trim() === "") {
      toast({
        title: "خطأ",
        description: "حقل الهاتف مطلوب",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (email.trim() === "") {
      toast({
        title: "خطأ",
        description: "حقل البريد الإلكتروني مطلوب",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (message.trim() === "") {
      toast({
        title: "خطأ",
        description: "حقل الرسالة مطلوب",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }
      await response.json();
      toast({
        title: "نجاح",
        description: "تم إرسال الرسالة بنجاح",
        variant: "success",
        duration: 2000,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "خطأ",
        description: "تعذر إرسال الرسالة",
        variant: "destructive",
        duration: 2000,
      });
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="mx-auto mt-20 flex w-full items-center justify-center"
    >
      <div className="mx-6 grid w-full max-w-[1300px] gap-6 md:mx-10 min-[800px]:grid-cols-2 min-[800px]:gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="font-lato relative mb-4 text-4xl font-semibold before:absolute before:left-full before:top-3 before:h-10 before:w-10 before:border-b-2 before:border-r-2 before:border-[var(--theme)] before:content-[''] after:absolute after:-left-10 after:-top-2 after:h-10 after:w-10 after:border-l-2 after:border-t-2 after:border-[var(--theme)] after:bg-transparent after:transition-all after:content-[''] min-[800px]:mr-10 min-[800px]:self-start">
            <span>اتصل بنا</span>
          </div>

          <div className="max-w-[500px] tracking-wider text-neutral-700 min-[800px]:self-start">
            نحن نفتخر بتقديم خدمة دعم عملاء استثنائية تضع احتياجاتكم في المقدمة.
            فريقنا المتخصص جاهز دائمًا للإجابة على استفساراتكم وحل مشاكلكم بسرعة
            واحترافية، لضمان رضاكم التام وتعزيز ثقتكم بنا.
          </div>

          <div className="grid w-full gap-6 min-[550px]:w-fit min-[550px]:grid-cols-2 min-[800px]:grid-cols-1 min-[800px]:self-start">
            <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-3">
                  <i className="fa-solid fa-phone-flip text-xl text-[var(--theme)]"/>
                  <div dir="ltr">+ 216 12 345 678</div>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <i className="fa-solid fa-envelope text-xl text-[var(--theme)]"/>
                  <div dir="ltr">Example@gmail.com</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-xl bg-white p-8">
              <div className="flex w-[220px] flex-col gap-5">
                <div className="text-center text-xl font-semibold text-neutral-800">
                  يمكنك أن تجدنا على
                </div>
                <div className="flex flex-row items-center justify-between">
                  <img
                    src="/icons/instagram.png"
                    alt="ig"
                    className="size-[32px] transition-all duration-200 hover:scale-110 hover:cursor-pointer"
                  />
                  <img
                    src="/icons/facebook.png"
                    alt="ig"
                    className="size-[32px] transition-all duration-200 hover:scale-110 hover:cursor-pointer"
                  />
                  <img
                    src="/icons/whatsapp.png"
                    alt="ig"
                    className="size-[32px] transition-all duration-200 hover:scale-110 hover:cursor-pointer"
                  />
                  <img
                    src="/icons/tiktok.png"
                    alt="ig"
                    className="size-[32px] transition-all duration-200 hover:scale-110 hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          method="post"
          role="form"
          className="php-email-form"
        >
          <div className="flex w-full flex-col gap-3 rounded-xl bg-white px-5 py-8 min-[550px]:px-10 min-[550px]:py-12">
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <input
                dir="rtl"
                type="text"
                placeholder="إسم"
                name="name"
                className="w-full bg-[var(--theme2)] p-2.5 placeholder-neutral-400 outline-[var(--theme)]"
              />
              <input
                dir="rtl"
                type="email"
                placeholder="بريد إلكتروني"
                name="email"
                className="w-full bg-[var(--theme2)] p-2.5 placeholder-neutral-400 outline-[var(--theme)]"
              />
            </div>
            <input
              dir="rtl"
              type="text"
              ref={phoneRef}
              placeholder="رقم الهاتف"
              name="phone"
              onInput={() => validateNumberInput(phoneRef)}
              className="w-full bg-[var(--theme2)] p-2.5 placeholder-neutral-400 outline-[var(--theme)]"
            />
            <textarea
              dir="rtl"
              placeholder="رسالة"
              name="message"
              rows={4}
              className="h-full w-full bg-[var(--theme2)] p-2.5 placeholder-neutral-400 outline-[var(--theme)]"
              />
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "mt-5 w-[150px] border-2 border-transparent bg-[var(--theme)] py-3 text-xl font-semibold text-[#ffffff] outline-none transition-all duration-200",
                loading
                  ? "opacity-50 hover:cursor-not-allowed"
                  : "hover:scale-[1.07] hover:border-[var(--theme)] hover:bg-white hover:text-[var(--theme)]",
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent"/>
                </div>
              ) : (
                "أرسل"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
