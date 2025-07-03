"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
  skip?: boolean;
}

export function useIntersectionObserver<T extends Element = Element>(
  options: UseIntersectionObserverOptions = {},
) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = "100px",
    triggerOnce = true,
    skip = false,
    ...otherOptions
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const isElementIntersecting = entry.isIntersecting;

      if (isElementIntersecting && !hasTriggered) {
        setIsIntersecting(true);

        if (triggerOnce) {
          setHasTriggered(true);
          // Disconnect observer if it should only trigger once
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      } else if (!triggerOnce) {
        setIsIntersecting(isElementIntersecting);
      }
    },
    [hasTriggered, triggerOnce],
  );

  useEffect(() => {
    const element = elementRef.current;

    if (skip || !element || typeof window === "undefined") {
      return;
    }

    // Create observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      root,
      rootMargin,
      ...otherOptions,
    });

    // Start observing
    observerRef.current.observe(element);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin, handleIntersection, skip, otherOptions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    elementRef,
    isIntersecting: skip ? true : isIntersecting,
    hasTriggered,
  };
}

// Hook for lazy loading components
export function useLazyLoad<T extends Element = Element>(
  options: UseIntersectionObserverOptions = {},
) {
  const { elementRef, isIntersecting } = useIntersectionObserver<T>({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "200px", // Load content when it's 200px away from viewport
    ...options,
  });

  return {
    ref: elementRef,
    shouldLoad: isIntersecting,
  };
}

// Hook for tracking scroll-based animations
export function useScrollAnimation<T extends Element = Element>(
  options: UseIntersectionObserverOptions = {},
) {
  const { elementRef, isIntersecting } = useIntersectionObserver<T>({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "100px",
    ...options,
  });

  return {
    ref: elementRef,
    isVisible: isIntersecting,
  };
}

// Hook for performance monitoring
export function usePerformanceObserver() {
  const [metrics, setMetrics] = useState<{
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
  }>({});

  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "largest-contentful-paint") {
          setMetrics((prev) => ({ ...prev, lcp: entry.startTime }));
        }

        if (entry.entryType === "first-input") {
          setMetrics((prev) => ({
            ...prev,
            fid:
              (entry as PerformanceEventTiming).processingStart -
              entry.startTime,
          }));
        }

        if (
          entry.entryType === "layout-shift" &&
          !(entry as any).hadRecentInput
        ) {
          setMetrics((prev) => ({
            ...prev,
            cls: (prev.cls || 0) + (entry as any).value,
          }));
        }

        if (
          entry.entryType === "paint" &&
          entry.name === "first-contentful-paint"
        ) {
          setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
        }
      });
    });

    // Observe different types of performance entries
    try {
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
      observer.observe({ entryTypes: ["first-input"] });
      observer.observe({ entryTypes: ["layout-shift"] });
      observer.observe({ entryTypes: ["paint"] });
    } catch (error) {
      console.warn("Performance observer not supported:", error);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return metrics;
}
