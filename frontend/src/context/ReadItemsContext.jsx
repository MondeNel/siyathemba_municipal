import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ReadItemsContext = createContext();
const STORAGE_KEY = 'last_visit_timestamps';

export function ReadItemsProvider({ children }) {
  const [timestamps, setTimestamps] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Mark a page as read by updating its last visit timestamp to now
  const markAsRead = useCallback((pageType) => {
    const now = new Date().toISOString();
    setTimestamps(prev => {
      // Only update if the timestamp actually changes
      if (prev[pageType] === now) return prev;
      const updated = { ...prev, [pageType]: now };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get count of items newer than last visit
  const getUnseenCount = useCallback((pageType, items) => {
    const lastVisit = timestamps[pageType] ? new Date(timestamps[pageType]) : new Date(0);
    return items.filter(item => {
      if (!item.created_at) return false;
      return new Date(item.created_at) > lastVisit;
    }).length;
  }, [timestamps]);

  return (
    <ReadItemsContext.Provider value={{ markAsRead, getUnseenCount }}>
      {children}
    </ReadItemsContext.Provider>
  );
}

export function useReadItems() {
  return useContext(ReadItemsContext);
}
