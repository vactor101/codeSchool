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
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2 px-4 sm:px-6 lg:px-8">
        {/* Sphere decoration - hidden on mobile */}
        <div className="hidden lg:flex relative justify-center mb-12 lg:mb-[6.5rem]">
          <Image
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Decorative sphere"
            priority
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Decorative stars"
              priority
            />
          </div>
        </div>

        {/* Pricing heading */}
        <Heading 
          tag={parents.priceSubTitle} 
          title={parents.priceTitle} 
          className="text-center lg:text-left"
        />

        {/* Pricing cards */}
        <div className="relative mt-8 md:mt-12">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>

        {/* See details link */}
        <div className="flex justify-center mt-8 md:mt-10">
          <Link
            href="/pricing"
            className="text-xs sm:text-sm font-code font-bold tracking-wider uppercase border-b border-transparent hover:border-current transition-colors duration-200 py-1"
            aria-label="View full pricing details"
          >
            See the full details
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;