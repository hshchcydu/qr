import { useState } from 'react';
import type { AlertCondition, AlertFrequency, AlertChannel } from '@/types';

interface AlertSettingsProps {
  onSave: (alert: {
    title: string;
    conditions: AlertCondition[];
    frequency: AlertFrequency;
    channels: AlertChannel[];
  }) => void;
  onCancel: () => void;
}

const AlertSettings = ({ onSave, onCancel }: AlertSettingsProps) => {
  const [title, setTitle] = useState('');
  const [conditions, setConditions] = useState<AlertCondition[]>([
    { type: 'price', operator: 'above', value: 0 },
  ]);
  const [frequency, setFrequency] = useState<AlertFrequency>('realtime');
  const [channels, setChannels] = useState<AlertChannel[]>(['email']);

  const addCondition = () => {
    setConditions([
      ...conditions,
      { type: 'price', operator: 'above', value: 0 },
    ]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, field: keyof AlertCondition, value: any) => {
    const updated = [...conditions];
    updated[index] = { ...updated[index], [field]: value };
    setConditions(updated);
  };

  const toggleChannel = (channel: AlertChannel) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter((c) => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, conditions, frequency, channels });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Alert</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Alert Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alert Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Bitcoin price alert"
            className="input"
            required
          />
        </div>

        {/* Conditions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Conditions
            </label>
            <button
              type="button"
              onClick={addCondition}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add Condition
            </button>
          </div>

          <div className="space-y-3">
            {conditions.map((condition, index) => (
              <div key={index} className="flex gap-2 items-start">
                <select
                  value={condition.type}
                  onChange={(e) => updateCondition(index, 'type', e.target.value)}
                  className="input flex-1"
                >
                  <option value="price">Price</option>
                  <option value="volume">Volume</option>
                  <option value="news">News</option>
                  <option value="keyword">Keyword</option>
                </select>

                <select
                  value={condition.operator}
                  onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                  className="input flex-1"
                >
                  <option value="above">Above</option>
                  <option value="below">Below</option>
                  <option value="equals">Equals</option>
                  <option value="contains">Contains</option>
                </select>

                <input
                  type="text"
                  value={condition.value}
                  onChange={(e) => updateCondition(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="input flex-1"
                />

                {conditions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCondition(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequency
          </label>
          <div className="flex gap-2">
            {(['realtime', 'hourly', 'daily'] as AlertFrequency[]).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  frequency === freq
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Channels
          </label>
          <div className="flex gap-2">
            {(['email', 'push', 'sms'] as AlertChannel[]).map((channel) => (
              <button
                key={channel}
                type="button"
                onClick={() => toggleChannel(channel)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  channels.includes(channel)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Alert
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlertSettings;
