import { useQuery } from '@tanstack/react-query';
import { calendarApi } from '@/services/api';

export const useCalendarEvents = (startDate?: Date, endDate?: Date) => {
  return useQuery({
    queryKey: ['calendar', startDate, endDate],
    queryFn: () => calendarApi.getEvents(startDate, endDate),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useEventById = (id: string) => {
  return useQuery({
    queryKey: ['calendar', id],
    queryFn: () => calendarApi.getEventById(id),
    enabled: !!id,
  });
};
