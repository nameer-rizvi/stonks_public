import { useState } from "react";

export function useToggle() {
  const [state, set] = useState(false);

  const change = () => set((curr) => !curr);

  return { state, change };
}
