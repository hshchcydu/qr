import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  hour: string;
  articles: number;
  alerts: number;
}

export const NewsVolumeChart = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Generate mock data for the last 24 hours
    const generateData = () => {
      const hours = 24;
      const newData: DataPoint[] = [];

      for (let i = 0; i < hours; i++) {
        const hour = new Date();
        hour.setHours(hour.getHours() - (hours - i));

        newData.push({
          hour: hour.getHours().toString().padStart(2, '0') + ':00',
          articles: Math.floor(Math.random() * 50) + 10,
          alerts: Math.floor(Math.random() * 20),
        });
      }

      return newData;
    };

    setData(generateData());

    // Update every 5 minutes
    const interval = setInterval(() => {
      setData(generateData());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        News Volume (Last 24 Hours)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis
            dataKey="hour"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.9)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Bar dataKey="articles" fill="#3b82f6" name="Articles" radius={[4, 4, 0, 0]} />
          <Bar dataKey="alerts" fill="#10b981" name="Alerts" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
