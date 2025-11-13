import type { Comment } from '@/types';

const usernames = [
  'InvestorPro',
  'MarketWatcher',
  'DividendKing',
  'TechBull',
  'ValueSeeker',
  'GrowthInvestor',
  'QuantTrader',
  'OptionsGuru',
  'IndexFund',
  'CryptoWhale',
  'BearMarket',
  'BullishAF',
  'Contrarian',
  'PassiveIncome',
  'ActiveTrader',
];

const avatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=7',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=8',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(daysAgo: number): Date {
  const now = new Date();
  const randomDays = Math.random() * daysAgo;
  return new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
}

function getRandomReputation(): number {
  const ranges = [
    { min: 10, max: 100, weight: 0.4 },
    { min: 100, max: 500, weight: 0.3 },
    { min: 500, max: 2000, weight: 0.2 },
    { min: 2000, max: 10000, weight: 0.1 },
  ];

  const random = Math.random();
  let cumWeight = 0;

  for (const range of ranges) {
    cumWeight += range.weight;
    if (random <= cumWeight) {
      return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    }
  }

  return 100;
}

let commentIdCounter = 1;

const commentTemplates = [
  // Thoughtful analysis
  "Great analysis! I've been following this stock for a while and your points about the fundamentals are spot on. The valuation seems reasonable given the growth trajectory.",
  "I respectfully disagree. The market is already pricing in a lot of the future growth. P/E ratio is quite high compared to historical averages.",
  "This is exactly what I've been thinking. The risk/reward ratio here is excellent for long-term holders.",
  "Have you considered the macroeconomic headwinds? Rising rates could impact valuations significantly.",

  // Questions
  "What's your price target for this?",
  "How do you see the competitive landscape evolving?",
  "Can you elaborate on the margin expansion potential?",
  "What's your exit strategy if the thesis doesn't play out?",

  // Short responses
  "Completely agree!",
  "This aged well lol",
  "RemindMe! 6 months",
  "Thanks for sharing!",
  "Interesting perspective",

  // Detailed responses
  "I've done some DD on this and here's what I found: 1) Revenue growth is accelerating, 2) Management has a strong track record, 3) The moat is getting wider with each quarter. I'm bullish.",
  "The technical setup looks good too. We're testing a key support level and RSI is oversold. Could be a good entry point.",
  "I'm concerned about the insider selling we've seen recently. That's usually not a great sign, even if the fundamentals look good.",
  "The earnings call gave me a lot of confidence. Management seems very focused on profitable growth rather than just growth at any cost.",

  // Contrarian views
  "Everyone's bullish but I think there's significant downside risk here. The valuation makes no sense.",
  "I sold my position last week. Too much uncertainty right now.",
  "The sentiment is way too positive. Usually a contrarian indicator.",
  "I'm waiting for a better entry point. This could pull back 20-30%.",

  // Personal experience
  "I've been holding since 2020 and it's been my best performer. Not selling anytime soon.",
  "Made this mistake before - chasing momentum rarely works out.",
  "Learned my lesson with similar stocks. Taking profits here.",
  "This reminds me of the dot-com bubble. Be careful.",

  // Helpful resources
  "Here's a great article on this topic: [link]",
  "Check out the latest 10-K filing, it has more details on this.",
  "The investor presentation from last quarter addresses this question.",
  "I recommend reading up on their competitive advantages.",

  // Humor/Memes
  "To the moon! 🚀",
  "My wife's boyfriend is going to be so proud of me",
  "Sir, this is a Wendy's",
  "Apes together strong 🦍",
  "This is the way",
  "Diamond hands 💎🙌",
];

function generateReplies(postId: string, depth: number, maxDepth: number): Comment[] {
  if (depth >= maxDepth) return [];

  const numReplies = Math.random() < 0.6 ? 0 : Math.floor(Math.random() * 3) + 1;
  const replies: Comment[] = [];

  for (let i = 0; i < numReplies; i++) {
    const createdAt = getRandomDate(7);
    const upvotes = Math.floor(Math.random() * 50);
    const downvotes = Math.floor(Math.random() * 10);

    const comment: Comment = {
      id: `comment-${commentIdCounter++}`,
      postId,
      userId: `user-${Math.floor(Math.random() * 15) + 1}`,
      username: getRandomElement(usernames),
      userAvatar: getRandomElement(avatars),
      userReputation: getRandomReputation(),
      content: getRandomElement(commentTemplates),
      upvotes,
      downvotes,
      isUpvoted: false,
      isDownvoted: false,
      createdAt,
      replies: [],
    };

    // Recursively generate nested replies
    comment.replies = generateReplies(postId, depth + 1, maxDepth);

    replies.push(comment);
  }

  return replies;
}

export function generateMockComments(postId: string, count: number = 10): Comment[] {
  const comments: Comment[] = [];

  for (let i = 0; i < count; i++) {
    const createdAt = getRandomDate(10);
    const upvotes = Math.floor(Math.random() * 200);
    const downvotes = Math.floor(Math.random() * 40);

    const comment: Comment = {
      id: `comment-${commentIdCounter++}`,
      postId,
      userId: `user-${Math.floor(Math.random() * 15) + 1}`,
      username: getRandomElement(usernames),
      userAvatar: getRandomElement(avatars),
      userReputation: getRandomReputation(),
      content: getRandomElement(commentTemplates),
      upvotes,
      downvotes,
      isUpvoted: false,
      isDownvoted: false,
      createdAt,
      replies: [],
    };

    // Generate nested replies (max depth of 3)
    comment.replies = generateReplies(postId, 1, 3);

    comments.push(comment);
  }

  return comments;
}
