import type { CalendarEvent, EventType } from '@/types';
import { addDays, getStartOfDay, getEndOfDay } from '@/utils/dateTime';

/**
 * Calendar API Service
 * Handles all calendar/event-related API calls
 */

const API_BASE_URL = process.env.VITE_API_URL || '/api';
const USE_MOCK_DATA = true;

/**
 * Generate mock calendar events
 */
function generateMockEvent(index: number, date: Date): CalendarEvent {
  const importanceLevels: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];

  const eventTemplates = [
    {
      title: 'Initial Jobless Claims',
      description: 'Weekly unemployment insurance claims report',
      type: 'economic' as EventType,
      source: 'Department of Labor',
    },
    {
      title: 'CPI Report',
      description: 'Consumer Price Index inflation data release',
      type: 'economic' as EventType,
      source: 'Bureau of Labor Statistics',
    },
    {
      title: 'Fed Interest Rate Decision',
      description: 'Federal Open Market Committee meeting',
      type: 'fed' as EventType,
      source: 'Federal Reserve',
    },
    {
      title: 'Apple Earnings Call',
      description: 'Quarterly earnings report and investor call',
      type: 'earnings' as EventType,
      relatedTickers: ['AAPL'],
    },
    {
      title: 'GDP Report',
      description: 'Quarterly Gross Domestic Product figures',
      type: 'economic' as EventType,
      source: 'Bureau of Economic Analysis',
    },
    {
      title: 'Fed Chair Speech',
      description: 'Remarks on monetary policy and economic outlook',
      type: 'fed' as EventType,
      source: 'Federal Reserve',
    },
    {
      title: 'Retail Sales Data',
      description: 'Monthly retail sales figures',
      type: 'economic' as EventType,
      source: 'Census Bureau',
    },
    {
      title: 'Tesla Production Numbers',
      description: 'Quarterly production and delivery report',
      type: 'announcement' as EventType,
      relatedTickers: ['TSLA'],
    },
  ];

  const template = eventTemplates[index % eventTemplates.length];
  const hour = 8 + Math.floor(Math.random() * 8); // 8 AM to 4 PM
  const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

  const start = new Date(date);
  start.setHours(hour, minute, 0, 0);

  const end = new Date(start);
  end.setHours(start.getHours() + (Math.random() > 0.7 ? 1 : 0), start.getMinutes() + 30, 0, 0);

  return {
    id: `event-${index}-${date.getTime()}`,
    ...template,
    start,
    end,
    importance: importanceLevels[Math.floor(Math.random() * importanceLevels.length)],
    expected: Math.random() > 0.5 ? `${(Math.random() * 10).toFixed(1)}%` : undefined,
    previous: Math.random() > 0.5 ? `${(Math.random() * 10).toFixed(1)}%` : undefined,
    actual: Math.random() > 0.7 ? `${(Math.random() * 10).toFixed(1)}%` : undefined,
    isAlert: Math.random() > 0.6,
  };
}

export const calendarService = {
  /**
   * Get events for a date range
   */
  async getEvents(startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    const start = startDate || getStartOfDay();
    const end = endDate || getEndOfDay(addDays(start, 30));

    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const events: CalendarEvent[] = [];
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      // Generate 1-3 events per day
      for (let day = 0; day < totalDays; day++) {
        const currentDate = addDays(start, day);
        const eventsPerDay = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < eventsPerDay; i++) {
          events.push(generateMockEvent(day * 3 + i, currentDate));
        }
      }

      return events.sort((a, b) => a.start.getTime() - b.start.getTime());
    }

    const response = await fetch(
      `${API_BASE_URL}/calendar/events?start=${start.toISOString()}&end=${end.toISOString()}`
    );
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  },

  /**
   * Get events for today
   */
  async getTodayEvents(): Promise<CalendarEvent[]> {
    const start = getStartOfDay();
    const end = getEndOfDay();
    return this.getEvents(start, end);
  },

  /**
   * Get upcoming events (next 7 days)
   */
  async getUpcoming(days: number = 7): Promise<CalendarEvent[]> {
    const start = new Date();
    const end = addDays(start, days);
    return this.getEvents(start, end);
  },

  /**
   * Get events by type
   */
  async getByType(type: EventType, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    const events = await this.getEvents(startDate, endDate);
    return events.filter((event) => event.type === type);
  },

  /**
   * Get high importance events
   */
  async getHighImportance(startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    const events = await this.getEvents(startDate, endDate);
    return events.filter((event) => event.importance === 'high');
  },

  /**
   * Get events by ticker
   */
  async getByTicker(ticker: string, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    const events = await this.getEvents(startDate, endDate);
    return events.filter((event) => event.relatedTickers?.includes(ticker));
  },

  /**
   * Get single event by ID
   */
  async getById(id: string): Promise<CalendarEvent> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return generateMockEvent(parseInt(id) || 1, new Date());
    }

    const response = await fetch(`${API_BASE_URL}/calendar/events/${id}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    return response.json();
  },

  /**
   * Create a new event (user-created)
   */
  async createEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        ...event,
        id: `event-${Date.now()}`,
      };
    }

    const response = await fetch(`${API_BASE_URL}/calendar/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error('Failed to create event');
    return response.json();
  },

  /**
   * Update an event
   */
  async updateEvent(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        ...generateMockEvent(1, new Date()),
        id,
        ...updates,
      };
    }

    const response = await fetch(`${API_BASE_URL}/calendar/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update event');
    return response.json();
  },

  /**
   * Delete an event
   */
  async deleteEvent(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return;
    }

    const response = await fetch(`${API_BASE_URL}/calendar/events/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete event');
  },
};
