import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  SPX: number;
  DJI: number;
  NASDAQ: number;
}

export const MarketIndicesChart = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');

  useEffect(() => {
    // Generate mock data based on time range
    const generateData = () => {
      const points = timeRange === '1D' ? 24 : timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : 365;
      const newData: DataPoint[] = [];

      for (let i = 0; i < points; i++) {
        const time =
          timeRange === '1D'
            ? `${i}:00`
            : timeRange === '1W'
            ? `Day ${i + 1}`
            : `${i + 1}`;

        newData.push({
          time,
          SPX: 5800 + Math.random() * 200 - 100,
          DJI: 42000 + Math.random() * 1000 - 500,
          NASDAQ: 18500 + Math.random() * 500 - 250,
        });
      }

      return newData;
    };

    setData(generateData());
  }, [timeRange]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Market Indices
        </h3>
        <div className="flex gap-2">
          {(['1D', '1W', '1M', '1Y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis
            dataKey="time"
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
          <Line
            type="monotone"
            dataKey="SPX"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="S&P 500"
          />
          <Line
            type="monotone"
            dataKey="DJI"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="Dow Jones"
          />
          <Line
            type="monotone"
            dataKey="NASDAQ"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            name="NASDAQ"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
