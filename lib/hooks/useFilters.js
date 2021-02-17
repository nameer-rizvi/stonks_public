import { filters as configs } from "../constants";
import { useLocalStorage } from "./useLocalStorage";

export function useFilters() {
  const defaults = configs.reduce(
    (reducer, config) => ({
      ...reducer,
      [config.key]: config.options.find((option) => option.isDefault).value,
    }),
    {}
  );

  const { store, setStore } = useLocalStorage("filters", defaults);

  return { filters: store, setFilters: setStore };
}
