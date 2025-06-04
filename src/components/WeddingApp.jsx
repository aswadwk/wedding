import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './Layout';
import MainContent from '../react-pages/MainContent';
import LandingPage from '../react-pages/LandingPage';
import { ThemeProvider } from '../contexts/ThemeContext';

/**
 * WeddingApp component for Astro - handles the main wedding invitation flow
 * without React Router dependencies
 */
function WeddingApp() {
    const [isInvitationOpen, setIsInvitationOpen] = useState(false);

    return (
        <ThemeProvider>
            <AnimatePresence mode='wait'>
                {!isInvitationOpen ? (
                    <LandingPage onOpenInvitation={() => setIsInvitationOpen(true)} />
                ) : (
                    <Layout>
                        <MainContent />
                    </Layout>
                )}
            </AnimatePresence>
        </ThemeProvider>
    );
}

export default WeddingApp;
