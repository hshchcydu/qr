import { useState, useEffect, useRef } from 'react';

export interface PriceData {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdate: Date;
}

/**
 * Simulate real-time price updates with WebSocket-like behavior
 * In production, this would connect to a real WebSocket feed
 */
export function useRealTimePrice(
  ticker: string,
  options?: {
    updateInterval?: number;
    volatility?: number;
    enabled?: boolean;
  }
): {
  data: PriceData | null;
  isConnected: boolean;
  error: Error | null;
} {
  const { updateInterval = 3000, volatility = 0.005, enabled = true } = options || {};

  const [data, setData] = useState<PriceData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const basePrice = useRef<number>(100 + Math.random() * 400); // Random base price between 100-500

  useEffect(() => {
    if (!enabled || !ticker) {
      setIsConnected(false);
      return;
    }

    // Initialize connection
    setIsConnected(true);
    setError(null);

    // Initial price
    const initialPrice = basePrice.current;
    setData({
      ticker,
      price: initialPrice,
      change: 0,
      changePercent: 0,
      volume: Math.floor(Math.random() * 10000000),
      lastUpdate: new Date(),
    });

    // Simulate price updates
    intervalRef.current = setInterval(() => {
      setData((prev) => {
        if (!prev) return prev;

        // Generate random price movement
        const changePercent = (Math.random() - 0.5) * 2 * volatility;
        const newPrice = prev.price * (1 + changePercent);
        const change = newPrice - basePrice.current;
        const changePct = (change / basePrice.current) * 100;

        return {
          ...prev,
          price: parseFloat(newPrice.toFixed(2)),
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat(changePct.toFixed(2)),
          volume: prev.volume + Math.floor(Math.random() * 10000),
          lastUpdate: new Date(),
        };
      });
    }, updateInterval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsConnected(false);
    };
  }, [ticker, updateInterval, volatility, enabled]);

  return { data, isConnected, error };
}
