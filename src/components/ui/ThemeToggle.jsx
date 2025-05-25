import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import PropTypes from 'prop-types';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-100/50 dark:border-gray-700/50 transition-colors duration-200 ${className}`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 180 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {theme === 'light' ? (
                    <Sun className="w-6 h-6 text-yellow-500" />
                ) : (
                    <Moon className="w-6 h-6 text-blue-400" />
                )}
            </motion.div>

            {/* Ripple effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-rose-100 dark:bg-gray-700"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1.5, opacity: 0.3 }}
                transition={{ duration: 0.2 }}
            />
        </motion.button>
    );
};

ThemeToggle.propTypes = {
    className: PropTypes.string,
};

export default ThemeToggle;
