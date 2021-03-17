import { useState, useEffect } from "react";

// https://usehooks.com/useLocalStorage/

function getItem(key, initialValue) {
  if (process.browser) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? { ...initialValue, ...JSON.parse(item) } : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  }
}

function setItem(key, value) {
  if (process.browser) {
    try {
      const curr = getItem(key);
      const jsonString = JSON.stringify(value);
      window.localStorage.setItem(key, jsonString);
    } catch (error) {
      console.error(error);
    }
  }
}

export function useLocalStorage(key, initialValue = {}) {
  const [store, setStore] = useState(getItem(key, initialValue));

  useEffect(() => {
    setItem(key, store);
  }, [store]);

  const updateStore = (update) => setStore((curr) => ({ ...curr, ...update }));

  return { store, setStore: updateStore };
}
