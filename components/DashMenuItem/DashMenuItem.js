import Cookies from "js-cookie";

import { cn } from "@/lib/utils";

const DashMenuItem = ({
  title,
  path,
  icon,
  menuState,
  setMenuState,
  setLoadingPage,
  ChangeUrl,
}) => {
  const lighter = title == "الخروج";

  const menuTransition = (path) => {
    setMenuState(`/admin${path}`);

    ChangeUrl(`/admin${path}`);
  };

  const logout = () => {
    Cookies.remove("admin_access_token");
    setLoadingPage(true);
    location.href = "/admin/sign-in";
  };

  return (
    <div
      onClick={() => {
        if (!lighter) {
          menuTransition(`/dashboard${path}`);
        } else {
          logout();
        }
      }}
      className={cn(
        "w-full rounded-md bg-transparent px-3 py-2.5 font-semibold text-[var(--dash-theme3)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--dash-theme4)]",
        menuState == `/admin/dashboard${path}` &&
          "bg-[var(--dash-theme5)] text-[var(--dash-theme)] hover:bg-[var(--dash-theme6)]",
        lighter && "text-[#82828c] hover:bg-[#21222d]",
      )}
    >
      <div className="flex flex-row items-center gap-1.5">
        <div className="flex size-[20px] items-center justify-center">
          <i className={cn("text-[17px]", icon)} />
        </div>

        <div className="text-lg">{title}</div>
      </div>
    </div>
  );
};

export default DashMenuItem;
