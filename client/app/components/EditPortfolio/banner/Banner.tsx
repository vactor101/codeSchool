"use client";
import { useState, useEffect, useCallback } from "react";
import headerImg from "@/public/assests/portfolio/img/header-img.svg";
import banner from "@/public/assests/portfolio/img/banner-bg.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import DescEdit from "../DescEdit";
import { AiOutlineCamera } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useEditPortfolioMutation } from "@/redux/features/portfolio/portfolioApi";

export const Banner = ({
  portfolio,
  refetch,
}: {
  portfolio: any;
  refetch: () => Promise<any>;
}) => {
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
  }, [text, delta, index, isDeleting, toRotate, period, tick]);

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        setImage(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const [image, setImage] = useState<any>("");
  const [editPortfolio] = useEditPortfolioMutation();

  const handleEdit = async () => {
    const toastId = toast.loading("Image Is Updating...");
    const formData = new FormData();
    try {
      formData.append("image", image);
      await editPortfolio({ image }).unwrap();
      await refetch();
      toast.dismiss(toastId);
      toast.success("Image updated successfully");
      setImage(null);
    } catch (error: any) {
      toast.dismiss(toastId);
      if (error.data) {
        toast.error(error.data.message);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
  };

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
                  <DescEdit
                    className="text-gray-400 text-[18px] tracking-[0.8px] leading-[1.5em] w-[96%]"
                    data={portfolio.description}
                    refetch={refetch}
                    name="description"
                  />
                  <a
                    href={`tel:+2${portfolio.phoneNumber}`}
                    className="text-white font-bold text-[20px] mt-15 tracking-[0.8px] flex items-center"
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
                  {" "}
                  <div className="relative cursor-pointer">
                    <label htmlFor="avatar">
                      <Image
                        src={
                          image
                            ? image
                            : portfolio.image
                            ? portfolio.image
                            : headerImg
                        }
                        alt="Header Img"
                        className="animate-[updown_3s_linear_infinite]"
                        width={1000}
                        height={1000}
                      />
                      <input
                        type="file"
                        name=""
                        id="avatar"
                        className="hidden"
                        onChange={imageHandler}
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                      />
                    </label>
                    {image && <Button onClick={handleEdit}>edit</Button>}
                  </div>
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
  );
};
