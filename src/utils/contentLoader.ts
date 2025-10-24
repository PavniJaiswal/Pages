// Content loader utility - automatically discovers and loads monthly content
import { MonthConfig, Theme } from '../types';

// This function dynamically imports all available months
// When adding a new month, just create a new folder in content/ with the required files
export const getAvailableMonths = (): string[] => {
  // List of available months - you can expand this by adding new folders
  // Format: YYYY-MM
  const months = [
    '2025-11',
  ];
  
  return months.sort().reverse(); // Most recent first
};

export const loadMonthConfig = async (monthId: string): Promise<MonthConfig> => {
  try {
    const config = require(`../../content/${monthId}/config.json`);
    return config;
  } catch (error) {
    console.error(`Failed to load config for month ${monthId}:`, error);
    throw error;
  }
};

export const loadMonthTheme = async (monthId: string): Promise<Theme | null> => {
  try {
    const theme = require(`../../content/${monthId}/theme.json`);
    return theme;
  } catch (error) {
    // Theme is optional
    return null;
  }
};

export const loadColumnContent = async (monthId: string, columnId: string): Promise<string> => {
  try {
    const content = require(`../../content/${monthId}/columns/${columnId}.json`);
    return content.content || content.text || '';
  } catch (error) {
    console.error(`Failed to load column ${columnId} for month ${monthId}:`, error);
    return '';
  }
};

// Format month string for display
export const formatMonthDisplay = (monthId: string): string => {
  const [year, month] = monthId.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

// Get current month ID
export const getCurrentMonthId = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

