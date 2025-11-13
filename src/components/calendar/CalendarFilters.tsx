import { getEventTypeColor } from '@/utils/mockCalendarEvents';

export type EventTypeFilter = 'all' | 'economic' | 'fed' | 'earnings' | 'announcement';
export type ImportanceFilter = 'all' | 'high' | 'medium' | 'low';

interface CalendarFiltersProps {
  selectedType: EventTypeFilter;
  selectedImportance: ImportanceFilter;
  selectedTimezone: string;
  onTypeChange: (type: EventTypeFilter) => void;
  onImportanceChange: (importance: ImportanceFilter) => void;
  onTimezoneChange: (timezone: string) => void;
  eventCounts?: {
    all: number;
    economic: number;
    fed: number;
    earnings: number;
    announcement: number;
  };
}

const timezones = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
];

const CalendarFilters = ({
  selectedType,
  selectedImportance,
  selectedTimezone,
  onTypeChange,
  onImportanceChange,
  onTimezoneChange,
  eventCounts,
}: CalendarFiltersProps) => {
  const eventTypes: { id: EventTypeFilter; label: string }[] = [
    { id: 'all', label: 'All Events' },
    { id: 'economic', label: 'Economic Indicators' },
    { id: 'fed', label: 'Fed Events' },
    { id: 'earnings', label: 'Earnings Calls' },
    { id: 'announcement', label: 'Announcements' },
  ];

  const importanceLevels: { id: ImportanceFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '⚪' },
    { id: 'high', label: 'High', icon: '🔴' },
    { id: 'medium', label: 'Medium', icon: '🟡' },
    { id: 'low', label: 'Low', icon: '⚪' },
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Event Type Filters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Event Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => {
            const colors = type.id !== 'all' ? getEventTypeColor(type.id) : { bg: '', text: '', icon: '📅' };
            const isSelected = selectedType === type.id;
            const count = eventCounts ? eventCounts[type.id] : 0;

            return (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-primary-600 text-white shadow-md'
                    : type.id !== 'all'
                    ? `${colors.bg} ${colors.text} hover:opacity-80`
                    : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                }`}
              >
                {type.id !== 'all' && <span>{colors.icon}</span>}
                <span>{type.label}</span>
                {isSelected && eventCounts && (
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Importance Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Importance Level
        </h3>
        <div className="flex flex-wrap gap-2">
          {importanceLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => onImportanceChange(level.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedImportance === level.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
              }`}
            >
              <span>{level.icon}</span>
              <span>{level.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timezone Selector */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Timezone
        </h3>
        <div className="relative">
          <select
            value={selectedTimezone}
            onChange={(e) => onTimezoneChange(e.target.value)}
            className="input appearance-none pr-10"
          >
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 dark:bg-secondary-900/50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Event Type Legend
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['economic', 'fed', 'earnings', 'announcement'].map((type) => {
            const colors = getEventTypeColor(type as any);
            return (
              <div key={type} className="flex items-center gap-2 text-sm">
                <span className="text-lg">{colors.icon}</span>
                <span className="text-gray-700 dark:text-gray-300 capitalize">
                  {type}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarFilters;
