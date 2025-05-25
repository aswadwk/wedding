/**
 * Copyright (c) 2024-present mrofisr
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// src/App.jsx
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import MainContent from '@/pages/MainContent';
import LandingPage from '@/pages/LandingPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import config from '@/config/config';
import { Routes, Route } from 'react-router-dom';
import GenerateInvitation from '@/pages/GenerateInvitation';
import { ThemeProvider } from '@/contexts/ThemeContext';

/**
 * App component serves as the root of the application.
 *
 * It manages the state to determine whether the invitation content should be shown.
 * Initially, the invitation is closed and the LandingPage component is rendered.
 * Once triggered, the Layout component containing MainContent is displayed.
 *
 * This component also uses HelmetProvider and Helmet to set up various meta tags:
 *   - Primary meta tags: title and description.
 *   - Open Graph tags for Facebook.
 *   - Twitter meta tags for summary and large image preview.
 *   - Favicon link and additional meta tags for responsive design and theme color.
 *
 * @component
 * @example
 * // Renders the App component
 * <App />
 */
function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  return (
    <ThemeProvider>
      <HelmetProvider>
        <Helmet>
          {/* Primary Meta Tags */}
          <title>{config.data.title}</title>
          <meta name="title" content={config.data.title} />
          <meta name="description" content={config.data.description} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:title" content={config.data.title} />
          <meta property="og:description" content={config.data.description} />
          <meta property="og:image" content={`${window.location.origin}/${config.data.ogImage}`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:site_name" content={config.data.title} />
          <meta property="og:locale" content="id_ID" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={window.location.href} />
          <meta property="twitter:title" content={config.data.title} />
          <meta property="twitter:description" content={config.data.description} />
          <meta property="twitter:image" content={`${window.location.origin}/${config.data.ogImage}`} />

          {/* WhatsApp and Social Media Optimization */}
          <meta property="og:image:alt" content={`${config.data.groomName} & ${config.data.brideName} Wedding Invitation`} />
          <meta name="author" content={`${config.data.groomName} & ${config.data.brideName}`} />
          <meta name="robots" content="index, follow" />

          {/* Favicon */}
          <link rel="icon" type="image/x-icon" href={config.data.favicon} />

          {/* Additional Meta Tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#FDA4AF" /> {/* Rose-300 color */}
        </Helmet>
        <Routes>
          <Route path="/" element={
            <AnimatePresence mode='wait'>
              {!isInvitationOpen ? (
                <LandingPage onOpenInvitation={() => setIsInvitationOpen(true)} />
              ) : (
                <Layout>
                  <MainContent />
                </Layout>
              )}
            </AnimatePresence>
          } />
          <Route path="/generate" element={<GenerateInvitation />} />
        </Routes>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;