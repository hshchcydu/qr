import { format } from 'date-fns';
import type { CalendarEvent } from '@/types';
import { getEventTypeColor, getImportanceBadge, type EventType } from '@/utils/mockCalendarEvents';

interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSetAlert?: (event: CalendarEvent) => void;
  onExportToGoogleCalendar?: (event: CalendarEvent) => void;
}

const EventModal = ({ event, isOpen, onClose, onSetAlert, onExportToGoogleCalendar }: EventModalProps) => {
  if (!isOpen || !event) return null;

  const typeColors = getEventTypeColor(event.type as EventType);
  const importanceBadge = getImportanceBadge(event.importance);

  const handleExportToGoogle = () => {
    if (!event) return;

    // Format dates for Google Calendar
    const startDate = format(new Date(event.start), "yyyyMMdd'T'HHmmss");
    const endDate = format(new Date(event.end), "yyyyMMdd'T'HHmmss");

    // Create Google Calendar URL
    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.set('text', event.title);
    googleCalendarUrl.searchParams.set('dates', `${startDate}/${endDate}`);
    googleCalendarUrl.searchParams.set('details', event.description || '');

    // Open in new window
    window.open(googleCalendarUrl.toString(), '_blank');

    onExportToGoogleCalendar?.(event);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-secondary-800 rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-down"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-secondary-800 border-b border-gray-200 dark:border-secondary-700 px-6 py-4 flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-3xl">{typeColors.icon}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`badge ${typeColors.bg} ${typeColors.text} text-xs font-semibold`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  <span className={`badge ${importanceBadge.color} text-xs font-semibold`}>
                    {importanceBadge.label}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {event.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Date and Time */}
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="font-semibold">
                  {format(new Date(event.start), 'EEEE, MMMM d, yyyy')}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Economic Data */}
            {(event.previous || event.expected || event.actual) && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Economic Data
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {event.previous && (
                    <div className="p-4 bg-gray-50 dark:bg-secondary-900/50 rounded-lg">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {event.previous}
                      </div>
                    </div>
                  )}
                  {event.expected && (
                    <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Expected</div>
                      <div className="text-xl font-bold text-primary-700 dark:text-primary-300">
                        {event.expected}
                      </div>
                    </div>
                  )}
                  {event.actual && (
                    <div className="p-4 bg-positive-50 dark:bg-positive-900/20 rounded-lg">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Actual</div>
                      <div className="text-xl font-bold text-positive-700 dark:text-positive-300">
                        {event.actual}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Related Tickers */}
            {event.relatedTickers && event.relatedTickers.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Related Tickers
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.relatedTickers.map((ticker) => (
                    <button
                      key={ticker}
                      className="px-3 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                    >
                      ${ticker}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Source */}
            {event.source && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>Source: <strong>{event.source}</strong></span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-gray-50 dark:bg-secondary-900/50 border-t border-gray-200 dark:border-secondary-700 px-6 py-4 flex flex-wrap gap-3">
            <button
              onClick={() => onSetAlert?.(event)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                event.isAlert
                  ? 'bg-positive-600 text-white hover:bg-positive-700'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {event.isAlert ? 'Alert Set' : 'Set Alert'}
            </button>

            <button
              onClick={handleExportToGoogle}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-secondary-800 border border-gray-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Export to Google Calendar
            </button>

            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-secondary-800 border border-gray-300 dark:border-secondary-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventModal;
