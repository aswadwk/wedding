import { useState } from 'react';
import LandingPage from '../react-pages/LandingPage';
import { ThemeProvider } from '../contexts/ThemeContext';

/**
 * LandingPageWrapper component for Astro 
 * Handles navigation to invitation page using window.location
 */
function LandingPageWrapper() {
    const handleOpenInvitation = () => {
        window.location.href = '/invitation';
    };

    return (
        <ThemeProvider>
            <LandingPage onOpenInvitation={handleOpenInvitation} />
        </ThemeProvider>
    );
}

export default LandingPageWrapper;
