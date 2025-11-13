import type { NewsArticle } from '@/types';

const sources = ['Bloomberg', 'Reuters', 'CNBC', 'Wall Street Journal', 'Financial Times', 'MarketWatch', 'Barrons'];

const newsTemplates = [
  {
    headline: "Federal Reserve Signals Potential Rate Cut in Q3 2024",
    summary: "Fed Chair Jerome Powell indicated that interest rate cuts could begin in the third quarter if inflation continues to moderate. Markets rallied on the dovish commentary.",
    category: 'economy' as const,
    importance: 'high' as const,
    tickers: ['SPY', 'TLT'],
  },
  {
    headline: "Apple Announces $120 Billion Share Buyback Program",
    summary: "Apple unveiled the largest share repurchase program in corporate history, signaling confidence in future growth. The tech giant also raised its quarterly dividend by 4%.",
    category: 'stocks' as const,
    importance: 'high' as const,
    tickers: ['AAPL'],
  },
  {
    headline: "Microsoft Beats Earnings Expectations on Cloud Growth",
    summary: "Microsoft reported Q2 earnings that surpassed analyst estimates, driven by strong Azure cloud revenue growth of 31% year-over-year. Stock rises 5% in after-hours trading.",
    category: 'earnings' as const,
    importance: 'high' as const,
    tickers: ['MSFT'],
  },
  {
    headline: "Tesla Recalls 2.2 Million Vehicles Over Autopilot Concerns",
    summary: "The EV maker issued a voluntary recall affecting most vehicles sold in the US to address safety concerns with the Autopilot warning system.",
    category: 'stocks' as const,
    importance: 'high' as const,
    tickers: ['TSLA'],
  },
  {
    headline: "Nvidia Stock Surges as AI Chip Demand Remains Strong",
    summary: "Nvidia shares jumped 8% after the company announced record data center revenue, with AI chip demand showing no signs of slowing down.",
    category: 'stocks' as const,
    importance: 'high' as const,
    tickers: ['NVDA'],
  },
  {
    headline: "January Jobs Report Shows 353,000 New Positions Added",
    summary: "The US economy added far more jobs than expected in January, with unemployment holding steady at 3.7%. Wage growth accelerated to 4.5% annually.",
    category: 'economy' as const,
    importance: 'high' as const,
    tickers: ['SPY', 'DIA'],
  },
  {
    headline: "Amazon Web Services Revenue Grows 13% Year-Over-Year",
    summary: "AWS continues to dominate the cloud infrastructure market with $24.2 billion in quarterly revenue, though growth rate has moderated from previous years.",
    category: 'earnings' as const,
    importance: 'medium' as const,
    tickers: ['AMZN'],
  },
  {
    headline: "Meta Platforms Announces 15% Workforce Reduction",
    summary: "Facebook parent company Meta will lay off approximately 10,000 employees as part of its 'year of efficiency' initiative to streamline operations.",
    category: 'stocks' as const,
    importance: 'high' as const,
    tickers: ['META'],
  },
  {
    headline: "Goldman Sachs Raises S&P 500 Year-End Target to 5,500",
    summary: "Investment bank Goldman Sachs increased its S&P 500 price target citing strong corporate earnings and anticipated Fed rate cuts.",
    category: 'market-analysis' as const,
    importance: 'medium' as const,
    tickers: ['SPY'],
  },
  {
    headline: "Oil Prices Fall 3% on China Demand Concerns",
    summary: "WTI crude dropped below $75/barrel as weak economic data from China raised concerns about global oil demand in the world's largest importer.",
    category: 'commodities' as const,
    importance: 'medium' as const,
    tickers: ['USO', 'XLE'],
  },
  {
    headline: "JPMorgan Reports Record Quarterly Profit of $13.4 Billion",
    summary: "The nation's largest bank posted record earnings driven by higher interest rates and strong investment banking activity.",
    category: 'earnings' as const,
    importance: 'high' as const,
    tickers: ['JPM'],
  },
  {
    headline: "Consumer Price Index Rises 3.1% Year-Over-Year",
    summary: "January inflation data came in slightly above expectations at 3.1%, with core CPI rising 3.9%. Fed officials monitor data closely for rate decision.",
    category: 'economy' as const,
    importance: 'high' as const,
    tickers: ['SPY', 'TLT'],
  },
  {
    headline: "Disney Streaming Subscriber Growth Slows Dramatically",
    summary: "Disney+ added only 100,000 subscribers in Q4, marking the slowest growth since launch. The company announced price increases to boost profitability.",
    category: 'earnings' as const,
    importance: 'medium' as const,
    tickers: ['DIS'],
  },
  {
    headline: "Visa Processes Record $3.3 Trillion in Q4 Transactions",
    summary: "Payment processor Visa reported strong quarterly results with transaction volume up 10% year-over-year as consumer spending remains resilient.",
    category: 'earnings' as const,
    importance: 'medium' as const,
    tickers: ['V'],
  },
  {
    headline: "Bitcoin ETF Sees $500 Million in First Week Inflows",
    summary: "Newly approved spot Bitcoin ETFs attracted significant institutional investment, with total inflows exceeding half a billion dollars.",
    category: 'crypto' as const,
    importance: 'medium' as const,
    tickers: ['BTC'],
  },
  {
    headline: "Walmart Raises Full-Year Guidance on Strong Sales",
    summary: "The retail giant increased its earnings outlook after reporting better-than-expected same-store sales growth of 5.3%.",
    category: 'earnings' as const,
    importance: 'medium' as const,
    tickers: ['WMT'],
  },
  {
    headline: "Netflix Adds 13 Million Subscribers in Q4 Earnings Beat",
    summary: "Streaming platform Netflix exceeded expectations with strong subscriber growth and announced plans to crack down on password sharing.",
    category: 'earnings' as const,
    importance: 'high' as const,
    tickers: ['NFLX'],
  },
  {
    headline: "Treasury Yields Surge After Strong Retail Sales Data",
    summary: "The 10-year Treasury yield jumped 15 basis points to 4.35% following robust retail sales that beat forecasts by wide margin.",
    category: 'economy' as const,
    importance: 'high' as const,
    tickers: ['TLT', 'IEF'],
  },
  {
    headline: "Google Announces Major AI Integration Across Products",
    summary: "Alphabet unveiled Gemini AI integration across Google Workspace, Search, and Android, marking the company's biggest AI push yet.",
    category: 'stocks' as const,
    importance: 'high' as const,
    tickers: ['GOOGL'],
  },
  {
    headline: "Housing Starts Drop 14% as Mortgage Rates Stay Elevated",
    summary: "New residential construction fell sharply in January as 30-year mortgage rates hovering near 7% continue to dampen homebuilder sentiment.",
    category: 'economy' as const,
    importance: 'medium' as const,
    tickers: ['XHB'],
  },
  {
    headline: "Semiconductor Shortage Eases, Prices Begin to Normalize",
    summary: "After three years of supply constraints, chip manufacturers report inventory levels returning to normal, putting pressure on semiconductor stock valuations.",
    category: 'stocks' as const,
    importance: 'medium' as const,
    tickers: ['NVDA', 'AMD', 'INTC'],
  },
  {
    headline: "Bank of America Warns of Recession Risk in Late 2024",
    summary: "BofA economists predict a 40% probability of recession by Q4 2024, citing inverted yield curve and tightening credit conditions.",
    category: 'market-analysis' as const,
    importance: 'high' as const,
    tickers: ['SPY'],
  },
  {
    headline: "European Markets Rally on Strong German Manufacturing Data",
    summary: "European indices climbed 2% after German factory orders exceeded forecasts, easing recession fears in the Eurozone's largest economy.",
    category: 'economy' as const,
    importance: 'low' as const,
    tickers: ['EWG'],
  },
  {
    headline: "Rivian Secures $2 Billion Loan from US Government",
    summary: "The EV startup received Department of Energy backing to expand its production facility in Georgia, boosting investor confidence.",
    category: 'stocks' as const,
    importance: 'medium' as const,
    tickers: ['RIVN'],
  },
  {
    headline: "Dollar Weakens Against Euro as ECB Maintains Rates",
    summary: "The US dollar fell 1.2% versus the euro after European Central Bank held rates steady while Fed signals potential cuts.",
    category: 'forex' as const,
    importance: 'low' as const,
    tickers: ['UUP'],
  },
];

let idCounter = 1;

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(hoursAgo: number): Date {
  const now = new Date();
  const randomHours = Math.random() * hoursAgo;
  return new Date(now.getTime() - randomHours * 60 * 60 * 1000);
}

function getSentiment(): 'positive' | 'negative' | 'neutral' {
  const rand = Math.random();
  if (rand < 0.35) return 'positive';
  if (rand < 0.65) return 'negative';
  return 'neutral';
}

export function generateMockNews(): NewsArticle[] {
  return newsTemplates.map((template, index) => ({
    id: `news-${idCounter++}`,
    title: template.headline,
    summary: template.summary,
    content: `${template.summary}\n\n${generateDetailedContent()}`,
    author: `${getRandomElement(['John', 'Sarah', 'Michael', 'Emma', 'David'])} ${getRandomElement(['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'])}`,
    source: getRandomElement(sources),
    category: template.category,
    tags: template.tickers,
    imageUrl: index % 3 === 0 ? `https://source.unsplash.com/800x400/?${template.category},finance` : undefined,
    publishedAt: getRandomDate(48),
    url: `https://example.com/news/${idCounter}`,
    sentiment: getSentiment(),
  }));
}

function generateDetailedContent(): string {
  return `This breaking news story continues to develop. Market analysts are closely monitoring the situation as it may have significant implications for investors and traders.

The announcement comes at a critical time for financial markets, with investors carefully weighing economic indicators and corporate performance data.

Industry experts suggest that this development could influence trading patterns in the coming weeks. Market participants are advised to stay informed and consult with financial advisors before making investment decisions.

Additional details are expected to emerge as the story develops. Stay tuned for updates.`;
}

export function generateSingleNews(): NewsArticle {
  const template = getRandomElement(newsTemplates);
  return {
    id: `news-${idCounter++}`,
    title: template.headline,
    summary: template.summary,
    content: `${template.summary}\n\n${generateDetailedContent()}`,
    author: `${getRandomElement(['John', 'Sarah', 'Michael', 'Emma', 'David'])} ${getRandomElement(['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'])}`,
    source: getRandomElement(sources),
    category: template.category,
    tags: template.tickers,
    imageUrl: Math.random() > 0.7 ? `https://source.unsplash.com/800x400/?${template.category},finance` : undefined,
    publishedAt: new Date(),
    url: `https://example.com/news/${idCounter}`,
    sentiment: getSentiment(),
  };
}
