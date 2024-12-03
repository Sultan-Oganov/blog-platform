"use client";
import { useEffect } from "react";
import useThemeStore from "@/store/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      root.classList.add(storedTheme);
      useThemeStore.setState({ theme: storedTheme as "light" | "dark" });
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}
