"use client";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { useTheme } from "next-themes";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from "next/image";
import avatar from "../../public/assests/avatar.png";
import { useSession } from "next-auth/react";
import {
  useLogOutMutation,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";
import LOGO1 from "../../public/assests/cod-ic.png";
import LOGO2 from "../../public/assests/code-school.png";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "./LanguageSwitcher/LanguageSwitcher";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

let globalTheme: string | undefined;

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [currentTheme, setCurrentTheme] = useState(globalTheme);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    globalTheme = theme;
    setCurrentTheme(theme);
  }, [theme]);

  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // جلب بيانات المستخدم
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {
    // force refetch on mount or arg change to keep data updated
    refetchOnMountOrArgChange: true,
  });

  const { data, status } = useSession();

  const [socialAuth, { isSuccess, error, isLoading: socialAuthLoading }] =
    useSocialAuthMutation();
  const [logoutMutation, { isLoading: logoutLoading }] = useLogOutMutation();

  // لمنع التكرار اللانهائي
  const socialAuthCalledRef = useRef(false);
  const logoutCalledRef = useRef(false);

  const authState = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading" || isLoading) return;

    // إذا تم الدخول عبر session بدون بيانات محلية، قم بالمزامنة
    if (!socialAuthCalledRef.current && status === "authenticated" && !userData) {
      socialAuthCalledRef.current = true;
      socialAuth({
        email: data?.user?.email ?? "",
        name: data?.user?.name ?? "",
        avatar: data?.user?.image ?? null,
      })
        .unwrap()
        .then((result) => {
          refetch();
          toast.success(t("messages.loginSuccess"));
          // Hydrate Redux with session user if not already
          if (data?.user && !authState.user) {
            dispatch(userLoggedIn({
              accessToken: "social-session",
              user: {
                id: data.user.email || "social-id",
                email: data.user.email || "",
                name: data.user.name || "",
                avatar: data.user.image ? { url: data.user.image } : undefined,
              },
            }));
          }
        })
        .catch((err) => {
          console.error("Social auth error:", err);
          socialAuthCalledRef.current = false;
        });
    }
    // If session user exists but Redux is not hydrated, hydrate it
    if (status === "authenticated" && data?.user && !authState.user) {
      dispatch(userLoggedIn({
        accessToken: "social-session",
        user: {
          id: data.user.email || "social-id",
          email: data.user.email || "",
          name: data.user.name || "",
          avatar: data.user.image ? { url: data.user.image } : undefined,
        },
      }));
    }
    // Only call logout if authenticated
    if (
      !logoutCalledRef.current &&
      status === "unauthenticated" &&
      !userData &&
      authState.isAuthenticated // Only if authenticated
    ) {
      logoutCalledRef.current = true;
      logoutMutation()
        .unwrap()
        .then(() => {
          refetch();
        })
        .catch(() => {
          logoutCalledRef.current = false;
        });
    }
  }, [data, status, userData, isLoading, socialAuth, logoutMutation, refetch, t, authState.isAuthenticated, authState.user, dispatch]);

  // تأثير السكروول على الهيدر
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // اغلاق sidebar عند تغيير المسار
  useEffect(() => {
    setOpenSidebar(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  const handleClose = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      {isLoading || socialAuthLoading || logoutLoading ? (
        <Loader />
      ) : (
        <div className="w-full relative z-50">
          <div
            className={`${
              active
                ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] duration-300"
            } duration-300`}
          >
            <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
              <div className="w-full h-[80px] flex items-center justify-between p-3">
                <div>
                  <Link
                    href={"/"}
                    className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                  >
                    <Image
                      src={currentTheme === "dark" ? LOGO1 : LOGO2}
                      alt={t("page.title")}
                      width={200}
                      height={200}
                      className="w-[180px] h-[180px] cursor-pointer"
                      priority
                    />
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <NavItems activeItem={activeItem} isMobile={false} />
                  <LanguageSwitcher />
                  {pathname === "/Parents" || pathname === "/Schools" ? null : (
                    <ThemeSwitcher />
                  )}
                  <div className="800px:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer dark:text-white text-black"
                      onClick={() => setOpenSidebar(true)}
                    />
                  </div>

                  {userData?.user ? (
                    <div className="relative" ref={profileMenuRef}>
                      <Image
                        src={
                          userData?.user.avatar?.url ||
                          userData?.user.image ||
                          avatar
                        }
                        alt={t("nav.profile")}
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer border-2 border-transparent hover:border-[#37a39a]"
                        style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                        onClick={() => setProfileMenuOpen((prev) => !prev)}
                      />
                      {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
                            onClick={() => {
                              setProfileMenuOpen(false);
                              router.push("/profile");
                            }}
                          >
                            {t("nav.profile")}
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
                            onClick={async () => {
                              setProfileMenuOpen(false);
                              await logoutMutation();
                              // Optionally, redirect to home or login
                              // router.push("/");
                            }}
                          >
                            {t("sidebar.logout")}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="hidden 800px:block cursor-pointer dark:text-white text-black"
                      onClick={() => setOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>
            {openSidebar && (
              <div
                className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                onClick={handleClose}
                id="screen"
              >
                <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                  <div className="p-4">
                    <LanguageSwitcher className="mb-4" />
                  </div>
                  <NavItems
                    activeItem={activeItem}
                    isMobile={true}
                    setOpenSidebar={setOpenSidebar}
                  />
                  <div className="ml-5 mt-4">
                    {userData?.user ? (
                      <Link
                        href={"/profile"}
                        onClick={() => setOpenSidebar(false)}
                      >
                        <Image
                          src={
                            userData?.user.avatar?.url ||
                            userData?.user.image ||
                            avatar
                          }
                          alt={t("nav.profile")}
                          width={30}
                          height={30}
                          className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        />
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          setOpen(true);
                          setOpenSidebar(false);
                        }}
                        className="flex items-center gap-1 text-black dark:text-white"
                      >
                        <HiOutlineUserCircle size={25} />
                        <span>{t("nav.login")}</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[16px] px-2 pl-5 text-black dark:text-white mt-8">
                    {t("footer.copyright", { year: new Date().getFullYear() })}
                  </p>
                </div>
              </div>
            )}
          </div>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={
                route === "Login"
                  ? Login
                  : route === "Sign-Up"
                  ? SignUp
                  : Verification
              }
              refetch={route === "Login" ? refetch : undefined}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Header;
