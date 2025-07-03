"use client";
import { useState, useEffect, useCallback } from "react";
import headerImg from "@/public/assests/portfolio/img/header-img.svg";
import banner from "@/public/assests/portfolio/img/banner-bg.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Banner = ({ portfolio }: { portfolio: any }) => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = portfolio.positions;
  const period = 2000;

  // Memoize the tick function to prevent unnecessary re-renders
  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  }, [loopNum, toRotate, isDeleting, text, period]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, delta, tick]);

  return (
    <section
      className="banner mt-0 py-[260px] bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage: `url(${banner.src})`,
      }}
      id="home"
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-6/12 xl:w-7/12">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline font-bold tracking-[0.8px] px-2 py-1 bg-gradient-to-r text-white from-pink-500 to-purple-500 bg-opacity-50 border border-white border-opacity-50 text-[20px] mb-4 inline-block">
                    Welcome to my Portfolio
                  </span>
                  <h1 className="800px:text-[65px] text-3xl font-bold tracking-[0.8px] leading-none mb-5 text-white capitalize">
                    Hi! I&apos;m {portfolio.name}{" "}
                    <span
                      className="txt-rotate border-r-[0.08em] border-gray-500"
                      data-period="1000"
                      data-rotate={portfolio.positions}
                    >
                      <span className="wrap">{text}</span>
                    </span>
                  </h1>
                  <p className="text-gray-400 text-[18px] tracking-[0.8px] leading-[1.5em] w-[96%] mb-10">
                    {portfolio.description}
                  </p>
                  <a
                    href={`tel:+2${portfolio.phoneNumber}`}
                    className="text-white font-bold text-[20px] mt-15 tracking-[0.8px] flex items-center"
                    onClick={() => console.log("connect")}
                  >
                    Let&apos;s Connect
                    <FontAwesomeIcon
                      icon={faCircleArrowRight}
                      className="ml-2 text-[25px] transition-transform duration-300"
                    />
                  </a>
                </div>
              )}
            </TrackVisibility>
          </div>
          <div className="w-full md:w-6/12 xl:w-5/12">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <Image
                    src={portfolio.image ? portfolio.image : headerImg}
                    alt="Header Img"
                    className="animate-[updown_3s_linear_infinite]"
                    width={1000}
                    height={1000}
                  />
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
  );
};
