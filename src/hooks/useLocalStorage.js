import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (v) => {
    const next = typeof v === 'function' ? v(value) : v;
    setValue(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  return [value, set];
}
