import { format } from 'date-fns';
import type { CalendarEvent } from '@/types';
import { getEventTypeColor, getImportanceBadge, type EventType } from '@/utils/mockCalendarEvents';

interface EventCardProps {
  event: CalendarEvent;
  onSetAlert?: (event: CalendarEvent) => void;
}

const EventCard = ({ event, onSetAlert }: EventCardProps) => {
  const typeColors = getEventTypeColor(event.type as EventType);
  const importanceBadge = getImportanceBadge(event.importance);

  return (
    <div className="card hover:shadow-strong transition-all animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeColors.icon}</span>
          <div>
            <span className={`badge ${typeColors.bg} ${typeColors.text} text-xs font-semibold`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
          </div>
        </div>
        <span className={`badge ${importanceBadge.color} text-xs font-semibold`}>
          {importanceBadge.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
        {event.title}
      </h3>

      {/* Time */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{format(new Date(event.start), 'MMM d, yyyy • h:mm a')}</span>
      </div>

      {/* Description */}
      {event.description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {event.description}
        </p>
      )}

      {/* Data Values */}
      {(event.previous || event.expected || event.actual) && (
        <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-secondary-900/50 rounded-lg mb-4">
          {event.previous && (
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Previous</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {event.previous}
              </span>
            </div>
          )}
          {event.expected && (
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Expected</span>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {event.expected}
              </span>
            </div>
          )}
          {event.actual && (
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Actual</span>
              <span className="text-sm font-semibold text-positive-600 dark:text-positive-400">
                {event.actual}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Related Tickers */}
      {event.relatedTickers && event.relatedTickers.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Related:</span>
          {event.relatedTickers.map((ticker) => (
            <button
              key={ticker}
              className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-xs font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
            >
              ${ticker}
            </button>
          ))}
        </div>
      )}

      {/* Source */}
      {event.source && (
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <span>{event.source}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-secondary-700">
        <button
          onClick={() => onSetAlert?.(event)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            event.isAlert
              ? 'bg-positive-100 dark:bg-positive-900/30 text-positive-700 dark:text-positive-300'
              : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {event.isAlert ? 'Alert Set' : 'Set Alert'}
        </button>

        <button className="px-4 py-2 bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600 rounded-lg text-sm font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EventCard;
