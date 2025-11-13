/**
 * Date and Time Utility Functions
 * Handles formatting, market hours, and time calculations
 */

export interface MarketHours {
  isOpen: boolean;
  nextEvent: 'open' | 'close';
  nextEventTime: Date;
  timeUntilNext: string;
}

/**
 * Format a date as relative time (e.g., "2 minutes ago", "3 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 0) {
    return 'in the future';
  }

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

/**
 * Format time for market hours (ET timezone)
 */
export function formatMarketTime(date: Date | string | number): string {
  const d = new Date(date);

  // Format as HH:MM ET
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes} ${ampm} ET`;
}

/**
 * Format date as short date string (e.g., "Jan 15, 2024")
 */
export function formatShortDate(date: Date | string | number): string {
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Format date as full date string (e.g., "January 15, 2024")
 */
export function formatFullDate(date: Date | string | number): string {
  const d = new Date(date);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Check if US stock market is currently open
 * Simplified: doesn't account for holidays
 */
export function isMarketOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  // Weekend check
  if (day === 0 || day === 6) return false;

  // Market hours: 9:30 AM - 4:00 PM ET
  // Simplified: using local time for demo
  const marketOpen = 9 * 60 + 30; // 9:30 AM
  const marketClose = 16 * 60; // 4:00 PM

  return timeInMinutes >= marketOpen && timeInMinutes < marketClose;
}

/**
 * Get next market open time
 */
export function getNextMarketOpen(): Date {
  const now = new Date();
  const nextOpen = new Date(now);

  // Set to next 9:30 AM
  nextOpen.setHours(9, 30, 0, 0);

  // If it's past 9:30 today, move to tomorrow
  if (now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() >= 30)) {
    nextOpen.setDate(nextOpen.getDate() + 1);
  }

  // If it's weekend, move to Monday
  while (nextOpen.getDay() === 0 || nextOpen.getDay() === 6) {
    nextOpen.setDate(nextOpen.getDate() + 1);
  }

  return nextOpen;
}

/**
 * Get next market close time
 */
export function getNextMarketClose(): Date {
  const now = new Date();
  const nextClose = new Date(now);

  // Set to 4:00 PM today
  nextClose.setHours(16, 0, 0, 0);

  // If it's past 4:00 today or weekend, move to next trading day
  if (now.getHours() >= 16 || now.getDay() === 0 || now.getDay() === 6) {
    nextClose.setDate(nextClose.getDate() + 1);
    while (nextClose.getDay() === 0 || nextClose.getDay() === 6) {
      nextClose.setDate(nextClose.getDate() + 1);
    }
  }

  return nextClose;
}

/**
 * Get comprehensive market hours information
 */
export function getMarketHours(): MarketHours {
  const marketOpen = isMarketOpen();

  let nextEvent: 'open' | 'close';
  let nextEventTime: Date;

  if (marketOpen) {
    nextEvent = 'close';
    nextEventTime = getNextMarketClose();
  } else {
    nextEvent = 'open';
    nextEventTime = getNextMarketOpen();
  }

  const timeUntilNext = formatTimeUntil(nextEventTime);

  return {
    isOpen: marketOpen,
    nextEvent,
    nextEventTime,
    timeUntilNext,
  };
}

/**
 * Format time until a future date (e.g., "2h 30m", "1d 5h")
 */
export function formatTimeUntil(date: Date | string | number): string {
  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime();

  if (diff < 0) return '0m';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

/**
 * Get start of day
 */
export function getStartOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of day
 */
export function getEndOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Check if two dates are on the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date): boolean {
  return date.getTime() < new Date().getTime();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date): boolean {
  return date.getTime() > new Date().getTime();
}
