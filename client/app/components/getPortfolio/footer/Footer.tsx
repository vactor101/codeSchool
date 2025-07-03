import React from "react";
import { Newsletter } from "../newsletter/Newsletter";
import logo from "@/public/assests/portfolio/img/logo.png";
import footer from "@/public/assests/portfolio/img/footer-bg.png";
import Image from "next/image";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
const Footer = ({ portfolio }: { portfolio: any }) => {
  return (
    <footer
      className="pb-12 bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${footer.src})` }}
    >
      <div className="container">
        <div className="items-center grid grid-cols-12 gap-5">
          <Newsletter portfolio={portfolio} />
          <div className="sm:col-span-6 col-span-12">
            <Link href="/" className="w-24">
              <Image
                src={logo}
                alt="Logo"
                className="w-1/4 800px:mx-0 mx-auto"
              />
            </Link>
          </div>
          <div className="sm:col-span-6 col-span-12 text-center sm:text-end">
            <div className="flex items-center sm:justify-end justify-center space-x-3 mb-5">
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
            <p className="text-white capitalize">
              Copyright {new Date().getFullYear()}. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
