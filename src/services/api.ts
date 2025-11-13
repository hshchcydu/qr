import axios from 'axios';
import type {
  NewsArticle,
  CalendarEvent,
  Post,
  Comment,
  Alert,
  ApiResponse,
  PaginatedResponse,
  NewsFilter,
} from '@/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// News API
export const newsApi = {
  getNews: async (
    filter?: NewsFilter,
    page = 1,
    pageSize = 20
  ): Promise<PaginatedResponse<NewsArticle>> => {
    const { data } = await api.get<PaginatedResponse<NewsArticle>>('/news', {
      params: { ...filter, page, pageSize },
    });
    return data;
  },

  getNewsById: async (id: string): Promise<NewsArticle> => {
    const { data } = await api.get<ApiResponse<NewsArticle>>(`/news/${id}`);
    return data.data;
  },

  searchNews: async (query: string): Promise<NewsArticle[]> => {
    const { data } = await api.get<ApiResponse<NewsArticle[]>>('/news/search', {
      params: { q: query },
    });
    return data.data;
  },
};

// Calendar API
export const calendarApi = {
  getEvents: async (
    startDate?: Date,
    endDate?: Date
  ): Promise<CalendarEvent[]> => {
    const { data } = await api.get<ApiResponse<CalendarEvent[]>>('/calendar', {
      params: {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      },
    });
    return data.data;
  },

  getEventById: async (id: string): Promise<CalendarEvent> => {
    const { data } = await api.get<ApiResponse<CalendarEvent>>(`/calendar/${id}`);
    return data.data;
  },
};

// Alerts API
export const alertsApi = {
  getAlerts: async (): Promise<Alert[]> => {
    const { data } = await api.get<ApiResponse<Alert[]>>('/alerts');
    return data.data;
  },

  createAlert: async (alert: Omit<Alert, 'id'>): Promise<Alert> => {
    const { data } = await api.post<ApiResponse<Alert>>('/alerts', alert);
    return data.data;
  },

  updateAlert: async (id: string, alert: Partial<Alert>): Promise<Alert> => {
    const { data } = await api.put<ApiResponse<Alert>>(`/alerts/${id}`, alert);
    return data.data;
  },

  deleteAlert: async (id: string): Promise<void> => {
    await api.delete(`/alerts/${id}`);
  },
};

// Community API
export const communityApi = {
  getPosts: async (
    category?: string,
    page = 1,
    pageSize = 20
  ): Promise<PaginatedResponse<Post>> => {
    const { data } = await api.get<PaginatedResponse<Post>>('/community/posts', {
      params: { category, page, pageSize },
    });
    return data;
  },

  getPostById: async (id: string): Promise<Post> => {
    const { data } = await api.get<ApiResponse<Post>>(`/community/posts/${id}`);
    return data.data;
  },

  createPost: async (post: Omit<Post, 'id'>): Promise<Post> => {
    const { data } = await api.post<ApiResponse<Post>>('/community/posts', post);
    return data.data;
  },

  likePost: async (id: string): Promise<void> => {
    await api.post(`/community/posts/${id}/like`);
  },

  getComments: async (postId: string): Promise<Comment[]> => {
    const { data } = await api.get<ApiResponse<Comment[]>>(
      `/community/posts/${postId}/comments`
    );
    return data.data;
  },

  createComment: async (
    postId: string,
    content: string
  ): Promise<Comment> => {
    const { data } = await api.post<ApiResponse<Comment>>(
      `/community/posts/${postId}/comments`,
      { content }
    );
    return data.data;
  },
};

export default api;
