import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useThemeColors } from "../hooks/useThemeColors";
import { useThemeStore } from "../store/useThemeStore";

const capitilazeFirstLetter = (string = "") =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { setTheme } = useThemeStore();
  const themeColors = useThemeColors();

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  return (
    <nav className="sticky top-0 z-50 w-dvw">
      <div
        className="flex justify-between shadow-lg relative shadow-neutral-600/5 backdrop-blur-lg p-4"
        style={{
          background: themeColors.navbarBgColor,
        }}
      >
        {/* Logo Section */}
        <Link to="/" className="flex items-center cursor-pointer">
          <img
            src="/Q4CLogo.png"
            className="h-18 w-18 text-primary border-none px-2 py-2 rounded-full"
          />
          <span className="text-lg md:text-3xl font-bold tracking-tigh hidden md:block">
            Quest<span className="text-[#FFA726] font-bold font-[]">4</span>Code
          </span>
        </Link>

        {/* Theme selector and User Profile with Dropdown */}
        <div className="flex items-center gap-8">
          {/* Theme Selector */}
          <div className="items-center block dropdown rounded-lg bg-gray-800 text-white cursor-pointer">
            <div
              className="flex items-center p-3 px-5"
              tabIndex="0"
              role="button"
            >
              <div className="text-[14px] mr-4"> Theme </div>
              <div
                className="w-8 h-8 rounded-full cursor-pointer"
                style={{
                  background: themeColors.MainThemeColor,
                  border: `1px solid ${themeColors.navbarTextColor}`,
                }}
              ></div>
            </div>
            <ul
              tabIndex="2"
              className="dropdown-content menu mt-2 bg-base-100 rounded-box z-1 gap-2 w-52 p-4 shadow-sm "
            >
              <button
                className="p-2 bg-gray-700 text-white rounded"
                onClick={() => handleThemeChange("grey")}
              >
                Grey
              </button>
              <button
                className="p-2 bg-black text-white rounded"
                onClick={() => handleThemeChange("dark")}
              >
                Dark
              </button>
              <button
                className="p-2 bg-[#f3f3f3] text-black rounded"
                onClick={() => handleThemeChange("light")}
              >
                Light
              </button>
            </ul>
          </div>

          {/* User Profile */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar flex flex-row "
            >
              <div className="w-10 rounded-full ">
                <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3 text-white/90"
            >
              {/* Admin Option */}

              {/* Common Options */}
              <li>
                <div className="flex items-center ">
                  <img
                    src={
                      authUser?.image ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="User Avatar"
                    className="object-cover w-8"
                  />
                  <div>
                    <p className="text-base font-semibold ">
                      {capitilazeFirstLetter(authUser?.name)}
                    </p>
                    <p className="text-white/90 text-[10px]">
                      {authUser?.role || "USER"}
                    </p>
                  </div>
                </div>
                <hr className="border-gray-200/10" />
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-primary hover:text-white text-base font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </li>
              {authUser?.role === "ADMIN" && (
                <li>
                  <Link
                    to="/add-problem"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Add Problem
                  </Link>
                </li>
              )}
              <li>
                <LogoutButton className="hover:bg-primary hover:text-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
