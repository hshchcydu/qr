import type { CalendarEvent } from '@/types';
import { formatDate, getImpactColor } from '@/utils';

interface EventCardProps {
  event: CalendarEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600">{event.description}</p>
        </div>
        <span className={`badge ${getImpactColor(event.impact)}`}>
          {event.impact}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-xs text-gray-500 block mb-1">Date & Time</span>
          <span className="text-sm font-medium text-gray-900">
            {formatDate(event.date)}
            {event.time && ` • ${event.time}`}
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block mb-1">Type</span>
          <span className="badge badge-info">{event.eventType}</span>
        </div>
      </div>

      {(event.actual || event.forecast || event.previous) && (
        <div className="border-t border-gray-200 pt-4 grid grid-cols-3 gap-4">
          {event.actual && (
            <div>
              <span className="text-xs text-gray-500 block mb-1">Actual</span>
              <span className="text-sm font-semibold text-gray-900">
                {event.actual}
              </span>
            </div>
          )}
          {event.forecast && (
            <div>
              <span className="text-xs text-gray-500 block mb-1">Forecast</span>
              <span className="text-sm font-medium text-gray-700">
                {event.forecast}
              </span>
            </div>
          )}
          {event.previous && (
            <div>
              <span className="text-xs text-gray-500 block mb-1">Previous</span>
              <span className="text-sm font-medium text-gray-700">
                {event.previous}
              </span>
            </div>
          )}
        </div>
      )}

      {event.country && (
        <div className="mt-4 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm text-gray-600">{event.country}</span>
        </div>
      )}
    </div>
  );
};

export default EventCard;
