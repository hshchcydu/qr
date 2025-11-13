export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface TrendingTicker {
  symbol: string;
  name: string;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  change: number;
}

export interface QuickStat {
  label: string;
  value: number;
  change?: number;
  icon: string;
  color: string;
}

// Generate live market indices with realistic fluctuations
export function generateMarketIndices(): MarketIndex[] {
  const baseIndices = [
    { symbol: 'SPX', name: 'S&P 500', basePrice: 5800, volatility: 0.015 },
    { symbol: 'DJI', name: 'Dow Jones', basePrice: 42000, volatility: 0.012 },
    { symbol: 'IXIC', name: 'NASDAQ', basePrice: 18500, volatility: 0.02 },
    { symbol: 'RUT', name: 'Russell 2000', basePrice: 2100, volatility: 0.018 },
  ];

  return baseIndices.map((index) => {
    const randomChange = (Math.random() - 0.5) * 2 * index.volatility;
    const price = index.basePrice * (1 + randomChange);
    const change = price - index.basePrice;
    const changePercent = (change / index.basePrice) * 100;

    return {
      symbol: index.symbol,
      name: index.name,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
    };
  });
}

// Check if market is open (simplified - doesn't account for holidays)
export function isMarketOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  // Weekend
  if (day === 0 || day === 6) return false;

  // Weekday - market open 9:30 AM to 4:00 PM ET
  // Simplified: assume local time for demo
  const marketOpen = 9 * 60 + 30; // 9:30 AM
  const marketClose = 16 * 60; // 4:00 PM

  return timeInMinutes >= marketOpen && timeInMinutes < marketClose;
}

// Generate Fear & Greed Index (0-100)
export function generateFearGreedIndex(): number {
  return Math.floor(Math.random() * 100);
}

// Generate trending tickers
export function generateTrendingTickers(): TrendingTicker[] {
  const tickers = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', baseMentions: 1200 },
    { symbol: 'TSLA', name: 'Tesla Inc', baseMentions: 980 },
    { symbol: 'AAPL', name: 'Apple Inc', baseMentions: 850 },
    { symbol: 'MSFT', name: 'Microsoft Corp', baseMentions: 720 },
    { symbol: 'AMZN', name: 'Amazon.com Inc', baseMentions: 650 },
    { symbol: 'GOOGL', name: 'Alphabet Inc', baseMentions: 580 },
    { symbol: 'META', name: 'Meta Platforms', baseMentions: 520 },
    { symbol: 'AMD', name: 'Advanced Micro Devices', baseMentions: 480 },
    { symbol: 'PLTR', name: 'Palantir Technologies', baseMentions: 420 },
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', baseMentions: 380 },
  ];

  return tickers.map((ticker) => {
    const mentions = Math.floor(ticker.baseMentions * (0.8 + Math.random() * 0.4));
    const sentimentRoll = Math.random();
    const sentiment = sentimentRoll > 0.6 ? 'positive' : sentimentRoll > 0.3 ? 'neutral' : 'negative';
    const change = parseFloat(((Math.random() - 0.5) * 10).toFixed(2));

    return {
      symbol: ticker.symbol,
      name: ticker.name,
      mentions,
      sentiment,
      change,
    };
  });
}

// Generate quick stats
export function generateQuickStats(): QuickStat[] {
  return [
    {
      label: 'News Today',
      value: Math.floor(150 + Math.random() * 50),
      change: parseFloat((Math.random() * 20 - 5).toFixed(1)),
      icon: '📰',
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Active Alerts',
      value: Math.floor(5 + Math.random() * 10),
      icon: '🔔',
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Community Posts',
      value: Math.floor(80 + Math.random() * 40),
      change: parseFloat((Math.random() * 15 - 3).toFixed(1)),
      icon: '💬',
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Saved Articles',
      value: Math.floor(10 + Math.random() * 20),
      icon: '⭐',
      color: 'from-orange-500 to-orange-600',
    },
  ];
}

// Get time until market open/close
export function getMarketTimeInfo(): { status: string; nextEvent: string; timeUntil: string } {
  const now = new Date();
  const marketOpen = isMarketOpen();

  if (marketOpen) {
    const closeTime = new Date(now);
    closeTime.setHours(16, 0, 0, 0);
    const diff = closeTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return {
      status: 'Market Open',
      nextEvent: 'Market Close',
      timeUntil: `${hours}h ${minutes}m`,
    };
  } else {
    const day = now.getDay();
    let nextOpen = new Date(now);

    // If weekend, set to next Monday
    if (day === 0) {
      nextOpen.setDate(now.getDate() + 1);
    } else if (day === 6) {
      nextOpen.setDate(now.getDate() + 2);
    } else {
      // Check if after hours
      if (now.getHours() >= 16) {
        nextOpen.setDate(now.getDate() + 1);
      }
    }

    nextOpen.setHours(9, 30, 0, 0);
    const diff = nextOpen.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return {
      status: 'Market Closed',
      nextEvent: 'Market Open',
      timeUntil: hours > 24 ? `${Math.floor(hours / 24)}d ${hours % 24}h` : `${hours}h ${minutes}m`,
    };
  }
}
