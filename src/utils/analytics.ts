/**
 * Analytics utilities for tracking user behavior and performance
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class Analytics {
  private enabled: boolean;

  constructor() {
    this.enabled =
      import.meta.env.VITE_ENABLE_ANALYTICS === 'true' &&
      import.meta.env.PROD;
  }

  /**
   * Initialize analytics (Google Analytics, etc.)
   */
  init() {
    if (!this.enabled) return;

    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (!trackingId) return;

    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', trackingId);
      (window as any).gtag = gtag;
    };
  }

  /**
   * Track page view
   */
  pageView(path: string, title?: string) {
    if (!this.enabled) return;

    if ((window as any).gtag) {
      (window as any).gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
        page_path: path,
        page_title: title,
      });
    }
  }

  /**
   * Track custom event
   */
  event({ category, action, label, value }: AnalyticsEvent) {
    if (!this.enabled) return;

    if ((window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.log('[Analytics Event]', { category, action, label, value });
    }
  }

  /**
   * Track search
   */
  search(query: string) {
    this.event({
      category: 'Search',
      action: 'search',
      label: query,
    });
  }

  /**
   * Track bookmark
   */
  bookmark(itemType: string, itemId: string) {
    this.event({
      category: 'Bookmark',
      action: 'add',
      label: `${itemType}:${itemId}`,
    });
  }

  /**
   * Track share
   */
  share(platform: string, itemType: string) {
    this.event({
      category: 'Share',
      action: platform,
      label: itemType,
    });
  }

  /**
   * Track error
   */
  error(error: Error, context?: string) {
    if (!this.enabled) return;

    if ((window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        context: context,
      });
    }

    // Send to error reporting service (e.g., Sentry)
    if (import.meta.env.VITE_SENTRY_DSN) {
      // window.Sentry?.captureException(error, { extra: { context } });
    }
  }

  /**
   * Track performance metrics
   */
  performance(metric: string, value: number) {
    if (!this.enabled) return;

    if ((window as any).gtag) {
      (window as any).gtag('event', 'timing_complete', {
        name: metric,
        value: Math.round(value),
        event_category: 'Performance',
      });
    }
  }

  /**
   * Track user timing
   */
  timing(category: string, variable: string, value: number, label?: string) {
    if (!this.enabled) return;

    if ((window as any).gtag) {
      (window as any).gtag('event', 'timing_complete', {
        name: variable,
        value: Math.round(value),
        event_category: category,
        event_label: label,
      });
    }
  }
}

export const analytics = new Analytics();

/**
 * Hook to track page views
 */
export function usePageTracking() {
  if (typeof window === 'undefined') return;

  // Track initial page view
  analytics.pageView(window.location.pathname);

  // Track page views on route change
  const originalPushState = window.history.pushState;
  window.history.pushState = function (...args) {
    originalPushState.apply(window.history, args);
    analytics.pageView(window.location.pathname);
  };

  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function (...args) {
    originalReplaceState.apply(window.history, args);
    analytics.pageView(window.location.pathname);
  };

  window.addEventListener('popstate', () => {
    analytics.pageView(window.location.pathname);
  });
}
