import { filters as configs } from "../constants";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";
import { googleTagManager } from "../utils";

export function useFilters() {
  const defaults = configs.reduce(
    (reducer, config) => ({
      ...reducer,
      [config.key]: config.options.find((option) => option.isDefault).value,
    }),
    {}
  );

  const { store, setStore } = useLocalStorage("filters", defaults);

  useEffect(() => {
    store &&
      googleTagManager.trackEvent({ filters: Object.values(store).join(", ") });
  }, [store]);

  return { filters: store, setFilters: setStore };
}
