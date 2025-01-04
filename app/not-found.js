"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <section className="flex min-h-screen items-center bg-[var(--theme2)]">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-[var(--theme)] lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-[var(--theme4)] md:text-4xl">
            الصفحة غير موجودة
          </p>
          <p className="mb-4 text-lg font-light text-[var(--theme3)]">
            عذراً، لا يمكننا العثور على هذه الصفحة. يمكنك استكشاف المزيد في
            الصفحة الرئيسية
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setLoadingPage(true);
                location.href = "/";
              }}
              className="my-4 inline-flex rounded-lg bg-[var(--theme)] px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[var(--theme3)] focus:outline-none focus:ring-4 focus:ring-[var(--theme3)]"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
