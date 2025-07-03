import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "@/public/assests";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [
  { icon: homeSmile, href: "" },
  { icon: file02 },
  { icon: searchMd, href: "#homeSearch" },
  { icon: plusSquare },
];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Ready-to-Use Lessons",
  "Comprehensive Curriculum",
  "Progress Tracking",
  "Teacher AI Support",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
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
];

export const collabText =
  "Code School’s Kids Roadmap program is the perfect place for your child to learn to code. Our comprehensive curriculum, engaging project-based learning, focus on creativity and critical thinking";

export const text1 =
  "Learning the foundations of programming is an exciting and rewarding experience for kids. They get to bring their own ideas to life by creating animations, games, and interactive stories. It encourages creativity and experimentation";

export const collabContent = [
  {
    id: "0",
    title: "Level I: Programming Foundation",
    text: text1,
  },
  {
    id: "1",
    title: "Level II: Robot and Device Programming",
    text: text1,
  },
  {
    id: "2",
    title: "Level III: Programming in Real World",
    text: text1,
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
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
    description: "Advanced AI chatbot, priority support, analytics dashboard",
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
];

export const benefits = [
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
    title: "Why Project-Based Learning in Coding Education is a Great Idea?",
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
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
