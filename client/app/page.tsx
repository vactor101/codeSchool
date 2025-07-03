"use client";
import React, {
  FC,
  useEffect,
  useState,
  Suspense,
  lazy,
  useCallback,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, Variants } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Lazy load heavy components that are below the fold
const Generation = dynamic(() => import("./components/Generation/Generation"), {
  loading: () => (
    <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
  ),
  ssr: false,
});

const WhyCodeSchool = dynamic(
  () => import("./components/WhyCodeSchool/WhyCodeSchool"),
  {
    loading: () => (
      <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
    ),
    ssr: false,
  },
);

const LearningPath = dynamic(
  () => import("./components/LearningPath/LearningPath"),
  {
    loading: () => (
      <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
    ),
    ssr: false,
  },
);

const Certification = dynamic(
  () => import("./components/Certification/Certification"),
  {
    loading: () => (
      <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
    ),
    ssr: false,
  },
);

const PricingSection = dynamic(() => import("./components/Pricing/Pricing"), {
  loading: () => (
    <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
  ),
  ssr: false,
});

const FAQ = dynamic(() => import("./components/FAQ/FAQ"), {
  loading: () => (
    <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
  ),
  ssr: false,
});

const CallToAction = dynamic(
  () => import("./components/CallToAction/CallToAction"),
  {
    loading: () => (
      <div className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
    ),
    ssr: false,
  },
);

const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => (
    <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse" />
  ),
  ssr: false,
});

const QuickNavigation = dynamic(
  () => import("./components/QuickNavigation/QuickNavigation"),
  {
    loading: () => null,
    ssr: false,
  },
);

const QrCode = dynamic(() => import("./components/QrCode/QrCode"), {
  loading: () => null,
  ssr: false,
});

// Lazy load popup components - they're not needed initially
const WelcomePopup = lazy(() => import("./components/Popup/WelcomePopup"));
const StarOfTheMonth = lazy(
  () => import("./components/StarOfTheMonth/StarOfTheMonth"),
);

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showStarOfMonth, setShowStarOfMonth] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { t } = useTranslation();

  // Add Redux state for authentication - memoized selector
  const authState = useSelector(
    (state: any) => ({
      isAuthenticated: state.auth?.isAuthenticated,
      user: state.auth?.user,
    }),
    (left: any, right: any) =>
      left.isAuthenticated === right.isAuthenticated &&
      left.user === right.user,
  );

  // Memoized scroll handler to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 300);
  }, []);

  // Optimized scroll event listener with passive option
  useEffect(() => {
    setIsClient(true);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Optimized popup logic with client-side only execution
  useEffect(() => {
    if (!isClient) return;

    // Use requestIdleCallback for non-critical tasks
    const idleCallback = (deadline: IdleDeadline) => {
      if (deadline.timeRemaining() > 0) {
        const hasSeenWelcomePopup = localStorage.getItem("hasSeenWelcomePopup");
        const hasSeenStarOfMonth = localStorage.getItem("hasSeenStarOfMonth");

        // Show welcome popup if first time visitor
        if (!hasSeenWelcomePopup) {
          const timer = setTimeout(() => {
            setShowWelcomePopup(true);
          }, 3000); // Increased to 3 seconds to not interfere with page load

          return () => clearTimeout(timer);
        }

        // Show Star of the Month after welcome popup
        const starTimer = setTimeout(
          () => {
            if (!hasSeenStarOfMonth) {
              setShowStarOfMonth(true);
            }
          },
          hasSeenWelcomePopup ? 5000 : 10000, // Increased delays
        );

        return () => clearTimeout(starTimer);
      }
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(idleCallback);
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(
        () => idleCallback({ timeRemaining: () => 50 } as IdleDeadline),
        0,
      );
    }
  }, [isClient]);

  // Optimized handlers with useCallback
  const handleCloseWelcomePopup = useCallback(() => {
    setShowWelcomePopup(false);
    localStorage.setItem("hasSeenWelcomePopup", "true");
  }, []);

  const handleCloseStarOfMonth = useCallback(() => {
    setShowStarOfMonth(false);
    localStorage.setItem("hasSeenStarOfMonth", "true");
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Memoized section animation variants
  const sectionVariants: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 30, // Reduced from 50 for better performance
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6, // Reduced from 0.8 for snappier feel
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    }),
    [],
  );

  // Memoized scroll button to prevent unnecessary re-renders
  const ScrollToTopButton = useMemo(() => {
    if (!showScrollTop) return null;

    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:transform group-hover:-translate-y-1 transition-transform duration-300" />
      </motion.button>
    );
  }, [showScrollTop, scrollToTop]);

  return (
    <div className="relative">
      <Heading
        title={t("page.title")}
        description={t("page.description")}
        keywords={t("page.keywords")}
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      {/* Hero Section - Critical above-the-fold content */}
      <section id="hero" className="relative">
        <Hero />
      </section>

      {/* Main Content with reduced spacing */}
      <main className="relative">
        {/* Generation Section */}
        <motion.section
          id="generation"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "50px" }}
          variants={sectionVariants}
          className="py-6 lg:py-8"
        >
          <Suspense
            fallback={
              <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />
            }
          >
            <Generation />
          </Suspense>
        </motion.section>

        {/* Why Code School Section */}
        <motion.section
          id="why-code-school"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "50px" }}
          variants={sectionVariants}
          className="py-6 lg:py-8"
        >
          <Suspense
            fallback={
              <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />
            }
          >
            <WhyCodeSchool />
          </Suspense>
        </motion.section>

        {/* Learning Path Section */}
        <motion.section
          id="learning-path"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "50px" }}
          variants={sectionVariants}
          className="py-6 lg:py-8"
        >
          <Suspense
            fallback={
              <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />
            }
          >
            <LearningPath />
          </Suspense>
        </motion.section>

        {/* Certification Section */}
        <motion.section
          id="certification"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "50px" }}
          variants={sectionVariants}
          className="py-6 lg:py-8"
        >
          <Suspense
            fallback={
              <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />
            }
          >
            <Certification />
          </Suspense>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          id="pricing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "50px" }}
          variants={sectionVariants}
          className="py-6 lg:py-8"
        >
          <div className="container mx-auto px-4">
            <Suspense
              fallback={
                <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
              }
            >
              <PricingSection />
            </Suspense>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          id="faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "50px" }}
          variants={sectionVariants}
          className="py-6 lg:py-8"
        >
          <Suspense
            fallback={
              <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />
            }
          >
            <FAQ />
          </Suspense>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          id="cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "50px" }}
          variants={sectionVariants}
          className="py-6 lg:py-8"
        >
          <Suspense
            fallback={
              <div className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg mx-4" />
            }
          >
            <CallToAction />
          </Suspense>
        </motion.section>
      </main>

      {/* Footer - Lazy loaded */}
      <Suspense
        fallback={
          <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        }
      >
        <Footer />
      </Suspense>

      {/* Conditionally render user-specific content */}
      {isClient && authState.user?.portfolioUserName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Suspense fallback={null}>
            <QrCode user={authState.user} />
          </Suspense>
        </motion.div>
      )}

      {/* Quick Navigation - Lazy loaded */}
      {isClient && (
        <Suspense fallback={null}>
          <QuickNavigation />
        </Suspense>
      )}

      {/* Scroll to Top Button - Memoized */}
      {ScrollToTopButton}

      {/* Optimized styles - moved to external CSS for better caching */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        /* Optimized scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #b886f2, #ed82c3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a575e8, #de6eb8);
        }

        .dark ::-webkit-scrollbar-track {
          background: #2d3748;
        }

        /* Performance optimizations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Optimize animations for performance */
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Optimize image loading */
        img {
          content-visibility: auto;
        }

        /* Optimize heavy sections */
        section {
          contain: layout style paint;
        }
      `}</style>

      {/* Popup Components - Only load when needed */}
      {isClient && showWelcomePopup && (
        <Suspense fallback={null}>
          <WelcomePopup
            isOpen={showWelcomePopup}
            onClose={handleCloseWelcomePopup}
          />
        </Suspense>
      )}

      {isClient && showStarOfMonth && (
        <Suspense fallback={null}>
          <StarOfTheMonth
            isOpen={showStarOfMonth}
            onClose={handleCloseStarOfMonth}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Page;
