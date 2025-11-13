import type { Alert } from '@/types';
import { formatDate } from '@/utils';

interface AlertCardProps {
  alert: Alert;
  onToggle: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

const AlertCard = ({ alert, onToggle, onDelete }: AlertCardProps) => {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {alert.title}
          </h3>
          <p className="text-sm text-gray-600">
            Created {formatDate(alert.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggle(alert.id, !alert.isActive)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              alert.isActive ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                alert.isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>

          <button
            onClick={() => onDelete(alert.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Conditions */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Conditions</h4>
        <div className="space-y-2">
          {alert.conditions.map((condition, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-2 rounded-lg"
            >
              <span className="badge badge-primary">{condition.type}</span>
              <span className="text-gray-600">{condition.operator}</span>
              <span className="font-medium text-gray-900">{condition.value}</span>
              {condition.symbol && (
                <span className="text-gray-600">({condition.symbol})</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-600">Frequency: </span>
            <span className="font-medium text-gray-900">{alert.frequency}</span>
          </div>
          <div>
            <span className="text-gray-600">Channels: </span>
            <span className="font-medium text-gray-900">
              {alert.channels.join(', ')}
            </span>
          </div>
        </div>
        {alert.lastTriggered && (
          <div className="text-gray-500">
            Last triggered: {formatDate(alert.lastTriggered)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
