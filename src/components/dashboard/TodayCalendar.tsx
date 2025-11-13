import { Link } from 'react-router-dom';
import type { CalendarEvent, EventType } from '@/types';

const TodayCalendar = () => {
  // Mock today's events
  const todayEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Initial Jobless Claims',
      description: 'Weekly unemployment insurance claims report',
      type: 'economic' as EventType,
      start: new Date(new Date().setHours(8, 30, 0, 0)),
      end: new Date(new Date().setHours(8, 30, 0, 0)),
      importance: 'high' as const,
      previous: '210K',
      expected: '215K',
      actual: '208K',
      source: 'Department of Labor',
      isAlert: true,
    },
    {
      id: '2',
      title: 'Microsoft Q4 Earnings',
      description: 'Quarterly earnings report and conference call',
      type: 'earnings' as EventType,
      start: new Date(new Date().setHours(16, 0, 0, 0)),
      end: new Date(new Date().setHours(17, 0, 0, 0)),
      importance: 'high' as const,
      expected: '$2.55 EPS',
      relatedTickers: ['MSFT'],
      isAlert: true,
    },
    {
      id: '3',
      title: 'Fed Chair Powell Speech',
      description: 'Remarks on economic outlook at financial conference',
      type: 'fed' as EventType,
      start: new Date(new Date().setHours(14, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 0, 0, 0)),
      importance: 'high' as const,
      source: 'Federal Reserve',
      isAlert: true,
    },
    {
      id: '4',
      title: 'Tesla Production Numbers',
      description: 'Q4 production and delivery figures',
      type: 'announcement' as EventType,
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(10, 0, 0, 0)),
      importance: 'medium' as const,
      relatedTickers: ['TSLA'],
      isAlert: false,
    },
  ].sort((a, b) => a.start.getTime() - b.start.getTime());

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'economic':
        return '📊';
      case 'fed':
        return '🏛️';
      case 'earnings':
        return '💼';
      case 'announcement':
        return '📢';
      default:
        return '📅';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'border-red-500 dark:border-red-400';
      case 'medium':
        return 'border-yellow-500 dark:border-yellow-400';
      default:
        return 'border-blue-500 dark:border-blue-400';
    }
  };

  const getNextEvent = () => {
    const now = new Date();
    const upcomingEvent = todayEvents.find((event) => event.start > now);
    if (!upcomingEvent) return null;

    const diff = upcomingEvent.start.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return {
      event: upcomingEvent,
      timeUntil: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
    };
  };

  const nextEvent = getNextEvent();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Today's Calendar</h2>
        </div>
        <Link
          to="/calendar"
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
        >
          View All →
        </Link>
      </div>

      {/* Next Event Countdown */}
      {nextEvent && (
        <div className="mb-4 p-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-2xl">
                {getEventIcon(nextEvent.event.type)}
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">NEXT EVENT</p>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">{nextEvent.event.title}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{nextEvent.timeUntil}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {nextEvent.event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative space-y-4">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {todayEvents.map((event) => {
          const isPast = event.end < new Date();
          const isNext = nextEvent?.event.id === event.id;

          return (
            <div key={event.id} className="relative pl-14">
              {/* Timeline Dot */}
              <div
                className={`absolute left-4 top-2 w-4 h-4 rounded-full border-2 ${
                  isNext
                    ? 'bg-primary-600 dark:bg-primary-400 border-primary-600 dark:border-primary-400 animate-pulse'
                    : isPast
                    ? 'bg-gray-400 dark:bg-gray-600 border-gray-400 dark:border-gray-600'
                    : 'bg-white dark:bg-secondary-800 border-gray-300 dark:border-gray-600'
                }`}
              />

              {/* Event Card */}
              <div
                className={`p-3 rounded-lg border-l-4 transition-all ${
                  isPast
                    ? 'bg-gray-50 dark:bg-secondary-900/30 opacity-60'
                    : 'bg-white dark:bg-secondary-900/50 hover:shadow-md'
                } ${getImportanceColor(event.importance)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getEventIcon(event.type)}</span>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{event.title}</h4>
                      {event.importance === 'high' && (
                        <span className="badge bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs">
                          High Impact
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.description}</p>

                    {/* Event Details */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                      {event.expected && (
                        <span>Expected: <span className="font-medium text-gray-700 dark:text-gray-300">{event.expected}</span></span>
                      )}
                      {event.actual && (
                        <span>Actual: <span className="font-medium text-green-600 dark:text-green-400">{event.actual}</span></span>
                      )}
                      {event.relatedTickers && event.relatedTickers.length > 0 && (
                        <span className="flex items-center gap-1">
                          {event.relatedTickers.map((ticker) => (
                            <span key={ticker} className="badge bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              ${ticker}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {todayEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No events scheduled for today</p>
        </div>
      )}
    </div>
  );
};

export default TodayCalendar;
