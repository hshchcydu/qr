/**
 * Number Formatting Utilities
 * Handles currency, percentages, and large number formatting
 */

/**
 * Format a number as currency (USD)
 */
export function formatPrice(
  value: number,
  options?: {
    decimals?: number;
    showCents?: boolean;
    compact?: boolean;
  }
): string {
  const { decimals = 2, showCents = true, compact = false } = options || {};

  if (compact && Math.abs(value) >= 1000) {
    return formatLargeNumber(value, { prefix: '$' });
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? decimals : 0,
    maximumFractionDigits: showCents ? decimals : 0,
  });

  return formatter.format(value);
}

/**
 * Format a number as a percentage
 */
export function formatPercent(
  value: number,
  options?: {
    decimals?: number;
    showSign?: boolean;
    multiplyBy100?: boolean;
  }
): string {
  const { decimals = 2, showSign = true, multiplyBy100 = false } = options || {};

  const numValue = multiplyBy100 ? value * 100 : value;
  const sign = showSign && numValue > 0 ? '+' : '';

  return `${sign}${numValue.toFixed(decimals)}%`;
}

/**
 * Format large numbers with K, M, B, T suffixes
 */
export function formatLargeNumber(
  value: number,
  options?: {
    decimals?: number;
    prefix?: string;
    suffix?: string;
  }
): string {
  const { decimals = 1, prefix = '', suffix = '' } = options || {};

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1e12) {
    return `${sign}${prefix}${(absValue / 1e12).toFixed(decimals)}T${suffix}`;
  } else if (absValue >= 1e9) {
    return `${sign}${prefix}${(absValue / 1e9).toFixed(decimals)}B${suffix}`;
  } else if (absValue >= 1e6) {
    return `${sign}${prefix}${(absValue / 1e6).toFixed(decimals)}M${suffix}`;
  } else if (absValue >= 1e3) {
    return `${sign}${prefix}${(absValue / 1e3).toFixed(decimals)}K${suffix}`;
  }

  return `${sign}${prefix}${absValue.toFixed(decimals)}${suffix}`;
}

/**
 * Format a number with commas
 */
export function formatNumber(
  value: number,
  options?: {
    decimals?: number;
    alwaysShowDecimals?: boolean;
  }
): string {
  const { decimals = 0, alwaysShowDecimals = false } = options || {};

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: alwaysShowDecimals ? decimals : 0,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value);
}

/**
 * Format a stock price with appropriate decimals
 */
export function formatStockPrice(value: number): string {
  // Stocks under $1 show 4 decimals, otherwise 2
  const decimals = value < 1 ? 4 : 2;
  return formatPrice(value, { decimals });
}

/**
 * Format market cap with K, M, B, T suffixes
 */
export function formatMarketCap(value: number): string {
  return formatLargeNumber(value, { prefix: '$', decimals: 2 });
}

/**
 * Format volume with K, M, B suffixes
 */
export function formatVolume(value: number): string {
  return formatLargeNumber(value, { decimals: 1 });
}

/**
 * Format change with sign and color indicator
 */
export function formatChange(
  value: number,
  options?: {
    isPercent?: boolean;
    decimals?: number;
  }
): { formatted: string; isPositive: boolean; isNegative: boolean; isNeutral: boolean } {
  const { isPercent = false, decimals = 2 } = options || {};

  const sign = value > 0 ? '+' : '';
  const formatted = isPercent
    ? `${sign}${value.toFixed(decimals)}%`
    : `${sign}${formatPrice(value, { decimals })}`;

  return {
    formatted,
    isPositive: value > 0,
    isNegative: value < 0,
    isNeutral: value === 0,
  };
}

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Parse a formatted number string back to number
 */
export function parseFormattedNumber(value: string): number {
  // Remove currency symbols, commas, and spaces
  const cleaned = value.replace(/[$,\s]/g, '');

  // Handle K, M, B, T suffixes
  const match = cleaned.match(/^([-+]?[\d.]+)([KMBT])?$/i);
  if (!match) return NaN;

  const [, numStr, suffix] = match;
  let num = parseFloat(numStr);

  if (suffix) {
    const multipliers: Record<string, number> = {
      K: 1e3,
      M: 1e6,
      B: 1e9,
      T: 1e12,
    };
    num *= multipliers[suffix.toUpperCase()];
  }

  return num;
}

/**
 * Format a ratio (e.g., P/E ratio)
 */
export function formatRatio(value: number, decimals: number = 2): string {
  if (!isFinite(value) || isNaN(value)) return 'N/A';
  return value.toFixed(decimals);
}

/**
 * Format basis points (1 bp = 0.01%)
 */
export function formatBasisPoints(value: number): string {
  return `${value.toFixed(0)} bps`;
}

/**
 * Truncate a string with ellipsis
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Format duration in seconds to readable format
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else if (minutes > 0) {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `0:${secs.toString().padStart(2, '0')}`;
  }
}

/**
 * Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
 */
export function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;

  if (j === 1 && k !== 11) return `${num}st`;
  if (j === 2 && k !== 12) return `${num}nd`;
  if (j === 3 && k !== 13) return `${num}rd`;
  return `${num}th`;
}
