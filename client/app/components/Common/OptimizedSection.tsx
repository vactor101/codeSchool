"use client";

import React, { ReactNode, memo, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/app/hooks/useIntersectionObserver";

interface OptimizedSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  backgroundColor?: "white" | "gray" | "gradient";
  padding?: "sm" | "md" | "lg";
  animationDelay?: number;
  disableAnimation?: boolean;
  priority?: "high" | "normal" | "low";
}

const OptimizedSection = memo<OptimizedSectionProps>(
  ({
    id,
    children,
    className = "",
    backgroundColor = "white",
    padding = "lg",
    animationDelay = 0,
    disableAnimation = false,
    priority = "normal",
  }) => {
    const { ref, isVisible } = useScrollAnimation({
      triggerOnce: true,
      threshold: 0.2,
      rootMargin:
        priority === "high"
          ? "200px"
          : priority === "normal"
            ? "100px"
            : "50px",
    });

    // Memoize background classes
    const backgroundClasses = useMemo(() => {
      switch (backgroundColor) {
        case "gray":
          return "bg-gray-50 dark:bg-gray-900/50";
        case "gradient":
          return "bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800";
        default:
          return "bg-white dark:bg-transparent";
      }
    }, [backgroundColor]);

    // Memoize padding classes
    const paddingClasses = useMemo(() => {
      switch (padding) {
        case "sm":
          return "py-8 lg:py-12";
        case "md":
          return "py-12 lg:py-16";
        case "lg":
        default:
          return "py-16 lg:py-24";
      }
    }, [padding]);

    // Memoize animation variants
    const sectionVariants: Variants = useMemo(
      () => ({
        hidden: {
          opacity: 0,
          y: 30,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: animationDelay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }),
      [animationDelay],
    );

    // Render without animation if disabled
    if (disableAnimation) {
      return (
        <section
          id={id}
          ref={ref as React.RefObject<HTMLElement>}
          className={`relative ${backgroundClasses} ${paddingClasses} ${className}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>
      );
    }

    return (
      <motion.section
        id={id}
        ref={ref as React.RefObject<HTMLElement>}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={sectionVariants}
        className={`relative ${backgroundClasses} ${paddingClasses} ${className}`}
        // Performance optimizations
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1px 400px", // Estimated size for better layout stability
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </motion.section>
    );
  },
);

OptimizedSection.displayName = "OptimizedSection";

export default OptimizedSection;

// Higher-order component for wrapping lazy-loaded components
export const withOptimizedSection = <P extends object>(
  Component: React.ComponentType<P>,
  sectionProps?: Partial<OptimizedSectionProps>,
) => {
  const WrappedComponent = memo((props: P) => (
    <OptimizedSection
      {...({ id: "wrapped-section", ...sectionProps } as OptimizedSectionProps)}
    >
      <Component {...props} />
    </OptimizedSection>
  ));

  WrappedComponent.displayName = `withOptimizedSection(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

// Skeleton component for loading states
export const SectionSkeleton = memo<{
  height?: number;
  className?: string;
}>(({ height = 400, className = "" }) => (
  <div
    className={`animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg mx-4 ${className}`}
    style={{ height: `${height}px` }}
    aria-label="Loading content..."
  >
    <div className="p-8 space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  </div>
));

SectionSkeleton.displayName = "SectionSkeleton";
