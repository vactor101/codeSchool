import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  service2,
  sliders04,
} from "@/public/assests";
import Image1 from "../../public/assests/hero/img1.png";
import Image2 from "../../public/assests/hero/img2.png";
import Image3 from "../../public/assests/hero/img3.png";
import Image4 from "../../public/assests/hero/img4.png";
import Image5 from "../../public/assests/hero/img5.png";
import Image6 from "../../public/assests/hero/img6.png";

import Imagepar1 from "../../public/assests/sponsor/stem.png";
import Imagepar2 from "../../public/assests/sponsor/code.png";
import Imagepar3 from "../../public/assests/sponsor/img-4.png";

import image_1 from "https://res.cloudinary.com/dnc5j6v1q/image/upload/v1723980589/Screenshot_2024-08-18_142927_cvtc8x.png"
import service4 from "@/public/assests/services/service-3 - Copy.png";
import { StaticImageData } from "next/image";

interface Blog {
  id: string;
  title: string;
  text: string;
  backgroundUrl: string;
  iconUrl: StaticImageData;
  imageUrl: StaticImageData;
  light?: boolean;
}

interface CollabItem {
  title: string;
  des: string;
}

interface ServiceKey {
  title: string;
  des: string;
}

interface ServiceTab {
  label: string;
  value: string;
  image: StaticImageData;
  text: string;
  video: string;
}

interface RoadmapItem {
  id: string;
  title: string;
  text: string;
  date: string;
  status: "done" | "progress";
  imageUrl: StaticImageData;
  colorful?: boolean;
}

interface Pricing {
  id: string;
  title: string;
  description: string;
  price: string | null;
  features: string[];
}

interface SchoolData {
  heroTitle: string;
  heroTitleCurve: string;
  heroDes: string;
  slidersImages: StaticImageData[];
  sliderInfo: string;
  sliderTextUnder: string;
  companyLogos: StaticImageData[];
  blogTitle: string;
  blogs: Blog[];
  collabTitle: string;
  collabText: string;
  collabItems: CollabItem[];
  servicesTitle: string;
  servicesText: string;
  servicesKeyTitle: string;
  servicesKeyDes: string;
  servicesKey: ServiceKey[];
  servicesKeyAlert: string;
  servicesTabsTitle: string;
  servicesTabsDes: string;
  servicesTabs: ServiceTab[];
  priceSubTitle: string;
  priceTitle: string;
  pricing: Pricing[];
  roadmapSubTitle: string;
  roadmapTitle: string;
  roadmapItems: RoadmapItem[];
}

interface ParentData extends SchoolData {}

export interface Data {
  schools: SchoolData;
  parents: ParentData;
}
//////////////////////////////// schools////////////////////////////
export const data: Data = {
  schools: {
    heroTitle:
      "Transform After-School Activities with ",
    heroTitleCurve: "Coding.",
    heroDes:
      "Empowering Tomorrow's Innovators Through programming and AI Transform After-School Activities with Coding Code School for Schools AI-powered platform empowers teachers with no prior programming experience to develop students’ problem-solving and creativity skills through engaging coding projects. Partner with Code School and prepare your students for a world where digital literacy is paramount.",
    slidersImages: [Image1, Image2, Image3,Image4,Image5,Image6],
    sliderInfo:
      "if you're not dreaming big for your child, Who's doing it for them",
    sliderTextUnder: "Join Our Vibrant Global Community",
    companyLogos: [Imagepar1, Imagepar2, Imagepar3],
    blogTitle: "read more",
    blogs: [
      {
        id: "0",
        title: "How Coding Can Help You Master Problem Solving",
        text: "In today’s rapidly evolving technological landscape, problem solving skills have become increasingly valuable. One of the most effective ways to develop and enhance problem solving abilities is through learning to code. Coding, or computer programming, involves creating algorithms, writing code, and debugging software to create functional and efficient programs. In this article, we will explore the ways in which coding can improve problem solving skills and foster the development of logical and analytical thinking. ",
        backgroundUrl: "../assests/benefits/card-1.svg",
        iconUrl: benefitIcon1,
        imageUrl: benefitImage2,
      },
      {
        id: "1",
        title:
          "Why Project-Based Learning in Coding Education is a Great Idea?",
        text: "In recent years, project-based learning (PBL) has emerged as a powerful instructional approach that promotes deeper understanding, fosters creativity, and enhances problem-solving skills. PBL has proven to be particularly effective in coding education, as it allows students to apply theoretical concepts to real-world situations, fostering engagement and promoting the development of essential soft skills.In this article, we will explore the benefits of incorporating PBL into coding education and discuss how it shapes the learning experience for students",
        backgroundUrl: "../assests/benefits/card-2.svg",
        iconUrl: benefitIcon2,
        imageUrl: benefitImage2,
        light: true,
      },
      {
        id: "2",
        title:
          "The Art of Debugging: Teaching Kids to Embrace Mistakes and Learn from Them",
        text: "In today’s swiftly evolving digital landscape, the emergence of advanced AI tools is reshaping the significance of coding skills in the job market. However, for children, learning to code transcends the mere acquisition of job skills. It is a journey into the realm of creativity, problem-solving, and self-confidence. Debugging, an often-overlooked aspect of programming, plays a pivotal role in this educational adventure. It’s not just about correcting errors; it’s a pathway to developing essential life skills.By navigating through the challenges of debugging, children learn to approach problems with a creative mindset, bolster their resilience, and enhance their self-confidence. This introduction sets the stage for a discussion on how debugging is instrumental in equipping the next generation with the skills to thrive in a future where adaptability and innovative thinking are paramount.",
        backgroundUrl: "@/assests/benefits/card-3.svg",
        iconUrl: benefitIcon3,
        imageUrl: benefitImage2,
      },
      {
        id: "3",
        title: "The Best Age for a Child to Start Coding",
        text: "In recent years, there has been a shift in the beliefs held by educators and tech experts regarding the age at which children should learn coding basics. It is now widely believed that children as young as six can benefit from being introduced to coding concepts. This is a departure from past beliefs when it was thought that coding was more appropriate for high school or college students. The reasoning behind this shift is that teaching coding to children at a younger age helps them develop problem-solving skills, critical thinking abilities, and creativity. It also helps prepare them for the future workforce, as coding is becoming an increasingly important skill in many industries. As a result, educators are now placing a greater emphasis on teaching coding to children, and many schools are introducing coding classes into their curriculum for even the youngest students.",
        backgroundUrl: "../assests/benefits/card-4.svg",
        iconUrl: benefitIcon4,
        imageUrl: benefitImage2,
        light: true,
      },
      {
        id: "4",
        title: "What is coding? Everything you should know",
        text: "Coding, at its simplest, is a process of communicating with computers. It’s a language that allows us to give instructions to computers and other machines. Coding lets us create computer software, apps, websites, and even animations. It’s the magic behind the digital world we interact with every day.Coding for kids is not much different – it’s about teaching children how to code in a way that’s both understandable and fun. It is teaching kids how to speak the language of computers. From developing their own games to creating websites, coding for kids is about sparking interest and setting a foundation for a very promising future.",
        backgroundUrl: "../assests/benefits/card-5.svg",
        iconUrl: benefitIcon1,
        imageUrl: benefitImage2,
      },
      {
        id: "5",
        title: "How Teaching Coding Ethics Can Benefit Your Child’s Future?",
        text: "In the digital age, the importance of teaching children to code cannot be overstated. However, as we empower the younger generation with these valuable skills, it’s equally crucial to instill a strong sense of ethics and safe programming practices. Teaching children about coding ethics prepares them to navigate the digital world responsibly, ensuring they use their skills to create positive impacts.By the end of this article, you will have a better understanding of how teaching coding ethics can help create a generation of responsible and ethical coders who use technology for the betterment of society and the world at large.",
        backgroundUrl: "../assests/benefits/card-6.svg",
        iconUrl: benefitIcon2,
        imageUrl: benefitImage2,
      },
    ],
    collabTitle: "Key Benefits",
    collabText:
      "At our Online School, we believe that every kid has the potential to achieve greatness.With our experienced and passionate teachers, we are confident that we can help your kide reach their full potential.",
collabItems: [
      {
        title: "Level I:Programming Foundation",
        des: "Building the core skills with Scratch through creative projects and interactive learning.",
      },
      {
        title: "Comprehensive Curriculum",
        des: "Courses spanning from pre-coding to advanced topics.",
      },
      {
        title: "Progress Tracking",
        des: "Monitor student achievements with easy-to-understand reports.",
      },
    ],
    servicesTitle:
      "Curriculum Overview",
    servicesText:
      "At Code School, children aged 6 to 18 are divided into three age groups.These divisions consider the psychological, social, mental, and physical abilities of the child: What can kids do at these ages?, What does my kids understand? and How will kids interact with others?",
    servicesKeyTitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde",
    servicesKeyDes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde",
    servicesKey: [
      {
        title: "Lorem ipsum dolor sit",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
      {
        title: "Lorem ipsum dolor sit",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
      {
        title: "Lorem ipsum dolor sit",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
      {
        title: "Lorem ipsum dolor sit",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
    ],
    servicesKeyAlert:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nost",
    servicesTabsTitle: "Lorem ipsum dolor sit amet",
    servicesTabsDes: "Lorem ipsum dolor sit amet",
    servicesTabs: [
      {
        label: "HTML",
        value: recording03,
        image: service4,
        text: "Hey Hossam, enhance this photo",
        video:
          "https://res.cloudinary.com/dwblsxdfg/video/upload/v1721061647/companyApp/clientsVideo/WhatsApp%20Video%202024-06-26%20at%201.03.46%20AM_411kd/b9agcj8bhfhb8vkyumsd.mp4",
      },
      {
        label: "React",
        value: recording01,
        image: service2,
        text: "Hey Moahmed, enhance this photo",
        video: "https://docs.material-tailwind.com/demo.mp4",
      },
      {
        label: "Vue",
        value: disc02,
        image: service4,
        text: "Hey Kareem, enhance this photo",
        video:
          "https://res.cloudinary.com/dwblsxdfg/video/upload/v1721061647/companyApp/clientsVideo/WhatsApp%20Video%202024-06-26%20at%201.03.46%20AM_411kd/b9agcj8bhfhb8vkyumsd.mp4",
      },
      {
        label: "Angular",
        value: chromecast,
        image: service2,
        text: "Hey Abdallah, enhance this photo",
        video: "https://docs.material-tailwind.com/demo.mp4",
      },
      {
        label: "Svelte",
        value: sliders04,
        image: service4,
        text: "Hey Mahmoud, enhance this photo",
        video:
          "https://res.cloudinary.com/dwblsxdfg/video/upload/v1721061647/companyApp/clientsVideo/WhatsApp%20Video%202024-06-26%20at%201.03.46%20AM_411kd/b9agcj8bhfhb8vkyumsd.mp4",
      },
    ],
    priceSubTitle: "Get started with Code School",
    priceTitle: "At our Online School, we believe that every kid has the potential to achieve greatness. ",
    pricing: [
      {
        id: "0",
        title: "Basic",
        description: "AI chatbot, personalized recommendations",
        price: "0",
        features: [
          "An AI chatbot that can understand your queries",
          "Personalized recommendations based on your preferences",
          "Ability to explore the app and its features without any cost",
        ],
      },
      {
        id: "1",
        title: "Premium",
        description:
          "Advanced AI chatbot, priority support, analytics dashboard",
        price: "9.99",
        features: [
          "An advanced AI chatbot that can understand complex queries",
          "An analytics dashboard to track your conversations",
          "Priority support to solve issues quickly",
        ],
      },
      {
        id: "2",
        title: "Enterprise",
        description: "Custom AI chatbot, advanced analytics, dedicated account",
        price: null,
        features: [
          "An AI chatbot that can understand your queries",
          "Personalized recommendations based on your preferences",
          "Ability to explore the app and its features without any cost",
        ],
      },
    ],
    roadmapSubTitle: "Lorem ipsum dolor sit amet consectetur",
    roadmapTitle: "Lorem ipsum dolor sit amet consectetur",
    roadmapItems: [
      {
        id: "0",
        title: "Voice recognition",
        text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
        date: "May 2023",
        status: "done",
        imageUrl: roadmap1,
        colorful: true,
      },
      {
        id: "1",
        title: "Gamification",
        text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
        date: "May 2023",
        status: "progress",
        imageUrl: roadmap2,
      },
      {
        id: "2",
        title: "Chatbot customization",
        text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
        date: "May 2023",
        status: "done",
        imageUrl: roadmap3,
      },
      {
        id: "3",
        title: "Integration with APIs",
        text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
        date: "May 2023",
        status: "progress",
        imageUrl: roadmap4,
      },
    ],
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  parents: {
    heroTitle:
      "Code School Empowering Arab Kids  Skills around",
    heroTitleCurve: "the world",
    heroDes:
      "Code School provides a fun and engaging game-based learning environment for kids to develop valuable skills, learn coding and programming skills from experienced mentors. Join Code School today and prepare your child for success in the digital age.",
    slidersImages: [Image2, Image1, Image3, Image4, Image5, Image1],
    sliderInfo:
      "if you're not dreaming big for your child, Who's doing it for them",
    sliderTextUnder: "Join Our Vibrant Global Community",
    companyLogos: [Imagepar1, Imagepar2, Imagepar3],
    blogTitle: "read more",
    blogs: [
      {
        id: "0",
        title: "How Coding Can Help You Master Problem Solving",
        text: "In today’s rapidly evolving technological landscape, problem solving skills have become increasingly valuable. One of the most effective ways to develop and enhance problem solving abilities is through learning to code. Coding, or computer programming, involves creating algorithms, writing code, and debugging software to create functional and efficient programs. In this article, we will explore the ways in which coding can improve problem solving skills and foster the development of logical and analytical thinking. ",
        backgroundUrl: "../assests/benefits/card-1.svg",
        iconUrl: benefitIcon1,
        imageUrl: benefitImage2,
      },
      {
        id: "1",
        title:
          "Why Project-Based Learning in Coding Education is a Great Idea?",
        text: "In recent years, project-based learning (PBL) has emerged as a powerful instructional approach that promotes deeper understanding, fosters creativity, and enhances problem-solving skills. PBL has proven to be particularly effective in coding education, as it allows students to apply theoretical concepts to real-world situations, fostering engagement and promoting the development of essential soft skills.In this article, we will explore the benefits of incorporating PBL into coding education and discuss how it shapes the learning experience for students",
        backgroundUrl: "../assests/benefits/card-2.svg",
        iconUrl: benefitIcon2,
        imageUrl: benefitImage2,
        light: true,
      },
      {
        id: "2",
        title:
          "The Art of Debugging: Teaching Kids to Embrace Mistakes and Learn from Them",
        text: "In today’s swiftly evolving digital landscape, the emergence of advanced AI tools is reshaping the significance of coding skills in the job market. However, for children, learning to code transcends the mere acquisition of job skills. It is a journey into the realm of creativity, problem-solving, and self-confidence. Debugging, an often-overlooked aspect of programming, plays a pivotal role in this educational adventure. It’s not just about correcting errors; it’s a pathway to developing essential life skills.By navigating through the challenges of debugging, children learn to approach problems with a creative mindset, bolster their resilience, and enhance their self-confidence. This introduction sets the stage for a discussion on how debugging is instrumental in equipping the next generation with the skills to thrive in a future where adaptability and innovative thinking are paramount.",
        backgroundUrl: "@/assests/benefits/card-3.svg",
        iconUrl: benefitIcon3,
        imageUrl: benefitImage2,
      },
      {
        id: "3",
        title: "The Best Age for a Child to Start Coding",
        text: "In recent years, there has been a shift in the beliefs held by educators and tech experts regarding the age at which children should learn coding basics. It is now widely believed that children as young as six can benefit from being introduced to coding concepts. This is a departure from past beliefs when it was thought that coding was more appropriate for high school or college students. The reasoning behind this shift is that teaching coding to children at a younger age helps them develop problem-solving skills, critical thinking abilities, and creativity. It also helps prepare them for the future workforce, as coding is becoming an increasingly important skill in many industries. As a result, educators are now placing a greater emphasis on teaching coding to children, and many schools are introducing coding classes into their curriculum for even the youngest students.",
        backgroundUrl: "../assests/benefits/card-4.svg",
        iconUrl: benefitIcon4,
        imageUrl: benefitImage2,
        light: true,
      },
      {
        id: "4",
        title: "What is coding? Everything you should know",
        text: "Coding, at its simplest, is a process of communicating with computers. It’s a language that allows us to give instructions to computers and other machines. Coding lets us create computer software, apps, websites, and even animations. It’s the magic behind the digital world we interact with every day.Coding for kids is not much different – it’s about teaching children how to code in a way that’s both understandable and fun. It is teaching kids how to speak the language of computers. From developing their own games to creating websites, coding for kids is about sparking interest and setting a foundation for a very promising future.",
        backgroundUrl: "../assests/benefits/card-5.svg",
        iconUrl: benefitIcon1,
        imageUrl: benefitImage2,
      },
      {
        id: "5",
        title: "How Teaching Coding Ethics Can Benefit Your Child’s Future?",
        text: "In the digital age, the importance of teaching children to code cannot be overstated. However, as we empower the younger generation with these valuable skills, it’s equally crucial to instill a strong sense of ethics and safe programming practices. Teaching children about coding ethics prepares them to navigate the digital world responsibly, ensuring they use their skills to create positive impacts.By the end of this article, you will have a better understanding of how teaching coding ethics can help create a generation of responsible and ethical coders who use technology for the betterment of society and the world at large.",
        backgroundUrl: "../assests/benefits/card-6.svg",
        iconUrl: benefitIcon2,
        imageUrl: benefitImage2,
      },
    ],
    collabTitle: "Kids Roadmap at Code School",
    collabText:
      "With our experienced and passionate teachers, we are confident that we can help your kids reach their full potential.",
    collabItems: [
      {
        title: "Level I: Programming Foundation",
        des: "-",
      },
      {
        title: "Level II: Robot and Device Programming",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
      {
        title: "Level III: Programming in Real World",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
    ],
    servicesTitle:
      "Code school Empowering Tomorrow's Innovators Through AI",
    servicesText:
      "At Code School, we believe in the transformative power of coding education. Our “Code School for Schools” solution is meticulously designed to equip students with the critical coding skills they’ll need for the digital future. From foundational programming concepts to advanced topics, our curriculum covers it all, ensuring a holistic coding education for every student.",
    servicesKeyTitle:
      "Key Benefits",
    servicesKeyDes:
      "Unleash the Potential of Your Students with Code School's Comprehensive Coding Program",
    servicesKey: [
      {
        title: "Ready-to-Use Lessons",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
      {
        title: "Comprehensive Curriculum",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
      {
        title: "Progress Tracking",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
      {
        title: "Teacher AI Support",
        des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nostrum unde illum atque repudiandae sed beatae aspernatur earum consequatur natus nulla nisi corrupti possimus et, assumenda maiores.Sapiente.",
      },
    ],
    servicesKeyAlert:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt numquam nost",
    servicesTabsTitle: "Lorem ipsum dolor sit amet",
    servicesTabsDes: "Lorem ipsum dolor sit amet",
    servicesTabs: [
      {
        label: "HTML",
        value: recording03,
        image: service4,
        text: "Hey Hossam, enhance this photo",
        video:
          "https://res.cloudinary.com/dwblsxdfg/video/upload/v1721061647/companyApp/clientsVideo/WhatsApp%20Video%202024-06-26%20at%201.03.46%20AM_411kd/b9agcj8bhfhb8vkyumsd.mp4",
      },
      {
        label: "React",
        value: recording01,
        image: service2,
        text: "Hey Moahmed, enhance this photo",
        video: "https://docs.material-tailwind.com/demo.mp4",
      },
      {
        label: "Vue",
        value: disc02,
        image: service4,
        text: "Hey Kareem, enhance this photo",
        video:
          "https://res.cloudinary.com/dwblsxdfg/video/upload/v1721061647/companyApp/clientsVideo/WhatsApp%20Video%202024-06-26%20at%201.03.46%20AM_411kd/b9agcj8bhfhb8vkyumsd.mp4",
      },
      {
        label: "Angular",
        value: chromecast,
        image: service2,
        text: "Hey Abdallah, enhance this photo",
        video: "https://docs.material-tailwind.com/demo.mp4",
      },
      {
        label: "Svelte",
        value: sliders04,
        image: service4,
        text: "Hey Mahmoud, enhance this photo",
        video:
          "https://res.cloudinary.com/dwblsxdfg/video/upload/v1721061647/companyApp/clientsVideo/WhatsApp%20Video%202024-06-26%20at%201.03.46%20AM_411kd/b9agcj8bhfhb8vkyumsd.mp4",
      },
    ],
    priceSubTitle: "Get started with Code school",
    priceTitle: "At our Online School, we believe that every kid has the potential to achieve greatness.",
    pricing: [
      {
        id: "0",
        title: "2 Month",
        description: "Study Type: Group Study, Study Language: Arabic",
        price: "1750",
        features: [
          "Compilation Certificate",
          "Technical Guidance.",
          "Small Groubs (from 3 to 6) student  ",
          "Appropriate educational curricula",
          "Supportive Peers"
        ],
      },
      {
        id: "1",
        title: "3 Monthes",
        description:
          "Study Type: Group Study, Study Language: Arabic",
        price: "2450",
        features: [
          "Compilation Certificate",
          "Technical Guidance.",
          "Small Groubs (from 3 to 6) student  ",
          "Appropriate educational curricula",
          "Supportive Peers"
        ],
      },
      {
        id: "2",
        title: "4 Monthes",
        description: "Study Type: Group Study, Study Language: Arabic",
        price: "3100",
        features: [
          "Compilation Certificate",
          "Technical Guidance.",
          "Small Groubs (from 3 to 6) student ",
          "Appropriate educational curricula",
          "Supportive Peers"
        ],
      },
    ],
    roadmapSubTitle: "Lorem ipsum dolor sit amet consectetur",
    roadmapTitle: "Lorem ipsum dolor sit amet consectetur",
    roadmapItems: [
      {
        id: "0",
        title: "Voice recognition",
        text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
        date: "May 2023",
        status: "done",
        imageUrl: roadmap1,
        colorful: true,
      },
      {
        id: "1",
        title: "Gamification",
        text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
        date: "May 2023",
        status: "progress",
        imageUrl: roadmap2,
      },
      {
        id: "2",
        title: "Chatbot customization",
        text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
        date: "May 2023",
        status: "done",
        imageUrl: roadmap3,
      },
      {
        id: "3",
        title: "Integration with APIs",
        text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
        date: "May 2023",
        status: "progress",
        imageUrl: roadmap4,
      },
    ],
  },
};
