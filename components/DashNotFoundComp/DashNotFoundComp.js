const DashNotFoundComp = ({ text }) => {
  return (
    <div className="col-span-full mt-20 flex w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="#a9dfd8"
            className="bi bi-slash-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
          </svg>
        </div>
        <div className="text-3xl font-semibold text-[var(--dash-theme5)]">
          {text}
        </div>
      </div>
    </div>
  );
};

export default DashNotFoundComp;
