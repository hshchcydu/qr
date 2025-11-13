import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SentimentData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; // Index signature for Recharts compatibility
}

export const SentimentChart = () => {
  const [data, setData] = useState<SentimentData[]>([]);

  useEffect(() => {
    // Generate mock sentiment data
    const generateData = () => {
      const positive = Math.floor(Math.random() * 40) + 30; // 30-70%
      const negative = Math.floor(Math.random() * 30) + 10; // 10-40%
      const neutral = 100 - positive - negative;

      return [
        { name: 'Positive', value: positive, color: '#10b981' },
        { name: 'Neutral', value: neutral, color: '#6b7280' },
        { name: 'Negative', value: negative, color: '#ef4444' },
      ];
    };

    setData(generateData());

    // Update every minute
    const interval = setInterval(() => {
      setData(generateData());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Market Sentiment
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.9)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
