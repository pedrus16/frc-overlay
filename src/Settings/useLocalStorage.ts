import { useEffect, useState } from 'react';

const useLocalStorage = (key: string) => {
  // initialize the value from localStorage
  const [currentValue, setCurrentValue] = useState<string | null>(() =>
    localStorage.getItem(key)
  );

  // update localStorage when the currentValue changes via setCurrentValue
  useEffect(() => {
    if (currentValue === null) {
      return;
    }
    localStorage.setItem(key, currentValue);
  }, [key, currentValue]);

  useEffect(() => {
    const storageEventListener = (storageEvent: StorageEvent) => {
      debugger;
      if (storageEvent.key === key) {
        setCurrentValue(localStorage.getItem(key));
      }
    };
    window.addEventListener('storage', storageEventListener);

    return () => window.removeEventListener('storage', storageEventListener);
  });

  // use as const to tell TypeScript this is a tuple
  return [currentValue, setCurrentValue] as const;
};

export default useLocalStorage;
