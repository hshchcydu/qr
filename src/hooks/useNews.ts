import { useQuery } from '@tanstack/react-query';
import { newsApi } from '@/services/api';
import type { NewsFilter } from '@/types';

export const useNews = (filter?: NewsFilter, page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ['news', filter, page, pageSize],
    queryFn: () => newsApi.getNews(filter, page, pageSize),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useNewsById = (id: string) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => newsApi.getNewsById(id),
    enabled: !!id,
  });
};

export const useNewsSearch = (query: string) => {
  return useQuery({
    queryKey: ['news', 'search', query],
    queryFn: () => newsApi.searchNews(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5,
  });
};
