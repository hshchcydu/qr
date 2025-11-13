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

// Community types
export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PostCategory =
  | 'discussion'
  | 'analysis'
  | 'question'
  | 'news'
  | 'education';

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  createdAt: Date;
  replies?: Comment[];
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
