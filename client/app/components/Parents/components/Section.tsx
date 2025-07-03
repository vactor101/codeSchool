import SectionSvg from "../../../../public/assests/svg/SectionSvg";

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}: {
  className?: string;
  id?: string;
  crosses?: boolean;
  crossesOffset?: string;
  customPaddings?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <section
      id={id}
      className={`
      relative w-full overflow-hidden
      ${
        customPaddings ||
        `py-12 sm:py-16 lg:py-20 xl:py-24 ${crosses ? "lg:py-28 xl:py-32" : ""}`
      }
      ${className || ""}`}
    >
      <div className="relative z-10">{children}</div>

      {/* Decorative lines with better responsiveness */}
      <div className="hidden absolute top-0 left-4 w-0.25 h-full bg-stroke-1/20 pointer-events-none sm:block md:left-6 lg:left-8 xl:left-10" />
      <div className="hidden absolute top-0 right-4 w-0.25 h-full bg-stroke-1/20 pointer-events-none sm:block md:right-6 lg:right-8 xl:right-10" />

      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-8 right-8 h-0.25 bg-stroke-1/20 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left-10 xl:right-10`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </section>
  );
};

export default Section;
