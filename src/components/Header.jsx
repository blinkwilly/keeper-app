import React, { useEffect, useState } from "react";

function Header() {
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem("theme");
        if (stored) return stored;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }

    return (
        <header>
            <h1 className="app-title">
                <span className="material-symbols-outlined app-icon">🗒️</span>
                Keeper App
            </h1>
            <div className="theme-toggle" role="group" aria-label="Theme toggle">
                <button onClick={toggleTheme} aria-pressed={theme === 'dark'} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                    {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>
        </header>
    )
}

export default Header;