import React from "react";

const page = () => {
  return (
    <div className="mx-auto mt-6 flex h-full w-full items-center justify-center">
      <div className="mx-10 flex w-full flex-col items-center justify-center gap-10 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
          <span className="font-lato text-center text-5xl font-bold text-neutral-800 sm:text-6xl">
            الشروط والأحكام
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
        </div>
        <div
          className="font-lato flex w-full max-w-[1300px] flex-col justify-center gap-6 text-neutral-600"
          dir="rtl"
        >
          <span className="text-center">
            <span className="text-lg font-semibold">
              يرجى قراءة الشروط بعناية قبل استخدام المتجر أو أي من خدماته.
            </span>{" "}
            تحدد هذه الاتفاقية الشروط والأحكام الملزمة قانونياً
          </span>
          <span>
            هذا المتجر مسجل رسمياً في تونس، متخصص في بيع مستحضرات التجميل
            والعناية بالبشرة. عنواننا: تونس، شارع الحرية، تونس العاصمة.
          </span>
          <span>
            مسجل لدى السلطات المحلية برقم تسجيل: (XXXXXXXXX) والرقم الضريبي:
            (XXXXXXXXXXXXXX).
          </span>
          <ul className="list-inside list-decimal marker:text-lg">
            <li className="text-lg font-semibold" id="privacy">
              عقدنا معك:
            </li>
            <div className="mt-5">
              <span>
                باستخدامك للموقع{" "}
                <span className="font-semibold text-[var(--theme)]">
                  {process.env.NEXT_PUBLIC_FRONT_URL}
                </span>{" "}
                فإنك توافق على الالتزام بهذه الشروط. نحتفظ بالحق في تعديل
                الأسعار، السياسات، أو رفض الطلبات في حالة وجود أخطاء في البيانات
                أو الأسعار.
              </span>
            </div>

            <li className="mt-5 text-lg font-semibold">
              سياسة الخصوصية وملفات تعريف الارتباط
            </li>
            <div className="mt-5">
              <span>
                نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفقاً للقوانين
                التونسية. نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل
                استخدام الموقع. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من
                خلال متصفحك.
              </span>
            </div>

            <li className="mt-5 text-lg font-semibold">سياسة التسوق والشراء</li>
            <ul className="list-disc">
              <li className="mr-10 mt-4">
                يجب أن يكون عمر المشتري 18 عاماً أو أكثر.
              </li>
              <li className="mr-10 mt-4">
                جميع الأسعار تشمل الضرائب المحلية (ضريبة القيمة المضافة).
              </li>
              <li className="mr-10 mt-4">
                يتم تأكيد الطلب بعد التحقق من توفر المنتجات وصحة معلومات الدفع.
              </li>
            </ul>

            <li className="mt-5 text-lg font-semibold">سياسة التوصيل</li>
            <ul className="list-disc">
              <li className="mr-10 mt-4">
                نوفر خدمة التوصيل لجميع مناطق تونس.
              </li>
              <li className="mr-10 mt-4">مدة التوصيل من 2-7 أيام عمل.</li>
            </ul>

            <li className="mt-5 text-lg font-semibold">سياسة الدفع والأمان</li>
            <ul className="list-disc">
              <li className="mr-10 mt-4">
                نقبل الدفع عن طريق البطاقات البنكية (Carte Bancaire)، الدفع عند
                التسليم، والتحويل البنكي.
              </li>
              <li className="mr-10 mt-4">
                جميع المعاملات مشفرة وفقاً لمعايير الأمان العالمية.
              </li>
              <li className="mr-10 mt-4">
                لا نقوم بتخزين بيانات بطاقات الدفع الخاصة بك.
              </li>
            </ul>

            <li className="mt-5 text-lg font-semibold">
              سياسة الاسترجاع والاستبدال
            </li>
            <ul className="list-disc">
              <li className="mr-10 mt-4">
                يمكنك استرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام.
              </li>
              <li className="mr-10 mt-4">
                يجب أن تكون المنتجات غير مستخدمة وفي حالتها الأصلية.
              </li>
              <li className="mr-10 mt-4">
                المنتجات المخفضة لا يمكن استرجاعها إلا إذا كانت معيبة.
              </li>
            </ul>

            <li className="mt-5 text-lg font-semibold">خدمة العملاء</li>
            <ul className="list-disc">
              <li className="mr-10 mt-4">
                فريقنا متاح للرد على استفساراتكم من الاثنين إلى السبت، من 9
                صباحاً حتى 6 مساءً.
              </li>
              <li className="mr-10 mt-4">
                يمكنك التواصل معنا عبر:
                <span className="font-semibold text-[var(--theme)]">
                  {process.env.NEXT_PUBLIC_EMAIL_RECEIVER}
                </span>{" "}
                أو عبر الهاتف: +216 XXXXXXXX
              </li>
              <li className="mr-10 mt-4">
                نلتزم بالرد خلال 24 ساعة عمل على أقصى تقدير.
              </li>
            </ul>

            <li className="mt-5 text-lg font-semibold">القانون المطبق</li>
            <div className="mb-10 mt-5">
              <span>
                تخضع هذه الشروط والأحكام لقوانين الجمهورية التونسية، وتختص
                المحاكم التونسية بالفصل في أي نزاع.
              </span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
