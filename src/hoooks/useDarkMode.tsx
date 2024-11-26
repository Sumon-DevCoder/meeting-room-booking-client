import { useEffect, useState } from "react";

const useDarkMode = (): [boolean, () => void] => {
  const getInitialTheme = (): boolean => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme !== null) {
      return JSON.parse(storedTheme); // Parse saved theme
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches; // Default to system preference
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);

  useEffect(() => {
    // Apply or remove the "dark" class on the body
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    // Save theme preference in localStorage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;
