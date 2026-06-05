import { useEffect, useState } from "react";

// Persist a piece of state to localStorage so user-added businesses
// survive page reloads.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write errors (e.g. private mode / quota exceeded).
    }
  }, [key, value]);

  return [value, setValue];
}
