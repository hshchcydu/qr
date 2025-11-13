import type {
  KeywordAlert,
  StockAlert,
  EconomicIndicatorAlert,
  ScheduleAlert,
  AlertHistoryItem,
} from '@/types';

/**
 * Alert API Service
 * Handles all alert-related API calls
 */

const API_BASE_URL = process.env.VITE_API_URL || '/api';
const USE_MOCK_DATA = true;

export const alertService = {
  // ===== Keyword Alerts =====

  /**
   * Get all keyword alerts
   */
  async getKeywordAlerts(): Promise<KeywordAlert[]> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Return from localStorage or empty array
      const stored = localStorage.getItem('investment-news-storage');
      if (stored) {
        const data = JSON.parse(stored);
        return data.state?.keywordAlerts || [];
      }
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/alerts/keywords`);
    if (!response.ok) throw new Error('Failed to fetch keyword alerts');
    return response.json();
  },

  /**
   * Create keyword alert
   */
  async createKeywordAlert(alert: KeywordAlert): Promise<KeywordAlert> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return alert;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/keywords`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });
    if (!response.ok) throw new Error('Failed to create keyword alert');
    return response.json();
  },

  /**
   * Update keyword alert
   */
  async updateKeywordAlert(id: string, updates: Partial<KeywordAlert>): Promise<KeywordAlert> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { id, ...updates } as KeywordAlert;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/keywords/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update keyword alert');
    return response.json();
  },

  /**
   * Delete keyword alert
   */
  async deleteKeywordAlert(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/keywords/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete keyword alert');
  },

  // ===== Stock Alerts =====

  /**
   * Get all stock alerts
   */
  async getStockAlerts(): Promise<StockAlert[]> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const stored = localStorage.getItem('investment-news-storage');
      if (stored) {
        const data = JSON.parse(stored);
        return data.state?.stockAlerts || [];
      }
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/alerts/stocks`);
    if (!response.ok) throw new Error('Failed to fetch stock alerts');
    return response.json();
  },

  /**
   * Create stock alert
   */
  async createStockAlert(alert: StockAlert): Promise<StockAlert> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return alert;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/stocks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });
    if (!response.ok) throw new Error('Failed to create stock alert');
    return response.json();
  },

  /**
   * Update stock alert
   */
  async updateStockAlert(id: string, updates: Partial<StockAlert>): Promise<StockAlert> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { id, ...updates } as StockAlert;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/stocks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update stock alert');
    return response.json();
  },

  /**
   * Delete stock alert
   */
  async deleteStockAlert(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/stocks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete stock alert');
  },

  // ===== Economic Indicator Alerts =====

  /**
   * Get all economic indicator alerts
   */
  async getEconomicAlerts(): Promise<EconomicIndicatorAlert[]> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const stored = localStorage.getItem('investment-news-storage');
      if (stored) {
        const data = JSON.parse(stored);
        return data.state?.economicAlerts || [];
      }
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/alerts/economic`);
    if (!response.ok) throw new Error('Failed to fetch economic alerts');
    return response.json();
  },

  /**
   * Create economic alert
   */
  async createEconomicAlert(alert: EconomicIndicatorAlert): Promise<EconomicIndicatorAlert> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return alert;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/economic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });
    if (!response.ok) throw new Error('Failed to create economic alert');
    return response.json();
  },

  // ===== Schedule Alerts =====

  /**
   * Get all schedule alerts
   */
  async getScheduleAlerts(): Promise<ScheduleAlert[]> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const stored = localStorage.getItem('investment-news-storage');
      if (stored) {
        const data = JSON.parse(stored);
        return data.state?.scheduleAlerts || [];
      }
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/alerts/schedules`);
    if (!response.ok) throw new Error('Failed to fetch schedule alerts');
    return response.json();
  },

  // ===== Alert History =====

  /**
   * Get alert history
   */
  async getAlertHistory(filters?: {
    type?: string;
    isRead?: boolean;
    isArchived?: boolean;
  }): Promise<AlertHistoryItem[]> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const stored = localStorage.getItem('investment-news-storage');
      if (stored) {
        const data = JSON.parse(stored);
        let history = data.state?.alertHistory || [];

        // Apply filters
        if (filters) {
          if (filters.type) {
            history = history.filter((h: AlertHistoryItem) => h.alertType === filters.type);
          }
          if (filters.isRead !== undefined) {
            history = history.filter((h: AlertHistoryItem) => h.isRead === filters.isRead);
          }
          if (filters.isArchived !== undefined) {
            history = history.filter((h: AlertHistoryItem) => h.isArchived === filters.isArchived);
          }
        }

        return history;
      }
      return [];
    }

    const queryParams = new URLSearchParams();
    if (filters?.type) queryParams.append('type', filters.type);
    if (filters?.isRead !== undefined) queryParams.append('isRead', String(filters.isRead));
    if (filters?.isArchived !== undefined) queryParams.append('isArchived', String(filters.isArchived));

    const response = await fetch(`${API_BASE_URL}/alerts/history?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch alert history');
    return response.json();
  },

  /**
   * Mark alert as read
   */
  async markAlertAsRead(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/history/${id}/read`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to mark alert as read');
  },

  /**
   * Archive alert
   */
  async archiveAlert(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/history/${id}/archive`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to archive alert');
  },

  /**
   * Delete alert from history
   */
  async deleteAlertHistory(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return;
    }

    const response = await fetch(`${API_BASE_URL}/alerts/history/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete alert history');
  },
};
