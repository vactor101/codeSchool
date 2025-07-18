"use client";

// import { brainwave } from "../assests";
import Logo from "@/public/assests/logo.png";
import { navigation } from "@/constants";
import Button from "./Button";
import MenuSvg from "@/public/assests/svg/MenuSvg";
import { useState } from "react";
import Image from "next/image";
import { HamburgerMenu } from "./design/Header";

const Header = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-n-8/90 backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <Image src={Logo} width={100} height={60} alt="Brainwave" />
        </a>

        <nav
          className={`flex fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 hidden lg:flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold z-2 lg:text-n-1 lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New account
        </a>
        <Button className="hidden lg:flex" href="#login">
          Sign in
        </Button>

        <Button className="ml-auto lg:hidden" px="px-3">
          <MenuSvg openNavigation={true} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
