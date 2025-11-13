// User types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  category: NewsCategory;
  tags: string[];
  imageUrl?: string;
  publishedAt: Date;
  url: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export type NewsCategory =
  | 'stocks'
  | 'crypto'
  | 'forex'
  | 'commodities'
  | 'economy'
  | 'earnings'
  | 'market-analysis'
  | 'ipo';

export interface NewsFilter {
  category?: NewsCategory;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
  searchQuery?: string;
}

// Calendar types
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  type: 'economic' | 'fed' | 'earnings' | 'announcement';
  start: Date;
  end: Date;
  importance: 'high' | 'medium' | 'low';
  previous?: string;
  expected?: string;
  actual?: string;
  source?: string;
  relatedTickers?: string[];
  isAlert: boolean;
}

export type EventType =
  | 'economic'
  | 'fed'
  | 'earnings'
  | 'announcement';

// Alert types
export interface Alert {
  id: string;
  userId: string;
  title: string;
  conditions: AlertCondition[];
  isActive: boolean;
  frequency: AlertFrequency;
  channels: AlertChannel[];
  createdAt: Date;
  lastTriggered?: Date;
}

export interface AlertCondition {
  type: 'price' | 'volume' | 'news' | 'keyword';
  operator: 'above' | 'below' | 'equals' | 'contains';
  value: string | number;
  symbol?: string;
}

export type AlertFrequency = 'realtime' | 'hourly' | 'daily';
export type AlertChannel = 'email' | 'push' | 'sms';

// Keyword Alert
export interface KeywordAlert {
  id: string;
  keyword: string;
  isActive: boolean;
  channels: AlertChannel[];
  createdAt: Date;
}

// Stock Alert
export interface StockAlert {
  id: string;
  symbol: string;
  companyName: string;
  type: 'price' | 'percentage' | 'volume' | 'earnings' | 'news';
  condition?: {
    operator: 'above' | 'below';
    value: number;
  };
  isActive: boolean;
  channels: AlertChannel[];
  createdAt: Date;
}

// Economic Indicator Alert
export interface EconomicIndicatorAlert {
  id: string;
  indicator: string;
  timing: 'before' | 'at';
  minutesBefore?: number;
  isActive: boolean;
  channels: AlertChannel[];
  createdAt: Date;
}

// Schedule Alert
export interface ScheduleAlert {
  id: string;
  type: 'daily-open' | 'daily-close' | 'weekly-review' | 'monthly-calendar';
  time?: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  isActive: boolean;
  channels: AlertChannel[];
  createdAt: Date;
}

// Alert History
export interface AlertHistoryItem {
  id: string;
  alertId: string;
  alertType: 'keyword' | 'stock' | 'economic' | 'schedule';
  title: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  triggeredAt: Date;
  data?: any;
}

// Community types
export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  userReputation?: number;
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: number;
  views: number;
  isUpvoted?: boolean;
  isDownvoted?: boolean;
  isBookmarked?: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PostCategory =
  | 'discussion'
  | 'analysis'
  | 'question'
  | 'news';

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  userReputation?: number;
  content: string;
  upvotes: number;
  downvotes: number;
  isUpvoted?: boolean;
  isDownvoted?: boolean;
  createdAt: Date;
  replies?: Comment[];
}

export interface UserProfile {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  reputation: number;
  postsCount: number;
  commentsCount: number;
  followers: number;
  following: number;
  joinedAt: Date;
  isFollowing?: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}
