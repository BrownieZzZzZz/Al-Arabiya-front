import React from "react";
import { FaTiktok } from "react-icons/fa";

const page = () => {
  return (
    <div
      dir="rtl"
      className="mx-auto mt-20 flex w-full items-center justify-center"
    >
      <div className="mx-6 md:mx-10 grid min-[800px]:grid-cols-2 w-full max-w-[1300px] gap-6  min-[800px]:gap-10">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="min-[800px]:self-start min-[800px]:mr-10 mb-4 relative font-lato text-4xl font-semibold before:absolute before:left-full before:top-3 before:h-10 before:w-10 before:border-b-2 before:border-r-2 before:border-[var(--theme)] before:content-[''] after:absolute after:-left-10 after:-top-2 after:h-10 after:w-10 after:border-l-2 after:border-t-2 after:border-[var(--theme)] after:bg-transparent after:transition-all after:content-['']">
            <span>اتصل بنا</span>
          </div>

          <div className="tracking-wider text-neutral-700 max-w-[500px] min-[800px]:self-start ">
            نحن نفتخر بتقديم خدمة دعم عملاء استثنائية تضع احتياجاتكم في المقدمة.
            فريقنا المتخصص جاهز دائمًا للإجابة على استفساراتكم وحل مشاكلكم بسرعة
            واحترافية، لضمان رضاكم التام وتعزيز ثقتكم بنا.
          </div>

          <div className="grid w-full min-[550px]:w-fit min-[550px]:grid-cols-2 min-[800px]:grid-cols-1 gap-6 min-[800px]:self-start">
            <div className="flex flex-col gap-4 rounded-xl items-center bg-white p-8">
              <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center gap-3">
                <i className="fa-solid fa-phone-flip text-xl text-[var(--theme)]"></i>
                <div dir="ltr">+ 216 12 345 678</div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <i className="fa-solid fa-envelope text-xl text-[var(--theme)]"></i>
                <div dir="ltr">Example@gmail.com</div>
              </div>
            </div>
            </div>

            <div className="flex items-center justify-center rounded-xl bg-white p-8">
              <div className="flex w-[220px] flex-col gap-5">
                <div className="text-xl text-center font-semibold text-neutral-800">
                  يمكنك أن تجدنا على
                </div>
                <div className="flex flex-row items-center justify-between">
                  <img
                    src="/icons/instagram.png"
                    alt="ig"
                    className="size-[32px] hover:cursor-pointer transition-all duration-200 hover:scale-110"
                  ></img>
                  <img
                    src="/icons/facebook.png"
                    alt="ig"
                    className="size-[32px] hover:cursor-pointer transition-all duration-200 hover:scale-110"
                  ></img>
                  <img
                    src="/icons/whatsapp.png"
                    alt="ig"
                    className="size-[32px] hover:cursor-pointer transition-all duration-200 hover:scale-110"
                  ></img>
                  <img
                    src="/icons/tiktok.png"
                    alt="ig"
                    className="size-[32px] hover:cursor-pointer transition-all duration-200 hover:scale-110"
                  ></img>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="bg-white py-8 min-[550px]:py-12 px-5 min-[550px]:px-10 flex flex-col gap-3 rounded-xl w-full">
          <div className="flex-col flex gap-3 sm:flex-row w-full">
            <input dir="rtl" type="text" placeholder="إسم" className="w-full bg-[var(--theme2)] p-2.5 placeholder-neutral-400 outline-[var(--theme)]"></input>
            <input dir="rtl" type="email" placeholder="بريد إلكتروني" className="w-full bg-[var(--theme2)] p-2.5 placeholder-neutral-400 outline-[var(--theme)]"></input>
          </div>
          <input dir="rtl" type="text" placeholder="رقم الهاتف" className="w-full bg-[var(--theme2)] p-2.5 placeholder-neutral-400 outline-[var(--theme)]"></input>
          <textarea dir="rtl" placeholder="رسالة" className="w-full h-full bg-[var(--theme2)] p-2.5 placeholder-neutral-400 outline-[var(--theme)]"></textarea>
          <button type="button" className="transition-all duration-200 hover:scale-[1.07] mt-5 py-3 border-2 border-transparent text-[#ffffff] bg-[var(--theme)] hover:border-[var(--theme)] hover:text-[var(--theme)] hover:bg-white font-semibold text-xl  w-[150px] outline-none">أرسل</button>
        </div>

      </div>
    </div>
  );
};

export default page;
