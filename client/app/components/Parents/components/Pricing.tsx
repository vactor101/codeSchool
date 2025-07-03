import Section from "./Section";
import { smallSphere, stars } from "@/public/assests";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";
import Image from "next/image";
import { data, Data } from "@/app/utils/parentsAndSchools";
import Link from "next/link";

const Pricing = () => {
  const { parents }: Data = data;

  return (
    <Section className="overflow-hidden relative" id="pricing">
      <div className="container relative z-2 px-4 sm:px-6 lg:px-8">
        {/* Enhanced Sphere decoration with animation */}
        <div className="hidden lg:flex relative justify-center mb-12 lg:mb-[6.5rem]">
          <div className="relative animate-float">
            <Image
              src={smallSphere}
              className="relative z-1 hover:scale-110 transition-transform duration-500"
              width={255}
              height={255}
              alt="Decorative sphere"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src={stars}
              className="w-full opacity-80 animate-pulse"
              width={950}
              height={400}
              alt="Decorative stars"
              priority
            />
          </div>
        </div>

        {/* Enhanced Pricing heading */}
        <div className="text-center mb-12 lg:mb-16">
          <Heading
            tag={parents.priceSubTitle}
            title={parents.priceTitle}
            className="mb-4"
          />
          <p className="text-n-3 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your child&apos;s coding journey. All
            plans include expert instruction and hands-on projects.
          </p>
        </div>

        {/* Enhanced Pricing cards with better spacing */}
        <div className="relative mt-8 md:mt-12 mb-12 lg:mb-16">
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-purple-900/10 rounded-3xl p-6 sm:p-8 lg:p-12">
            <PricingList />
          </div>
          <LeftLine />
          <RightLine />
        </div>

        {/* Enhanced Call-to-action section */}
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3">
              Ready to Start Your Child&apos;s Coding Adventure?
            </h3>
            <p className="text-purple-100 mb-4 text-sm sm:text-base">
              Join thousands of families who trust Code School for their
              child&apos;s tech education.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              aria-label="View full pricing details"
            >
              <span>See Full Details</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Background gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-400 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
    </Section>
  );
};

export default Pricing;
