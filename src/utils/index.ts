import { format, formatDistance, parseISO } from 'date-fns';

/**
 * Format a date to a readable string
 */
export const formatDate = (date: Date | string, formatStr = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
};

/**
 * Truncate text to a specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generate a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format large numbers with abbreviations (K, M, B)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Get sentiment color class
 */
export const getSentimentColor = (
  sentiment?: 'positive' | 'negative' | 'neutral'
): string => {
  switch (sentiment) {
    case 'positive':
      return 'text-green-600 bg-green-50';
    case 'negative':
      return 'text-red-600 bg-red-50';
    case 'neutral':
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

/**
 * Get impact color class
 */
export const getImpactColor = (impact: 'high' | 'medium' | 'low'): string => {
  switch (impact) {
    case 'high':
      return 'text-red-600 bg-red-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-blue-600 bg-blue-50';
  }
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Sleep/delay function
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Export new utility modules (selective exports to avoid conflicts)

// Date/Time utilities
export {
  formatMarketTime,
  formatShortDate,
  formatFullDate,
  isMarketOpen,
  getNextMarketOpen,
  getNextMarketClose,
  getMarketHours,
  formatTimeUntil,
  getStartOfDay,
  getEndOfDay,
  addDays,
  isSameDay,
  isToday,
  isPast,
  isFuture,
} from './dateTime';
export type { MarketHours } from './dateTime';

// Formatters (excluding formatNumber which is already defined in this file)
export {
  formatPrice,
  formatPercent,
  formatLargeNumber,
  formatStockPrice,
  formatVolume,
  formatMarketCap,
  formatChange,
  formatBytes,
  parseFormattedNumber,
  formatRatio,
  formatBasisPoints,
  truncateString,
  formatDuration,
  getOrdinalSuffix,
} from './formatters';

// Mock Dashboard Data (excluding isMarketOpen which is in dateTime)
export {
  generateMarketIndices,
  generateFearGreedIndex,
  generateTrendingTickers,
  generateQuickStats,
  getMarketTimeInfo,
} from './mockDashboardData';
export type { MarketIndex, TrendingTicker, QuickStat } from './mockDashboardData';

// Mock Community Data (only posts, not comments)
export { generateMockPosts } from './mockCommunityData';

// Mock Comment Data (main source for comments)
export { generateMockComments } from './mockCommentData';
