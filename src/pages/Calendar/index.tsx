import { useState } from 'react';
import { useCalendarEvents } from '@/hooks/useCalendar';
import Calendar from '@/components/calendar/Calendar';
import EventCard from '@/components/calendar/EventCard';
import { isSameDay } from 'date-fns';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data: events, isLoading } = useCalendarEvents();

  const selectedDateEvents = selectedDate
    ? events?.filter((event) => isSameDay(new Date(event.date), selectedDate))
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Economic Calendar</h1>
        <p className="text-gray-600">
          Track important economic events, earnings, and market-moving announcements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Calendar events={events || []} onDateSelect={setSelectedDate} />
        </div>

        {/* Sidebar - Filter and Info */}
        <div className="space-y-6">
          {/* Filter by Impact */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Filter by Impact
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">High Impact</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">Medium Impact</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">Low Impact</span>
              </label>
            </div>
          </div>

          {/* Event Types */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Event Types
            </h3>
            <div className="space-y-2">
              {['earnings', 'economic-data', 'fed-meeting', 'ipo', 'dividend'].map(
                (type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {type.replace('-', ' ')}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Events on {selectedDate.toLocaleDateString()}
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="bg-gray-200 h-6 rounded mb-4" />
                  <div className="bg-gray-200 h-4 rounded mb-2" />
                  <div className="bg-gray-200 h-4 w-3/4 rounded" />
                </div>
              ))}
            </div>
          ) : selectedDateEvents && selectedDateEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDateEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-8">
              <p className="text-gray-600">No events scheduled for this date</p>
            </div>
          )}
        </div>
      )}

      {/* All Upcoming Events */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Upcoming Events</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 h-6 rounded mb-4" />
                <div className="bg-gray-200 h-4 rounded mb-2" />
                <div className="bg-gray-200 h-4 w-3/4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
