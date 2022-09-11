import { createContext, useContext, useEffect, useState } from "react";
interface Theme {
  theme: string;
  setDarkHandler: () => void;
}
const AppContext = createContext<Theme | null>(null);

type Props = {
  children?: React.ReactNode;
};
export function AppWrapper({ children }: Props) {
  const [theme, setTheme] = useState("dark");
  const colorTheme = theme === "dark" ? "light" : "dark";
  const setDarkHandler: () => void = () => {
    localStorage.setItem("theme", colorTheme);
    setTheme(colorTheme);
  };
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (window) {
      setTheme(localStorage.theme);
    }
    if (localStorage.getItem("theme") === null) {
      console.log("no window");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);
  const values: Theme = { theme, setDarkHandler };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
export function useAppContext() {
  return useContext(AppContext);
}
