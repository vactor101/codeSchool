// Performance optimization utilities

export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== "undefined" && "performance" in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit,
) => {
  const observer =
    typeof window !== "undefined"
      ? new IntersectionObserver(callback, {
          rootMargin: "100px",
          threshold: 0.1,
          ...options,
        })
      : null;

  return observer;
};

// Resource preloading
export const preloadResource = (href: string, as: string, type?: string) => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  }
};

// Image optimization
export const optimizeImageLoading = () => {
  if (
    typeof window !== "undefined" &&
    "loading" in HTMLImageElement.prototype
  ) {
    const images = document.querySelectorAll("img[data-src]");

    images.forEach((img) => {
      (img as HTMLImageElement).src =
        (img as HTMLImageElement).dataset.src || "";
    });
  }
};

// Critical resource hints
export const addResourceHints = () => {
  if (typeof window !== "undefined") {
    // Preconnect to external domains
    const preconnectDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://codeschool.online",
    ];

    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = domain;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }
};

// Memory cleanup utilities
export const cleanupMemory = () => {
  if (typeof window !== "undefined" && "gc" in window) {
    // Force garbage collection if available (Chrome DevTools)
    (window as any).gc();
  }
};

// Performance monitoring
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === "production") {
    // Send to analytics service
    console.log("Web Vital:", metric);

    // Example: Send to Google Analytics
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as any).gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value,
        ),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === "development") {
    // Bundle analyzer would require separate installation
    console.log(
      "Bundle analyzer feature requires webpack-bundle-analyzer package",
    );
  }
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css: string) => {
  if (typeof window !== "undefined") {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }
};

// Service Worker registration
export const registerServiceWorker = async () => {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);
    } catch (error) {
      console.log("Service Worker registration failed:", error);
    }
  }
};

// Performance budget checking
export const checkPerformanceBudget = () => {
  if (typeof window !== "undefined" && "performance" in window) {
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;

    const metrics = {
      FCP: 0, // First Contentful Paint
      LCP: 0, // Largest Contentful Paint
      FID: 0, // First Input Delay
      CLS: 0, // Cumulative Layout Shift
      TTFB: navigation.responseStart - navigation.requestStart,
      domContentLoaded:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    };

    // Log performance metrics
    console.log("Performance Metrics:", metrics);

    // Check against budgets
    const budgets = {
      TTFB: 600, // ms
      domContentLoaded: 1000, // ms
      loadComplete: 2000, // ms
    };

    Object.entries(budgets).forEach(([key, budget]) => {
      const actual = metrics[key as keyof typeof metrics];
      if (actual > budget) {
        console.warn(
          `Performance budget exceeded for ${key}: ${actual}ms > ${budget}ms`,
        );
      }
    });
  }
};
