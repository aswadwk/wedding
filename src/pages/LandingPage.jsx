// src/pages/LandingPage.jsx
import config from '@/config/config';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { safeBase64 } from '@/lib/base64';

const LandingPage = ({ onOpenInvitation }) => {
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('guest');

    if (guestParam) {
      try {
        const decodedName = safeBase64.decode(guestParam);
        setGuestName(decodedName);
      } catch (error) {
        console.error('Error decoding guest name:', error);
        setGuestName('');
      }
    }
  }, []);

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden transition-colors duration-300 dark:bg-gray-900"
      style={{
        backgroundImage: `url('/images/image-bg-up.png'), url('/images/image-bg-down.png'), linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,241,242,0.05), rgba(255,255,255,0.1))`,
        backgroundSize: 'contain, contain, cover',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        backgroundPosition: 'top right, bottom right, center',
      }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-rose-50/5 to-white/10 dark:from-gray-900/20 dark:via-gray-800/10 dark:to-gray-900/20" />
      <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 rounded-full md:w-96 md:h-96 bg-rose-100/20 dark:bg-rose-900/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-1/2 translate-y-1/2 rounded-full md:w-96 md:h-96 bg-pink-100/20 dark:bg-pink-900/20 blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Card Container */}
          <div className="p-6 transition-colors duration-300 border shadow-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 sm:p-8 md:p-10 rounded-2xl border-rose-100/50 dark:border-gray-700/50">
            {/* Top Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
              <div className="w-12 h-px sm:w-16 bg-rose-200/50" />
              <div className="w-2 h-2 rounded-full bg-rose-300" />
              <div className="w-12 h-px sm:w-16 bg-rose-200/50" />
            </div>

            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-center sm:mb-8"
            >
              <div className="space-y-3">
                <h1 className="font-serif text-3xl leading-tight text-gray-800 transition-colors duration-300 sm:text-4xl md:text-5xl dark:text-gray-100">
                  {config.data.groomName}
                  <br />
                  <span className="mx-2 text-rose-400 sm:mx-3">&</span>
                  <br />
                  {config.data.brideName}
                </h1>
                <div className="w-20 h-px mx-auto sm:w-28 bg-rose-200" />
              </div>
            </motion.div>

            {/* Couple Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 text-center"
            >
              <div className="space-y-4">
                {/* Couple Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60"
                >
                  {/* Outer decorative ring */}
                  <div className="absolute inset-0 p-1 rounded-full shadow-2xl bg-gradient-to-br from-rose-200 via-pink-300 to-rose-400">
                    {/* Middle ring with sparkle effect */}
                    <div className="relative w-full h-full p-2 rounded-full bg-gradient-to-br from-white via-rose-50 to-pink-100">
                      {/* Inner image container */}
                      <div className="w-full h-full overflow-hidden bg-white rounded-full shadow-inner">
                        <img
                          src="/images/couple.jpg"
                          alt={`${config.data.groomName} & ${config.data.brideName}`}
                          className="object-cover w-full h-full rounded-full filter brightness-105"
                        />
                      </div>

                      {/* Sparkle effects */}
                      <div className="absolute w-1 h-1 rounded-full top-4 right-6 bg-rose-300 animate-ping"></div>
                      <div className="absolute w-1 h-1 delay-500 bg-pink-300 rounded-full bottom-6 left-4 animate-ping"></div>
                      <div className="absolute top-1/3 left-2 w-0.5 h-0.5 bg-rose-400 rounded-full animate-pulse delay-700"></div>
                    </div>
                  </div>

                  {/* Love decorations around the image */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    {/* Heart icons positioned around the circle */}
                    <div className="absolute text-xl transform -translate-x-1/2 -top-3 left-1/2 text-rose-400">
                      ♥
                    </div>
                    <div className="absolute text-lg text-pink-400 top-1/4 -right-4">
                      ♥
                    </div>
                    <div className="absolute text-lg bottom-1/4 -left-4 text-rose-500">
                      ♥
                    </div>
                    <div className="absolute text-xl text-pink-500 transform -translate-x-1/2 -bottom-3 left-1/2">
                      ♥
                    </div>
                    <div className="absolute text-sm top-1/3 -left-3 text-rose-300">
                      ♥
                    </div>
                    <div className="absolute text-sm text-pink-300 bottom-1/3 -right-3">
                      ♥
                    </div>
                  </motion.div>

                  {/* Floating hearts animation */}
                  <motion.div
                    animate={{ y: [-10, -20, -10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute text-2xl -top-6 -right-6 text-rose-400 opacity-70"
                  >
                    💕
                  </motion.div>

                  <motion.div
                    animate={{ y: [-15, -25, -15] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute text-xl text-pink-400 -bottom-6 -left-6 opacity-60"
                  >
                    💖
                  </motion.div>

                  <motion.div
                    animate={{ y: [-8, -18, -8] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute text-lg opacity-50 -top-4 -left-8 text-rose-300"
                  >
                    💗
                  </motion.div>                {/* Glowing effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-200/20 to-pink-300/20 blur-xl animate-pulse"></div>
                </motion.div>

                {/* Guest Name */}
                {guestName && (
                  < motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-2"
                  >
                    <p className="font-serif text-sm italic text-gray-500 transition-colors duration-300 dark:text-gray-400">
                      Kepada Yth.
                    </p>
                    <p className="text-sm font-medium text-gray-600 transition-colors duration-300 dark:text-gray-300">
                      Bapak/Ibu/Saudara/i
                    </p>
                    <p className="text-lg font-semibold transition-colors duration-300 text-rose-500 dark:text-rose-400">
                      {guestName || "Tamu"}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Open Invitation Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 sm:mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenInvitation}
                className="relative w-full px-6 py-3 font-medium text-white transition-all duration-200 shadow-lg group bg-rose-500 sm:px-8 sm:py-3 rounded-xl hover:bg-rose-600"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Buka Undangan</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 transition-opacity duration-200 opacity-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl group-hover:opacity-100" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div >
    </motion.div >
  );
};

LandingPage.propTypes = {
  onOpenInvitation: PropTypes.func.isRequired,
};

export default LandingPage;
