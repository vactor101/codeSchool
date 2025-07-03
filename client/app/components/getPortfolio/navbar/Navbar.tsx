"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/assests/portfolio/img/logo.png";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const NavBar = ({ portfolio }: { portfolio: any }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value: string) => {
    setActiveLink(value);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all ${
        scrolled ? "bg-gray-900 py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="w-24">
          <Image src={logo} alt="Logo" className="h-auto w-full" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["home", "skills", "projects"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={`text-lg font-medium transition ${
                activeLink === link
                  ? "text-white opacity-100"
                  : "text-gray-400 opacity-75 hover:text-white"
              }`}
              onClick={() => onUpdateActiveLink(link)}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>

        {/* Social Icons & Button */}
        <div className="flex items-center space-x-6">
          <div className="items-center space-x-3 800px:flex hidden">
            {[
              { icon: faFacebookF, link: portfolio.facebookLink },
              { icon: faInstagram, link: portfolio.instagramLink },
              { icon: faLinkedinIn, link: portfolio.linkedinLink },
              { icon: faGithub, link: portfolio.githubLink },
            ].map((value, index) => (
              <a
                key={index}
                href={value.link}
                className="relative w-10 h-10 flex items-center justify-center rounded-full border border-white/50 bg-white/10 text-white transition hover:bg-white hover:text-black hover:scale-105 duration-300"
              >
                <FontAwesomeIcon
                  icon={value.icon}
                  className="w-5 h-5"
                  size="lg"
                />
              </a>
            ))}
          </div>
          <a href={`tel:+2${portfolio.phoneNumber}`}>
            <button className="relative overflow-hidden group 800px:px-10 px-5 800px:py-5 py-2 text-lg font-semibold text-white border border-white transition bg-transparent hover:text-gray-900">
              <span className="absolute block w-full -left-full group-hover:left-0 top-0 bg-white h-full z-[-1] duration-300"></span>
              Let’s Connect
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};
