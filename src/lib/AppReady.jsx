import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AppReadyContext = createContext({ ready: false, setReady: () => {} });

/** Global "preloader finished" flag so the hero intro can wait for it. */
export function AppReadyProvider({ children }) {
  const [ready, setReadyState] = useState(false);
  const setReady = useCallback(() => setReadyState(true), []);
  const value = useMemo(() => ({ ready, setReady }), [ready, setReady]);
  return <AppReadyContext.Provider value={value}>{children}</AppReadyContext.Provider>;
}

export const useAppReady = () => useContext(AppReadyContext);
