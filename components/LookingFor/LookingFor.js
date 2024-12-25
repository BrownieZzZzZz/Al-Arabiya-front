const LookingFor = ({ ChangeUrl }) => {
  return (
    <div
      dir="rtl"
      className="my-[70px] flex flex-col items-center justify-center gap-5 bg-white px-[20px] py-[60px] min-[1180px]:flex-row"
    >
      <div>
        <img
          src="/images/contact1.webp"
          alt="image"
          className="h-[400px] w-full max-w-[600px] rounded-lg object-cover shadow-lg drop-shadow-lg min-[1180px]:size-[400px]"
        />
      </div>
      <div className="flex flex-col">
        <div className="mt-6 text-center text-4xl font-semibold text-[var(--theme)]">
          هل لديك سؤال أو إستفسار ؟
        </div>
        <div className="mt-3 text-center text-3xl font-medium text-neutral-700">
          يمكنك التحصل علينا هنا
        </div>
        <div className="mt-3 max-w-[600px] text-center text-lg tracking-wider text-neutral-500">
          نحن نفتخر بتقديم خدمة دعم عملاء استثنائية تضع احتياجاتكم في المقدمة.
          فريقنا المتخصص جاهز دائمًا للإجابة على استفساراتكم وحل مشاكلكم بسرعة
          واحترافية، لضمان رضاكم التام وتعزيز ثقتكم بنا.
        </div>
        <div className="mb-6 mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => {
              ChangeUrl("/contact");
            }}
            className="shdw2 w-fit self-center rounded-md border-2 border-transparent bg-yellow-600 px-6 py-2 text-xl text-neutral-100 transition-all duration-200 hover:scale-110 hover:bg-[var(--theme)] hover:text-white active:scale-95"
            type="button"
          >
            إتصل بنا
          </button>
        </div>
      </div>
      <div>
        <img
          src="/images/contact2.avif"
          alt="image"
          className="h-[400px] w-full max-w-[600px] rounded-lg object-cover shadow-lg drop-shadow-lg min-[1180px]:size-[400px]"
        />
      </div>
    </div>
  );
};

export default LookingFor;
