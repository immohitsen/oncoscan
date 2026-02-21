"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: "light",
    toggleTheme: () => { },
});

function applyTheme(t: Theme) {
    const root = document.documentElement;
    if (t === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Read from DOM immediately so state matches what FOUC script already applied
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "light";
        return document.documentElement.classList.contains("dark") ? "dark" : "light";
    });

    // Sync on mount from localStorage / system preference
    useEffect(() => {
        const stored = localStorage.getItem("oncoscan-theme") as Theme | null;
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const resolved: Theme = stored ?? (systemDark ? "dark" : "light");
        setTheme(resolved);
        applyTheme(resolved);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const next: Theme = prev === "light" ? "dark" : "light";
            applyTheme(next);
            localStorage.setItem("oncoscan-theme", next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
