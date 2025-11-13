import type { Post, Comment } from '@/types';

const usernames = [
  'WallStreetWizard',
  'BullMarketBob',
  'BearTrader',
  'DividendKing',
  'TechInvestor',
  'ValueHunter',
  'MomentumTrader',
  'OptionsGuru',
  'IndexFundFan',
  'CryptoWhale',
  'GrowthSeeker',
  'BlueChipBill',
  'SmallCapScout',
  'MarketAnalyst',
  'ChartMaster',
];

const avatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
];

const postTemplates = [
  {
    title: 'NVDA earnings beat expectations - time to buy more?',
    content: 'NVIDIA just crushed their Q4 earnings with $22.1B revenue, up 265% YoY. Data center revenue hit $18.4B. Their guidance for Q1 is equally impressive at $24B. With AI demand showing no signs of slowing, is this the dip to load up more shares? Current P/E is 70, which seems high, but growth justifies it IMO. What\'s your take?',
    category: 'discussion' as const,
    tags: ['NVDA', 'earnings', 'AI', 'semiconductors'],
    upvotes: 847,
    comments: 129,
    views: 5234,
  },
  {
    title: 'Why I\'m bearish on Tesla despite the recent rally',
    content: 'Unpopular opinion: TSLA is overvalued at current prices. Yes, they delivered 1.8M vehicles in 2023, but margins are compressing (automotive gross margin down to 17.6%). Competition from BYD, NIO, and legacy automakers is intensifying. The robotaxi narrative won\'t materialize for years. FSD is still Level 2. What am I missing here?',
    category: 'analysis' as const,
    tags: ['TSLA', 'EV', 'bearish'],
    upvotes: 234,
    comments: 312,
    views: 3892,
  },
  {
    title: 'Should I sell my Apple shares after this run-up?',
    content: 'I\'ve been holding AAPL since $120 (pre-split) and it\'s been great. But with the recent surge to $195, I\'m thinking about taking some profits. My position is now 35% of my portfolio. Services revenue is strong, but iPhone sales growth is slowing. Vision Pro is interesting but won\'t move the needle for years. Thoughts?',
    category: 'question' as const,
    tags: ['AAPL', 'portfolio', 'profit-taking'],
    upvotes: 156,
    comments: 87,
    views: 2145,
  },
  {
    title: 'Fed signals three rate cuts in 2024 - What this means for markets',
    content: 'The Fed just indicated they\'re planning three 25bps cuts this year, starting in June. This is more dovish than expected. Historically, rate cut cycles have been bullish for equities, especially growth stocks. Tech should benefit from lower borrowing costs. REITs and utilities are also attractive. Bond yields dropping. Time to rotate portfolios?',
    category: 'news' as const,
    tags: ['Fed', 'rates', 'macro', 'SPY'],
    upvotes: 623,
    comments: 201,
    views: 7891,
  },
  {
    title: 'My DD on Palantir - Why PLTR is going to $50',
    content: 'After deep diving into PLTR, I\'m incredibly bullish. Here\'s why:\n\n1. Government contracts growing 30% YoY\n2. Commercial revenue acceleration (40% growth)\n3. Operating margin expanding to 30%\n4. AI Platform (AIP) getting serious traction\n5. Rule of 40 score is 60+\n\nThey\'re basically building the AI infrastructure for enterprises. Q4 results next week. Long 500 shares @ $17.80 average.',
    category: 'analysis' as const,
    tags: ['PLTR', 'AI', 'DD', 'bullish'],
    upvotes: 445,
    comments: 178,
    views: 4123,
  },
  {
    title: 'Anyone else worried about the Magnificent 7 concentration risk?',
    content: 'The top 7 stocks (AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA) now make up 30% of the S&P 500. This is unprecedented concentration. If these stocks correct 20%, the entire index could drop 6%. I\'m starting to diversify into small-caps and international. Am I being too cautious or is this a real concern?',
    category: 'discussion' as const,
    tags: ['SPY', 'risk', 'diversification', 'Mag7'],
    upvotes: 512,
    comments: 145,
    views: 3567,
  },
  {
    title: 'Why VOO is all you need - Change my mind',
    content: 'Unpopular opinion in a stock-picking sub, but hear me out. VOO (Vanguard S&P 500 ETF) has:\n- 0.03% expense ratio\n- Consistently beats 90% of active managers\n- Built-in diversification\n- Tax efficiency\n- No emotional trading\n\nWhy waste time picking stocks when you can DCA into VOO and chill? Buffett recommends it. Data supports it. Am I wrong?',
    category: 'discussion' as const,
    tags: ['VOO', 'ETF', 'passive', 'indexing'],
    upvotes: 892,
    comments: 267,
    views: 6234,
  },
  {
    title: 'AMD vs NVDA - Which is the better AI play for 2024?',
    content: 'Both are crushing it in AI, but which has more upside?\n\n**AMD (Currently $186)**\n- MI300 chips gaining traction\n- Lower valuation (P/E of 62 vs NVDA\'s 70)\n- More room to run?\n- Microsoft partnership\n\n**NVDA (Currently $726)**\n- Market leader in AI chips\n- CUDA moat is real\n- Better margins\n- Premium valuation justified?\n\nI\'m leaning AMD for better risk/reward. Thoughts?',
    category: 'analysis' as const,
    tags: ['AMD', 'NVDA', 'AI', 'comparison'],
    upvotes: 378,
    comments: 156,
    views: 3891,
  },
  {
    title: 'Just got assigned on my AAPL puts - now what?',
    content: 'Sold $185 cash-secured puts on AAPL last month thinking it wouldn\'t go that low. Well, it did. Now I own 100 shares at $185 (current price $183). Should I:\n\nA) Hold and sell covered calls\nB) Take the L and sell\nC) Average down and buy more\nD) Sell at breakeven and move on\n\nFirst time getting assigned. Lessons learned. Help appreciated!',
    category: 'question' as const,
    tags: ['AAPL', 'options', 'puts', 'assignment'],
    upvotes: 234,
    comments: 98,
    views: 2456,
  },
  {
    title: 'Microsoft is quietly building the AI empire',
    content: 'While everyone focuses on NVDA, MSFT is the real winner:\n\n✅ $13B investment in OpenAI (ChatGPT)\n✅ Azure AI growing 50%+ YoY\n✅ Copilot across all products ($30/user/month)\n✅ Gaming division printing money\n✅ Enterprise moat is unbreakable\n✅ Dividend aristocrat\n\nP/E of 36 is reasonable for this quality. This is my largest position. Long-term hold.',
    category: 'analysis' as const,
    tags: ['MSFT', 'AI', 'Azure', 'bullish'],
    upvotes: 567,
    comments: 124,
    views: 4567,
  },
  {
    title: 'Real estate stocks getting hammered - opportunity or trap?',
    content: 'REITs are down 20-30% this year due to higher rates. But if the Fed cuts rates, these could bounce hard:\n\n- O (Realty Income): 5.8% yield\n- VNQ (Vanguard REIT ETF): 4.2% yield\n- PLD (Prologis): Industrial REITs solid\n\nAre these value plays or value traps? Commercial real estate concerns are real, but residential and industrial look okay. Seeking contrarian opinions.',
    category: 'discussion' as const,
    tags: ['REITs', 'real-estate', 'dividend', 'rates'],
    upvotes: 289,
    comments: 67,
    views: 1923,
  },
  {
    title: 'Sold everything and going cash - here\'s why',
    content: 'I know timing the market is impossible, but hear me out:\n\n1. S&P at all-time highs\n2. Shiller PE at 33 (historically expensive)\n3. Inverted yield curve for 12+ months\n4. Commercial real estate crisis brewing\n5. Geopolitical tensions escalating\n\nI\'d rather miss gains than lose principal. Sitting 80% cash, waiting for a 15-20% correction. Call me crazy, but I\'m sleeping better.',
    category: 'discussion' as const,
    tags: ['market-timing', 'cash', 'bearish', 'SPY'],
    upvotes: 145,
    comments: 287,
    views: 4123,
  },
  {
    title: 'Google is criminally undervalued - here\'s the math',
    content: 'GOOGL trading at 24x forward P/E while growing 10%+. Let me break down why it\'s cheap:\n\n**Revenue Streams:**\n- Search: $175B (still growing)\n- YouTube: $30B (fastest growing)\n- Cloud: $33B (profitable now)\n- Other Bets: Waymo worth $30B+\n\n**Financials:**\n- $110B cash on balance sheet\n- 30% operating margins\n- $70B free cash flow\n\nMeta trades at 25x, MSFT at 36x. GOOGL should trade at 28x minimum. Target: $175.',
    category: 'analysis' as const,
    tags: ['GOOGL', 'valuation', 'bullish', 'DD'],
    upvotes: 678,
    comments: 143,
    views: 5234,
  },
  {
    title: 'Covered calls strategy - monthly income from stocks',
    content: 'Been running the wheel strategy for 6 months now. Here\'s my experience:\n\n**Stocks used:** AAPL, MSFT, QQQ\n**Strategy:** Sell 30-45 DTE calls at 0.30 delta\n**Results:** 2-3% monthly return\n**Pros:** Consistent income, reduces cost basis\n**Cons:** Capped upside, taxes on short-term gains\n\nAnyone else doing this? What strikes/deltas work best for you? Any tips?',
    category: 'discussion' as const,
    tags: ['options', 'covered-calls', 'income', 'theta-gang'],
    upvotes: 423,
    comments: 112,
    views: 3456,
  },
  {
    title: 'Meta is back - Zuckerberg\'s "year of efficiency" worked',
    content: 'META up 150% in 2023. Reality Labs losses decreasing. AI recommendations increasing engagement. Threads launching. WhatsApp monetization starting.\n\nLaid off 21,000 people, margins expanded from 25% to 35%. Operating leverage kicking in. Reels now generating revenue. Trading at 23x P/E with 20% growth.\n\nI was a hater but the turnaround is real. Anyone else rotating back into META?',
    category: 'analysis' as const,
    tags: ['META', 'turnaround', 'Zuckerberg', 'social-media'],
    upvotes: 534,
    comments: 156,
    views: 4123,
  },
  {
    title: 'What stocks are you buying if we get a 20% correction?',
    content: 'Always good to have a shopping list ready. Mine:\n\n1. MSFT - quality never goes on sale\n2. GOOGL - would load up under $125\n3. V/MA - duopoly with pricing power\n4. COST - recession-proof\n5. BRK.B - Buffett\'s got cash to deploy\n6. QQQ - for broad tech exposure\n\nWhat\'s on your watchlist? Looking for ideas to add.',
    category: 'discussion' as const,
    tags: ['correction', 'watchlist', 'buying-opportunity'],
    upvotes: 712,
    comments: 234,
    views: 5678,
  },
  {
    title: 'Bitcoin ETF approval - should investors care?',
    content: 'SEC approved spot Bitcoin ETFs (IBIT, FBTC, GBTC). Now anyone can get BTC exposure in their brokerage account. No more dealing with exchanges, wallets, or security concerns.\n\nBut should traditional equity investors allocate to BTC? Arguments:\n\n**Pro:** Inflation hedge, uncorrelated asset, institutional adoption\n**Con:** Still speculative, no cash flows, regulatory risk\n\nI\'m doing 2% allocation max. Thoughts?',
    category: 'discussion' as const,
    tags: ['Bitcoin', 'ETF', 'crypto', 'allocation'],
    upvotes: 445,
    comments: 189,
    views: 3891,
  },
  {
    title: 'My wife wants me to stop day trading - need advice',
    content: 'Been day trading for 8 months. Down $15K. She\'s furious and wants me to stop. I keep saying "I\'m learning" but the losses are piling up. Using margin, mostly 0DTE SPY options.\n\nI know I should switch to long-term investing but the dopamine rush is real. Anyone been through this? How did you transition to boring index investing? Need help before I blow up my marriage AND my account.',
    category: 'question' as const,
    tags: ['day-trading', 'losses', 'advice', 'options'],
    upvotes: 892,
    comments: 312,
    views: 8234,
  },
  {
    title: 'Dividend growth investing - my 5-year results',
    content: 'Started DGI strategy in 2019 with $50K. Now at $85K with $2,800/year in dividends. CAGR of 11.2% including dividends.\n\n**Holdings:**\n- JNJ (4.5% position)\n- PG (5.2%)\n- MSFT (8.1%)\n- AAPL (6.7%)\n- V (7.3%)\n\n**Lessons:**\n1. Reinvest dividends\n2. Focus on dividend growth, not just yield\n3. Quality > yield\n4. Be patient\n\nBoring but it works. AMA.',
    category: 'analysis' as const,
    tags: ['dividend', 'DGI', 'passive-income', 'long-term'],
    upvotes: 623,
    comments: 134,
    views: 4567,
  },
  {
    title: 'Why I sold all my growth stocks and went value',
    content: 'Rotation from growth to value is happening. Tech down, financials up. Here\'s why I\'m switching:\n\n**From:** NVDA, TSLA, PLTR, SNOW\n**To:** JPM, BAC, XLF, KRE\n\nRate cuts benefit banks (steeper yield curve). Valuations are reasonable (12-15x P/E). Dividends provide downside protection. Growth stocks are priced for perfection.\n\nCounterargument: Don\'t fight the Fed. But I think 2024 is value\'s year. Thoughts?',
    category: 'discussion' as const,
    tags: ['value', 'growth', 'rotation', 'banks'],
    upvotes: 367,
    comments: 145,
    views: 3234,
  },
  {
    title: 'Costco at $750 - is it too expensive now?',
    content: 'COST has been on a tear. P/E of 50 seems insane for a retailer. But:\n\n- Membership renewal rate: 93%\n- Same-store sales growth: 5%\n- Member count growing\n- Expansion into new markets\n- Pricing power\n\nIt\'s never been "cheap" but it keeps going up. Growth at reasonable price (GARP)? Or just expensive? I want to add but struggling with valuation.',
    category: 'question' as const,
    tags: ['COST', 'valuation', 'retail', 'GARP'],
    upvotes: 234,
    comments: 87,
    views: 2456,
  },
  {
    title: 'Chinese stocks - gambling or opportunity?',
    content: 'BABA, JD, PDD are dirt cheap on paper. BABA trading at 8x P/E with $73B in cash. But Chinese govt risk is real:\n\n**Risks:**\n- Regulatory crackdowns\n- VIE structure (you don\'t really own the company)\n- Geopolitical tensions\n- Delisting threats\n\n**Opportunity:**\n- Valuations are absurdly low\n- Stimulus coming\n- Consumer spending recovering\n\nI\'m tempted to throw 3-5% at BABA. Talk me out of it?',
    category: 'discussion' as const,
    tags: ['BABA', 'China', 'risk', 'international'],
    upvotes: 445,
    comments: 178,
    views: 3567,
  },
  {
    title: 'My all-weather portfolio - critique please',
    content: 'Trying to build a Ray Dalio-inspired portfolio:\n\n- 40% Stocks (VTI, QQQ)\n- 40% Bonds (TLT, BND)\n- 15% Gold (GLD)\n- 5% Commodities (DBC)\n\nGoal: Minimize drawdowns, steady returns. Backtested 8% annual return with 12% max drawdown. Better than 60/40.\n\nAm I missing something? Too conservative for a 35-year-old? Open to feedback.',
    category: 'question' as const,
    tags: ['portfolio', 'all-weather', 'allocation', 'risk-parity'],
    upvotes: 334,
    comments: 123,
    views: 2891,
  },
  {
    title: 'Emerging markets are the play for the next decade',
    content: 'Everyone\'s focused on US stocks, but EM is where the growth is:\n\n- India: 6-7% GDP growth\n- Vietnam: Manufacturing moving from China\n- Brazil: Commodity supercycle\n- Indonesia: Young population\n\nVWO (EM ETF) trading at 12x P/E vs 21x for SPY. Dividend yield of 3.5%. Currency risk is real but diversification benefits are huge. 15-20% allocation makes sense.',
    category: 'analysis' as const,
    tags: ['emerging-markets', 'international', 'VWO', 'diversification'],
    upvotes: 267,
    comments: 98,
    views: 2345,
  },
  {
    title: 'How to handle a 6-figure loss - my experience',
    content: 'Lost $120K last year on bad options trades. Went from $250K to $130K. Thought I was a genius in 2021, got humbled hard in 2022-23.\n\n**What I learned:**\n1. Don\'t use margin on speculative plays\n2. Position sizing matters\n3. Options are not free money\n4. Stick to your strategy\n5. Pride comes before the fall\n\nNow doing boring index investing. Account back to $165K. Slow and steady. Don\'t be me.',
    category: 'discussion' as const,
    tags: ['losses', 'lessons', 'options', 'margin'],
    upvotes: 1234,
    comments: 267,
    views: 9876,
  },
  {
    title: 'Small cap stocks are setting up for a huge run',
    content: 'Russell 2000 (IWM) has underperformed SPY by 30% over 3 years. Historically, this mean reverts. If Fed cuts rates, small caps should outperform (they\'re more leveraged to lower rates).\n\nLooking at:\n- AVGO (semiconductors)\n- CRWD (cybersecurity)\n- DDOG (cloud monitoring)\n- NET (edge computing)\n\nMid/small cap tech especially. Thoughts on the rotation trade?',
    category: 'analysis' as const,
    tags: ['small-cap', 'IWM', 'rotation', 'rates'],
    upvotes: 478,
    comments: 134,
    views: 3456,
  },
  {
    title: 'Energy stocks - are we in a supercycle?',
    content: 'XLE up 50% in 18 months. Oil at $80. Underinvestment in production + growing demand = structural supply shortage?\n\n**Bulls say:**\n- Years of underinvestment\n- Demand growing in Asia\n- Green transition takes decades\n- OPEC+ disciplined\n\n**Bears say:**\n- Recession will kill demand\n- EVs reducing oil consumption\n- Renewables scaling fast\n\nI\'m long XOM, CVX. Hedging with some clean energy. Your take?',
    category: 'discussion' as const,
    tags: ['energy', 'oil', 'XLE', 'commodities'],
    upvotes: 345,
    comments: 112,
    views: 2678,
  },
  {
    title: 'Target date funds vs DIY portfolio - which is better?',
    content: 'Debate for my 401k. Current options:\n\n**Option A:** Vanguard Target 2055 Fund\n- Set it and forget it\n- Auto-rebalancing\n- 0.15% expense ratio\n- Glide path to bonds over time\n\n**Option B:** DIY 3-fund portfolio\n- 70% VTSAX\n- 20% VTIAX\n- 10% VBTLX\n- More control\n- Slightly lower fees\n\nI\'m leaning target date for simplicity. Am I leaving money on the table?',
    category: 'question' as const,
    tags: ['401k', 'target-date', 'retirement', 'passive'],
    upvotes: 289,
    comments: 87,
    views: 2123,
  },
  {
    title: 'Semiconductor shortage over - time to sell chip stocks?',
    content: 'Chip shortage resolved. Inventory building. PC sales declining. Auto chip demand normalizing.\n\nDoes this mean the semiconductor trade is over? Or is AI demand enough to sustain valuations?\n\n**Concerned about:**\n- NVDA: AI hype priced in?\n- AMD: Competition intensifying\n- INTC: Turnaround story failing?\n\n**Still bullish on:**\n- ASML: Pick and shovel play\n- TSM: Irreplaceable foundry\n\nSeeking diverse opinions. Hold or reduce?',
    category: 'discussion' as const,
    tags: ['semiconductors', 'NVDA', 'AMD', 'chips'],
    upvotes: 423,
    comments: 145,
    views: 3567,
  },
  {
    title: 'Why young investors should embrace risk',
    content: 'I see too many 25-year-olds with 60/40 portfolios. You have 40 years until retirement. This is the time to be aggressive!\n\n**My allocation at 27:**\n- 95% Stocks (mostly growth)\n- 5% Crypto\n- 0% Bonds\n\nTime in market > timing market. Compound growth is powerful. You can afford volatility at this age. Max out IRA/401k first, then taxable.\n\nAm I too aggressive or appropriately positioned?',
    category: 'analysis' as const,
    tags: ['young-investors', 'risk', 'allocation', 'growth'],
    upvotes: 756,
    comments: 189,
    views: 4789,
  },
  {
    title: 'Bank stocks after the regional banking crisis',
    content: 'SVB, Signature Bank collapsed. First Republic taken over. KRE (regional bank ETF) down 30%. But now recovering.\n\nOpportunity in beaten-down regionals like:\n- JPM: Too big to fail\n- BAC: Clean balance sheet\n- WFC: Turnaround story\n\nOr avoid banks entirely and stick with tech? Interest rate sensitivity is scary. Seeking opinions from both bulls and bears.',
    category: 'question' as const,
    tags: ['banks', 'financial', 'crisis', 'regional'],
    upvotes: 512,
    comments: 167,
    views: 3892,
  },
  {
    title: 'The case for international diversification',
    content: 'US stocks have crushed it for 15 years. But mean reversion is real. History shows leadership rotates:\n\n**Why international now:**\n- Cheaper valuations (13x P/E vs 21x US)\n- US dollar weakening\n- Europe/Asia recovering\n- Diversification benefits\n\nVXUS (total international) allocation makes sense. Even Bogle admitted he was wrong about avoiding international.\n\n20-30% allocation reasonable? Or just stick with VTI?',
    category: 'discussion' as const,
    tags: ['international', 'VXUS', 'diversification', 'valuation'],
    upvotes: 389,
    comments: 124,
    views: 2891,
  },
];

let postIdCounter = 1;
let commentIdCounter = 1;

function getRandomDate(daysAgo: number): Date {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysAgo);
  const randomHours = Math.floor(Math.random() * 24);
  return new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000 - randomHours * 60 * 60 * 1000);
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomReputation(): number {
  return Math.floor(Math.random() * 10000) + 100;
}

export function generateMockPosts(): Post[] {
  return postTemplates.map((template) => {
    const createdAt = getRandomDate(30);
    return {
      id: `post-${postIdCounter++}`,
      userId: `user-${Math.floor(Math.random() * 15) + 1}`,
      username: getRandomElement(usernames),
      userAvatar: getRandomElement(avatars),
      userReputation: getRandomReputation(),
      title: template.title,
      content: template.content,
      category: template.category,
      tags: template.tags,
      upvotes: template.upvotes + Math.floor(Math.random() * 200),
      downvotes: Math.floor(Math.random() * 50),
      comments: template.comments + Math.floor(Math.random() * 20),
      views: template.views + Math.floor(Math.random() * 1000),
      isUpvoted: Math.random() > 0.8,
      isDownvoted: false,
      isBookmarked: Math.random() > 0.9,
      createdAt,
      updatedAt: createdAt,
    };
  });
}

export function generateMockComments(postId: string, count: number = 5): Comment[] {
  const comments: Comment[] = [];
  const commentTexts = [
    'Great analysis! I agree with your points about the valuation.',
    'Interesting perspective, but have you considered the competitive landscape?',
    'I\'m bullish on this one too. Just added to my position yesterday.',
    'Not sure I agree. The fundamentals don\'t support this thesis IMO.',
    'Thanks for sharing! This confirms my bias lol.',
    'Can you elaborate on the revenue projections?',
    'Sold all my shares last week. Wish I held now!',
    'RemindMe! 6 months',
    'Definitely keeping an eye on this. Thanks for the DD.',
    'This is exactly what I needed to hear. Going all in! JK... maybe 5% allocation.',
    'The technicals also support your thesis. Broke above resistance.',
    'Bear case: management team is questionable. Thoughts?',
    'I\'ve been saying this for months! Finally someone gets it.',
    'Risk/reward doesn\'t seem favorable at current prices.',
    'Added to my watchlist. Waiting for a dip to enter.',
  ];

  for (let i = 0; i < count; i++) {
    const comment: Comment = {
      id: `comment-${commentIdCounter++}`,
      postId,
      userId: `user-${Math.floor(Math.random() * 15) + 1}`,
      username: getRandomElement(usernames),
      userAvatar: getRandomElement(avatars),
      userReputation: getRandomReputation(),
      content: getRandomElement(commentTexts),
      upvotes: Math.floor(Math.random() * 50),
      downvotes: Math.floor(Math.random() * 10),
      isUpvoted: Math.random() > 0.9,
      isDownvoted: false,
      createdAt: getRandomDate(20),
    };

    // Add replies to some comments
    if (Math.random() > 0.7 && i < count - 1) {
      comment.replies = [
        {
          id: `comment-${commentIdCounter++}`,
          postId,
          userId: `user-${Math.floor(Math.random() * 15) + 1}`,
          username: getRandomElement(usernames),
          userAvatar: getRandomElement(avatars),
          userReputation: getRandomReputation(),
          content: getRandomElement([
            'Exactly! Well said.',
            'I see your point, but...',
            'Can you provide a source for this?',
            'This is the way.',
            'Disagree. Here\'s why...',
          ]),
          upvotes: Math.floor(Math.random() * 20),
          downvotes: Math.floor(Math.random() * 5),
          isUpvoted: false,
          isDownvoted: false,
          createdAt: getRandomDate(15),
        },
      ];
    }

    comments.push(comment);
  }

  return comments;
}
