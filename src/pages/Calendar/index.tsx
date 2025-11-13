import { useState, useMemo, useCallback } from 'react';
import CalendarComponent from '@/components/calendar/Calendar';
import CalendarFilters, { type EventTypeFilter, type ImportanceFilter } from '@/components/calendar/CalendarFilters';
import EventModal from '@/components/calendar/EventModal';
import EventCard from '@/components/calendar/EventCard';
import { generateCalendarEvents } from '@/utils/mockCalendarEvents';
import type { CalendarEvent } from '@/types';

const CalendarPage = () => {
  const [allEvents] = useState<CalendarEvent[]>(() => generateCalendarEvents());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<EventTypeFilter>('all');
  const [selectedImportance, setSelectedImportance] = useState<ImportanceFilter>('all');
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Filter by type
      if (selectedType !== 'all' && event.type !== selectedType) {
        return false;
      }

      // Filter by importance
      if (selectedImportance !== 'all' && event.importance !== selectedImportance) {
        return false;
      }

      return true;
    });
  }, [allEvents, selectedType, selectedImportance]);

  // Get upcoming events (next 7 days)
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return filteredEvents
      .filter((event) => {
        const eventDate = new Date(event.start);
        return eventDate >= now && eventDate <= next7Days;
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 6);
  }, [filteredEvents]);

  // Calculate event counts for filters
  const eventCounts = useMemo(() => {
    return {
      all: allEvents.length,
      economic: allEvents.filter((e) => e.type === 'economic').length,
      fed: allEvents.filter((e) => e.type === 'fed').length,
      earnings: allEvents.filter((e) => e.type === 'earnings').length,
      announcement: allEvents.filter((e) => e.type === 'announcement').length,
    };
  }, [allEvents]);

  // Handle event selection
  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  // Handle event hover
  const handleEventHover = useCallback((_event: CalendarEvent | null) => {
    // Could be used for tooltip or preview in the future
  }, []);

  // Handle set alert
  const handleSetAlert = useCallback((event: CalendarEvent) => {
    // Toggle alert status
    console.log('Set alert for event:', event.title);
    // In a real app, this would update the event in state/backend
  }, []);

  // Handle export to Google Calendar
  const handleExportToGoogle = useCallback((event: CalendarEvent) => {
    console.log('Exported to Google Calendar:', event.title);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Investment Calendar
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track economic indicators, Fed events, earnings calls, and market announcements
            </p>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {filteredEvents.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Events</div>
            </div>
            <div className="text-center px-4 py-2 bg-positive-50 dark:bg-positive-900/20 rounded-lg">
              <div className="text-2xl font-bold text-positive-600 dark:text-positive-400">
                {filteredEvents.filter(e => e.importance === 'high').length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">High Priority</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <CalendarFilters
        selectedType={selectedType}
        selectedImportance={selectedImportance}
        selectedTimezone={selectedTimezone}
        onTypeChange={setSelectedType}
        onImportanceChange={setSelectedImportance}
        onTimezoneChange={setSelectedTimezone}
        eventCounts={eventCounts}
      />

      {/* Calendar */}
      <div className="mb-8">
        <CalendarComponent
          events={filteredEvents}
          onSelectEvent={handleSelectEvent}
          onEventHover={handleEventHover}
        />
      </div>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSetAlert={handleSetAlert}
        onExportToGoogleCalendar={handleExportToGoogle}
      />

      {/* Upcoming Events Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Upcoming This Week
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Next 7 days
          </span>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} onClick={() => handleSelectEvent(event)}>
                <EventCard event={event} onSetAlert={handleSetAlert} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No upcoming events
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters to see more events.
            </p>
          </div>
        )}
      </div>

      {/* High Priority Events */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔴</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            High Priority Events
          </h2>
        </div>

        {filteredEvents.filter(e => e.importance === 'high').length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents
              .filter(e => e.importance === 'high')
              .slice(0, 6)
              .map((event) => (
                <div key={event.id} onClick={() => handleSelectEvent(event)}>
                  <EventCard event={event} onSetAlert={handleSetAlert} />
                </div>
              ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-secondary-700 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No high priority events
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All clear for now!
            </p>
          </div>
        )}
      </div>

      {/* Timezone Note */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              Timezone Information
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              All times are displayed in {selectedTimezone.replace('_', ' ')} timezone. You can change this in the filters above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
