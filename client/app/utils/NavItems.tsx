"use client";
import React, { FC, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export const navItemsData = [
  {
    name: "nav.home",
    url: "/",
  },
  {
    name: "nav.courses",
    url: "/courses",
  },
  {
    name: "nav.about",
    url: "/about",
  },
  {
    name: "nav.parents",
    url: "/Parents",
  },
  {
    name: "nav.schools",
    url: "/Schools",
  },
  {
    name: "nav.contact",
    url: "/contact",
  },
  {
    name: "nav.faq",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  setOpenSidebar?: Dispatch<SetStateAction<boolean>>;
};

const NavItems: FC<Props> = ({ activeItem, isMobile, setOpenSidebar }) => {
  const { t } = useTranslation();

  const handleNavItemClick = () => {
    if (isMobile && setOpenSidebar) {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={i.url} key={index} passHref onClick={handleNavItemClick}>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
                aria-current={activeItem === index ? "page" : undefined}
              >
                {t(i.name as any)}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref onClick={handleNavItemClick}>
              <span className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
                Code School
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={i.url} key={index} passHref onClick={handleNavItemClick}>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                  aria-current={activeItem === index ? "page" : undefined}
                >
                  {t(i.name as any)}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
