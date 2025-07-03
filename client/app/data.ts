// Using placeholder images for course thumbnails
const imageAge1 = { src: "/assests/age1.jpeg" };
const imageAge2 = { src: "/assests/age2.jpeg" };
const imageAge3 = { src: "/assests/age3.jpeg" };

export interface Leader {
  img: string;
  age: number;
  project: string;
  projectAr?: string;
  video?: string;
  name?: string;
  nameAr?: string;
  role?: string;
  roleAr?: string;
  quote?: string;
  quoteAr?: string;
}

export interface Project {
  gif: string;
  title: string;
  titleAr?: string;
}

export interface Tool {
  icon: string;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
}

export const leaders: Leader[] = [
  {
    img: "https://cdn.prod.website-files.com/655a78032f46f2e55da300ff/65fc77ffc1b3e8c5026c222e_amryasser65fc73238d0a6.webp",
    age: 12,
    project: "AI Chatbot",
    projectAr: "روبوت محادثة ذكي",
    video: "https://www.youtube.com/watch?v=upBKD20aZRE",
    name: "Amr Yasser",
    nameAr: "عمرو ياسر",
    role: "AI Developer",
    roleAr: "مطور ذكاء اصطناعي",
    quote: "Coding is like solving puzzles that matter.",
    quoteAr: "البرمجة مثل حل الألغاز ا��مهمة.",
  },
  {
    img: "https://cdn.prod.website-files.com/655a78032f46f2e55da300ff/65fc77ff5f1b5602e0ad7ce7_adhamessam65fc730f4ff42.webp",
    age: 14,
    project: "Mobile Game",
    projectAr: "لعبة محمولة",
    video: "https://www.youtube.com/watch?v=upBKD20aZRE",
    name: "Adham Essam",
    nameAr: "أدهم عصام",
    role: "Game Developer",
    roleAr: "مطور ألعاب",
    quote: "I love bringing my imagination to life through code.",
    quoteAr: "أحب إحياء خيالي من خلال البرمجة.",
  },
  {
    img: "https://cdn.prod.website-files.com/655a78032f46f2e55da300ff/65fc77ff6521b91f1a96f0c3_alimohamedali65fc7318a7d17.webp",
    age: 16,
    project: "Web App",
    projectAr: "تطبيق ويب",
    video: "https://www.youtube.com/watch?v=upBKD20aZRE",
    name: "Ali Mohamed",
    nameAr: "علي محمد",
    role: "Web Developer",
    roleAr: "مطور ويب",
    quote: "The web is my canvas, code is my paint.",
    quoteAr: "الويب هو لوحتي، والكود هو ألواني.",
  },
  {
    img: "https://cdn.prod.website-files.com/655a78032f46f2e55da300ff/65fc77ff7be9dc9199f0c0bd_belalfoaad65fc73274b2d3.webp",
    age: 15,
    project: "E-Commerce Platform",
    projectAr: "منصة تجارة إلكترونية",
    video: "https://www.youtube.com/watch?v=upBKD20aZRE",
    name: "Belal Foaad",
    nameAr: "بلال فؤاد",
    role: "Full Stack Developer",
    roleAr: "مطور مكدس كامل",
    quote: "Technology should solve real problems for people.",
    quoteAr: "التكنولوجيا يجب أن تحل مشاكل حقيقية للناس.",
  },
  {
    img: "https://cdn.prod.website-files.com/655a78032f46f2e55da300ff/65fc77fe9583caea614965b4_abdulmonemharaz65fc73018b9f2.webp",
    age: 17,
    project: "Smart Home App",
    projectAr: "تطبيق منزل ذكي",
    video: "https://www.youtube.com/watch?v=upBKD20aZRE",
    name: "Abdul Monem",
    nameAr: "عبد المنعم",
    role: "IoT Developer",
    roleAr: "مطور إنترنت الأشياء",
    quote: "Connecting the physical world through code is magical.",
    quoteAr: "ربط العالم المادي من خلال البرمجة أمر سحري.",
  },
  {
    img: "https://cdn.prod.website-files.com/655a78032f46f2e55da300ff/65fc77fe2b39ff4fb3ce98d5_mahmoudmohamed65fc7337cab19.webp",
    age: 18,
    project: "Blockchain Solution",
    projectAr: "حل البلوك تشين",
    video: "https://www.youtube.com/watch?v=upBKD20aZRE",
    name: "Mahmoud Mohamed",
    nameAr: "محمود محمد",
    role: "Blockchain Developer",
    roleAr: "مطور البلوك تشين",
    quote: "Decentralization is the future of technology.",
    quoteAr: "اللامركزية هي مستقبل التكنولوجيا.",
  },
];

export const projects: Project[] = [
  {
    gif: "https://ischool-makreting.s3.eu-central-1.amazonaws.com/SRJRPN6ILXJ_Selfdrivingcars.gif",
    title: "Self-Driving Car Sim",
    titleAr: "محاكي السيارة ذاتية القيادة",
  },
  {
    gif: "https://ischool-makreting.s3.eu-central-1.amazonaws.com/O6G7CZO5YFI_MinecraftUFOShooter.gif",
    title: "Minecraft UFO Shooter",
    titleAr: "لعبة إطلاق النار على الأطباق الطائرة في ماينكرافت",
  },
  {
    gif: "https://ischool-makreting.s3.eu-central-1.amazonaws.com/R7JSPSVEZ9H_MinecraftPokemonCatcher.gif",
    title: "Pokemon Catcher Game",
    titleAr: "لعبة صيد البوكيمون",
  },
  {
    gif: "https://ischool-makreting.s3.eu-central-1.amazonaws.com/YTZR0Z29UGN_Fidgetspinner.gif",
    title: "Fidget Spinner",
    titleAr: "لعبة الدوامة",
  },
  {
    gif: "https://ischool-makreting.s3.eu-central-1.amazonaws.com/KVKEEFC42V9_MinecraftDroneFlyer.gif",
    title: "Minecraft Drone Flyer",
    titleAr: "طائرة بدون طيار في ماينكرافت",
  },
  {
    gif: "https://ischool-makreting.s3.eu-central-1.amazonaws.com/KUZ0K10SZQD_3dMario.gif",
    title: "3D Mario",
    titleAr: "ماريو ثلاثي الأبعاد",
  },
];

export const tools: Tool[] = [
  {
    icon: "https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6570bda6795115c9a1b58cba_Vectors-Wrapper.svg",
    title: "Mobile App Development",
    titleAr: "تطوير تطبيقات الهاتف المحمول",
    description:
      "Build native and cross-platform mobile applications using React Native and Flutter.",
    descriptionAr:
      "بناء تطبيقات الهاتف المحمول الأصلية ومتعددة المنصات باستخدام React Native و Flutter.",
  },
  {
    icon: "https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6570bda7743510115ae03cc6_Vectors-Wrapper.svg",
    title: "AI & Machine Learning",
    titleAr: "الذكاء الاصطناعي وتعلم الآلة",
    description:
      "Learn to create intelligent systems with TensorFlow, PyTorch, and other ML frameworks.",
    descriptionAr:
      "تع��م إنشاء أنظمة ذكية باستخدام TensorFlow و PyTorch وأطر عمل تعلم الآلة الأخرى.",
  },
  {
    icon: "https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6570bda8e36f3ac082f6e89e_Vectors-Wrapper.svg",
    title: "3D Coding (AR, VR)",
    titleAr: "البرمجة ثلاثية الأبعاد (الواقع المعزز، الواقع الافتراضي)",
    description:
      "Develop immersive experiences using Unity, Three.js, and AR/VR technologies.",
    descriptionAr:
      "تطوير تجارب غامرة باستخدام Unity و Three.js وتقنيات الواقع المعزز والافتراضي.",
  },
  {
    icon: "https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6570bda80501f736147e30ce_Vectors-Wrapper.svg",
    title: "Web Development",
    titleAr: "تطوير الويب",
    description:
      "Master modern web technologies like React, Next.js, and full-stack development.",
    descriptionAr:
      "إتقان تقنيات الويب الحديثة مثل React و Next.js وتطوير المكدس الكامل.",
  },
  {
    icon: "https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6570bda90501f736147e314f_Vectors-Wrapper.svg",
    title: "Cloud Computing",
    titleAr: "الحوسبة السحابية",
    description:
      "Learn to deploy and scale applications using AWS, Azure, and Google Cloud.",
    descriptionAr:
      "تعلم نشر وتوسيع التطبيقات باستخدام AWS و Azure و Google Cloud.",
  },
  {
    icon: "https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6570bdaa66bea5361ed18ab2_Vectors-Wrapper.svg",
    title: "Data Science",
    titleAr: "علم البيانات",
    description:
      "Analyze and visualize data using Python, Pandas, and data visualization tools.",
    descriptionAr:
      "تحليل وتصور البيانات باستخدام Python و Pandas وأدوات تصور البيانات.",
  },
  {
    icon: "https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6570bdab002243ef36f14b8a_Vectors-Wrapper.svg",
    title: "Blockchain",
    titleAr: "البلوك تشين",
    description:
      "Build decentralized applications using Ethereum, Solidity, and Web3 technologies.",
    descriptionAr:
      "بناء التطبيقات اللامركزية باستخدام Ethereum و Solidity وتقنيات Web3.",
  },
  {
    icon: "https://cdn.prod.website-files.com/655a78032f46f2e55da300d7/6570bdac831c28fe7ded83dd_Vectors-Wrapper.svg",
    title: "DevOps",
    titleAr: "ديف أوبس",
    description:
      "Implement CI/CD pipelines, containerization, and infrastructure as code.",
    descriptionAr: "تنفيذ خطوط أنابيب CI/CD والحاويات والبنية التحتية كرمز.",
  },
];

export interface Course {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  imageUrl: string;
  ageRange: string;
}

export interface PricingTier {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  price: string | null;
  features: string[];
  featuresAr?: string[];
}

export const ageRanges = ["5-8", "9-13", "14-18"];

export const durations = ["2 Month", "3 Monthes", "4 Monthes"];

export const allCourses: Course[] = [
  {
    id: "1",
    title: "Technology Around Us",
    titleAr: "التكنولوجيا من حولنا",
    description: "Explore the basics of technology in everyday life",
    descriptionAr: "استكشف أساسيات التكنولوجيا في الحياة اليومية",
    imageUrl: imageAge1.src,
    ageRange: "5-8",
  },
  {
    id: "2",
    title: "Coding With Minecraft",
    titleAr: "البرمجة مع ماينكرافت",
    description: "Build and code in the world of Minecraft",
    descriptionAr: "ابني وبرمج في عالم ماينكرافت",
    imageUrl: imageAge2.src,
    ageRange: "9-13",
  },
  {
    id: "3",
    title: "Python & Web Development",
    titleAr: "بايثون وتطوير الويب",
    description: "Introduction to programming and web technologies",
    descriptionAr: "مقدمة في البرمجة وتقنيات الويب",
    imageUrl: imageAge3.src,
    ageRange: "14-18",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "0",
    title: "Basic",
    titleAr: "أساسي",
    description: "Perfect for beginners with 2 months access",
    descriptionAr: "مثالي للمبتدئين مع وصول لمدة شهرين",
    price: "1750",
    features: [
      "12 live classes",
      "Basic support",
      "Access to learning materials",
    ],
    featuresAr: ["12 فصل مباشر", "دعم أساسي", "الوصول إلى المواد التعليمية"],
  },
  {
    id: "1",
    title: "Premium",
    titleAr: "مميز",
    description: "Great for regular learners with 3 months access",
    descriptionAr: "رائع للمتعلمين المنتظمين مع وصول لمدة 3 أشهر",
    price: "2450",
    features: [
      "24 live classes",
      "Priority support",
      "Bonus materials",
      "Progress tracking",
    ],
    featuresAr: ["24 فصل مباشر", "دعم أولوية", "مواد إضافية", "تتبع التقدم"],
  },
  {
    id: "2",
    title: "Enterprise",
    titleAr: "مؤسسي",
    description: "Best for serious learners with 4 months access",
    descriptionAr: "الأفضل للمتعلمين الجادين مع وصول لمدة 4 أشهر",
    price: "3100",
    features: [
      "36 live classes",
      "24/7 premium support",
      "All bonus materials",
      "1-on-1 mentoring",
      "Certificate of completion",
    ],
    featuresAr: [
      "36 فصل مباشر",
      "دعم مميز 24/7",
      "جميع المواد الإضافية",
      "إرشاد فردي",
      "شهادة إتمام",
    ],
  },
];

export const successStories = [
  {
    title: "About US",
    titleAr: "عنا",
    description:
      "I started with zero coding knowledge. After completing the full stack development course at Code School, I landed a job at a tech startup with a competitive salary. The hands-on projects and mentorship made all the difference in my journey.",
    descriptionAr:
      "بدأت بدون أي معرفة في البرمجة. بعد إكمال دورة تطوير المكدس الكامل في مدرسة البرمجة، حصلت على وظيفة في شركة تقنية ناشئة براتب تنافسي. المشاريع العملية والإرشاد صنعا كل الفرق في رحلتي.",
  },
  {
    title: "Career Change Success",
    titleAr: "نجاح تغيير المهنة",
    description:
      "After 10 years in marketing, I decided to switch to programming. The structured curriculum and supportive community at Code School helped me transition smoothly. Within 6 months of graduation, I was working as a junior developer.",
    descriptionAr:
      "بعد 10 سنوات في التسويق، قررت التحول إلى البرمجة. المنهج المنظم والمجتمع الداعم في مدرسة البرمجة ساعدني على الانتقال بسلاسة. خلال 6 أشهر من التخرج، كنت أعمل كمطور مبتدئ.",
  },
];

// Helper functions to get localized content
export const getLocalizedContent = (
  item: any,
  field: string,
  locale: string,
) => {
  if (locale === "ar" && item[`${field}Ar`]) {
    return item[`${field}Ar`];
  }
  return item[field];
};

export const getLocalizedCourse = (course: Course, locale: string) => ({
  ...course,
  title: getLocalizedContent(course, "title", locale),
  description: getLocalizedContent(course, "description", locale),
});

export const getLocalizedPricingTier = (tier: PricingTier, locale: string) => ({
  ...tier,
  title: getLocalizedContent(tier, "title", locale),
  description: getLocalizedContent(tier, "description", locale),
  features:
    locale === "ar" && tier.featuresAr ? tier.featuresAr : tier.features,
});

export const getLocalizedTool = (tool: Tool, locale: string) => ({
  ...tool,
  title: getLocalizedContent(tool, "title", locale),
  description: getLocalizedContent(tool, "description", locale),
});

export const getLocalizedProject = (project: Project, locale: string) => ({
  ...project,
  title: getLocalizedContent(project, "title", locale),
});

export const getLocalizedLeader = (leader: Leader, locale: string) => ({
  ...leader,
  name: getLocalizedContent(leader, "name", locale),
  role: getLocalizedContent(leader, "role", locale),
  project: getLocalizedContent(leader, "project", locale),
  quote: getLocalizedContent(leader, "quote", locale),
});

export const getLocalizedSuccessStory = (story: any, locale: string) => ({
  ...story,
  title: getLocalizedContent(story, "title", locale),
  description: getLocalizedContent(story, "description", locale),
});
