"use client";
import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Yassen Abdallah",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge university",
    comment:
      "I had the pleasure of exploring Code School, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out Code School!",
  },
  {
    name: "Samah Adel",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
  },
  {
    name: "Hassan Ahmed",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "computer systems engineering student | Zimbabwe",
    comment:
      "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
  },
  {
    name: "Radwa galal",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "I had the pleasure of exploring Code School, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience",
  },
  {
    name: "Asmaa Magdy",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full stack web developer | Algeria",
    comment:
      "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. for that any person had beginner-level can complete an integrated project when he watches the videos. Thank you very much. Im very excited for the next videos Keep doing this amazing work",
  },
  {
    name: "Hanan Khokha",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full stack web developer | Canada",
    comment:
      "Join Code School! Code School focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend Code School to anyone looking to improve their programming skills and build practical projects. Code School is a great resource that will help you take your skills to the next level.",
  },
];

const Reviews = (props: Props) => {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full mb-12 lg:mb-16">
          {/* Image Section */}
          <div className="lg:w-[50%] w-full max-w-[600px] mx-auto lg:mx-0">
            <Image
              src={require("../../../public/assests/business-img.png")}
              alt="Happy students learning to code"
              width={700}
              height={700}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-[50%] w-full text-center lg:text-left">
            <h2 className={`${styles.title} text-3xl sm:text-4xl lg:text-[40px] leading-[1.3] lg:leading-[1.4] font-bold mb-4 lg:mb-6`}>
              Our Kids Are <span className="text-gradient">Our Strength</span>{" "}
              <span className="block">See What Their Parents Say About Us.</span>
            </h2>
            <p className={`${styles.label} text-sm sm:text-base text-gray-600 dark:text-gray-300`}>
              <span className="text-gradient font-semibold">Code School</span> we recognize the
              immense value of coding for kids, and our programs are tailored to
              harness their potential. Through hands-on coding experiences,
              interactive projects, and expert guidance, we nurture young minds to
              become confident, creative, and future-ready individuals.
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10 xl:gap-12">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className={`
                ${index === 2 ? "md:transform md:-translate-y-8 lg:-translate-y-10" : ""}
                ${index === 5 ? "md:transform md:-translate-y-4 lg:-translate-y-6" : ""}
                transition-all duration-300 hover:scale-[1.02]
              `}
            >
              <ReviewCard item={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;