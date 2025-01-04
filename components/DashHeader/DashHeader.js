const DashHeader = ({ setLoadingPage }) => {
  return (
    <div dir="rtl" className="flex flex-row items-center justify-center gap-3">
      <img
        src="/images/logo.png"
        alt="mini-logo"
        className="size-[120px] object-scale-down transition-all duration-200 hover:scale-105 hover:cursor-pointer"
        onClick={() => {
          setLoadingPage(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }}
      />
      <div className="flex flex-col">
        <div className="text-sm font-semibold tracking-wide text-[var(--dash-theme5)]">
          إدارة
        </div>
        <div className="inline-block bg-gradient-to-br from-amber-300 to-amber-600 bg-clip-text text-lg font-bold tracking-wide text-transparent">
          العربية
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
