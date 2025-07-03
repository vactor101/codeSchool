import { useTranslation } from '@/hooks/useTranslation';
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

export const useTranslatedConstants = () => {
  const { t } = useTranslation();

  const navigation = [
    {
      id: "0",
      title: t('nav.features'),
      url: "#features",
    },
    {
      id: "1",
      title: t('pricing.basic'),
      url: "#pricing",
    },
    {
      id: "2",
      title: t('nav.howToUse'),
      url: "#how-to-use",
    },
    {
      id: "3",
      title: t('nav.roadmap'),
      url: "#roadmap",
    },
    {
      id: "4",
      title: t('nav.newAccount'),
      url: "#signup",
      onlyMobile: true,
    },
    {
      id: "5",
      title: t('nav.signIn'),
      url: "#login",
      onlyMobile: true,
    },
  ];

  const heroIcons = [
    { icon: homeSmile, href: "" },
    { icon: file02 },
    { icon: searchMd, href: "#homeSearch" },
    { icon: plusSquare },
  ];

  const notificationImages = [notification4, notification3, notification2];

  const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

  const brainwaveServices = [
    t('services.readyToUseLessons'),
    t('services.comprehensiveCurriculum'),
    t('services.progressTracking'),
    t('services.teacherAiSupport'),
  ];

  const brainwaveServicesIcons = [
    recording03,
    recording01,
    disc02,
    chromecast,
    sliders04,
  ];

  const roadmap = [
    {
      id: "0",
      title: t('roadmap.voiceRecognition'),
      text: t('roadmap.voiceRecognitionDesc'),
      date: "May 2023",
      status: "done",
      imageUrl: roadmap1,
      colorful: true,
    },
    {
      id: "1",
      title: t('roadmap.gamification'),
      text: t('roadmap.gamificationDesc'),
      date: "May 2023",
      status: "progress",
      imageUrl: roadmap2,
    },
    {
      id: "2",
      title: t('roadmap.chatbotCustomization'),
      text: t('roadmap.chatbotCustomizationDesc'),
      date: "May 2023",
      status: "done",
      imageUrl: roadmap3,
    },
    {
      id: "3",
      title: t('roadmap.integrationWithApis'),
      text: t('roadmap.integrationWithApisDesc'),
      date: "May 2023",
      status: "progress",
      imageUrl: roadmap4,
    },
  ];

  const collabText = t('kidsProgram.description');
  const text1 = t('kidsProgram.foundationText');

  const collabContent = [
    {
      id: "0",
      title: t('kidsProgram.levelOne'),
      text: text1,
    },
    {
      id: "1",
      title: t('kidsProgram.levelTwo'),
      text: text1,
    },
    {
      id: "2",
      title: t('kidsProgram.levelThree'),
      text: text1,
    },
  ];

  const collabApps = [
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

  const pricing = [
    {
      id: "0",
      title: t('pricing.basic'),
      description: t('pricing.basicDesc'),
      price: "0",
      features: [
        t('pricing.aiChatbot'),
        t('pricing.personalizedRecommendations'),
        t('pricing.exploreFeatures'),
      ],
    },
    {
      id: "1",
      title: t('pricing.premium'),
      description: t('pricing.premiumDesc'),
      price: "9.99",
      features: [
        t('pricing.advancedChatbot'),
        t('pricing.analyticsDashboard'),
        t('pricing.prioritySupport'),
      ],
    },
    {
      id: "2",
      title: t('pricing.enterprise'),
      description: t('pricing.enterpriseDesc'),
      price: null,
      features: [
        t('pricing.aiChatbot'),
        t('pricing.personalizedRecommendations'),
        t('pricing.exploreFeatures'),
      ],
    },
  ];

  const benefits = [
    {
      id: "0",
      title: t('benefits.problemSolvingTitle'),
      text: t('benefits.problemSolvingText'),
      backgroundUrl: "../assests/benefits/card-1.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "1",
      title: t('benefits.projectBasedTitle'),
      text: t('benefits.projectBasedText'),
      backgroundUrl: "../assests/benefits/card-2.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "2",
      title: t('benefits.debuggingTitle'),
      text: t('benefits.debuggingText'),
      backgroundUrl: "@/assests/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage2,
    },
    {
      id: "3",
      title: t('benefits.bestAgeTitle'),
      text: t('benefits.bestAgeText'),
      backgroundUrl: "../assests/benefits/card-4.svg",
      iconUrl: benefitIcon4,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "4",
      title: t('benefits.whatIsCodingTitle'),
      text: t('benefits.whatIsCodingText'),
      backgroundUrl: "../assests/benefits/card-5.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "5",
      title: t('benefits.codingEthicsTitle'),
      text: t('benefits.codingEthicsText'),
      backgroundUrl: "../assests/benefits/card-6.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
    },
  ];

  const socials = [
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
      title: t('footer.instagram'),
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
      title: t('footer.facebook'),
      iconUrl: facebook,
      url: "#",
    },
  ];

  return {
    navigation,
    heroIcons,
    notificationImages,
    companyLogos,
    brainwaveServices,
    brainwaveServicesIcons,
    roadmap,
    collabText,
    text1,
    collabContent,
    collabApps,
    pricing,
    benefits,
    socials,
  };
};
