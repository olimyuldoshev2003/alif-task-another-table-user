import { useEffect, useState } from "react";

export default function useDarkSide() {
  const [theme, setTheme] = useState<string>(localStorage.theme);
  const colorTheme: string = theme === "dark" ? "light" : "dark";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    //Save theme to Local Storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme] as const;
}
