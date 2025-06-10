import { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

const getSystemTheme = () => {
    if (typeof window === 'undefined') return 'light';

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check if theme is stored in localStorage
        const savedTheme = localStorage.getItem('wedding-theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            return savedTheme;
        }

        // If no saved theme or invalid theme, use system preference
        return getSystemTheme();
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove previous theme classes
        root.classList.remove('light', 'dark');

        // Add current theme class
        root.classList.add(theme);

        // Save to localStorage
        localStorage.setItem('wedding-theme', theme);
    }, [theme]);

    // Listen for system theme changes
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            const savedTheme = localStorage.getItem('wedding-theme');
            // Only auto-update if user hasn't manually set a preference
            if (!savedTheme) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const resetToSystemTheme = () => {
        const systemTheme = getSystemTheme();
        setTheme(systemTheme);
        localStorage.removeItem('wedding-theme');
    };

    const value = useMemo(() => ({
        theme,
        setTheme,
        toggleTheme,
        resetToSystemTheme,
        isSystemTheme: !localStorage.getItem('wedding-theme'),
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
