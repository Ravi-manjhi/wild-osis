import { useContext } from "react";
import { DarkContext } from "./DarkModeContext";

const useGlobalDarkContext = () => {
  const value = useContext(DarkContext);
  if (!value) throw new Error("You calling out of scope of context");
  return value;
};

export { useGlobalDarkContext };
