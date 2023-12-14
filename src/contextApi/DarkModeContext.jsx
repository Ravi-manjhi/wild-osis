import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkContext = createContext();

function DarkContextProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "DarkState"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDark]);

  function toddleDarkMode() {
    setIsDark((val) => !val);
  }

  const store = { isDark, toddleDarkMode };
  return <DarkContext.Provider value={store}>{children}</DarkContext.Provider>;
}

export { DarkContextProvider, DarkContext };
