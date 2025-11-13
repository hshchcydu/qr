import { useState } from 'react';
import { useAlerts, useUpdateAlert, useDeleteAlert } from '@/hooks/useAlerts';
import AlertCard from '@/components/alerts/AlertCard';
import AlertSettings from '@/components/alerts/AlertSettings';

const Alerts = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data: alerts, isLoading } = useAlerts();
  const updateAlert = useUpdateAlert();
  const deleteAlert = useDeleteAlert();

  const handleToggleAlert = (id: string, isActive: boolean) => {
    updateAlert.mutate({ id, alert: { isActive } });
  };

  const handleDeleteAlert = (id: string) => {
    if (confirm('Are you sure you want to delete this alert?')) {
      deleteAlert.mutate(id);
    }
  };

  const handleCreateAlert = (alertData: any) => {
    // Handle alert creation
    console.log('Creating alert:', alertData);
    setShowCreateForm(false);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Price Alerts</h1>
          <p className="text-gray-600">
            Set up custom alerts to stay informed about price movements and market events
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary"
        >
          {showCreateForm ? 'Cancel' : '+ Create Alert'}
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-8">
          <AlertSettings
            onSave={handleCreateAlert}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Alerts</p>
              <p className="text-3xl font-bold text-gray-900">
                {alerts?.length || 0}
              </p>
            </div>
            <svg
              className="w-12 h-12 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Alerts</p>
              <p className="text-3xl font-bold text-green-600">
                {alerts?.filter((a) => a.isActive).length || 0}
              </p>
            </div>
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Triggered Today</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="bg-gray-200 h-6 rounded mb-4" />
              <div className="bg-gray-200 h-4 rounded mb-2" />
              <div className="bg-gray-200 h-4 w-3/4 rounded" />
            </div>
          ))}
        </div>
      ) : alerts && alerts.length > 0 ? (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onToggle={handleToggleAlert}
              onDelete={handleDeleteAlert}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No alerts configured
          </h3>
          <p className="text-gray-600 mb-4">
            Create your first alert to get notified about important market events
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary"
          >
            Create Your First Alert
          </button>
        </div>
      )}
    </div>
  );
};

export default Alerts;
