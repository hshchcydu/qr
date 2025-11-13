import { useState, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import type { CalendarEvent } from '@/types';
import { getEventTypeColor } from '@/utils/mockCalendarEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

const localizer = momentLocalizer(moment);

interface CalendarComponentProps {
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onEventHover?: (event: CalendarEvent | null) => void;
}

const CalendarComponent = ({ events, onSelectEvent, onEventHover }: CalendarComponentProps) => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Custom event style getter
  const eventStyleGetter = useCallback(() => {
    return {
      style: {
        backgroundColor: 'transparent',
        border: 'none',
        padding: '2px 4px',
      },
    };
  }, []);

  // Custom event component
  const EventComponent = ({ event }: { event: CalendarEvent }) => {
    const colors = getEventTypeColor(event.type);

    return (
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded ${colors.bg} ${colors.text} text-xs font-medium overflow-hidden cursor-pointer hover:opacity-80 transition-opacity`}
        onMouseEnter={() => onEventHover?.(event)}
        onMouseLeave={() => onEventHover?.(null)}
      >
        <span className="text-sm">{colors.icon}</span>
        <span className="truncate flex-1">{event.title}</span>
        {event.importance === 'high' && (
          <span className="text-xs">🔴</span>
        )}
      </div>
    );
  };

  // Custom toolbar
  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {date.format('MMMM YYYY')}
        </span>
      );
    };

    return (
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="btn-secondary text-sm"
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={goToBack}
              className="p-2 rounded-lg bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-lg bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {label()}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView(Views.MONTH)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === Views.MONTH
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView(Views.WEEK)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === Views.WEEK
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView(Views.DAY)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === Views.DAY
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
          >
            Day
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-wrapper bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-soft dark:shadow-none dark:border dark:border-secondary-700">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        style={{ height: 700 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onSelectEvent}
        components={{
          event: EventComponent,
          toolbar: CustomToolbar,
        }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        popup
        selectable
      />
    </div>
  );
};

export default CalendarComponent;
