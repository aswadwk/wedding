// src/pages/LandingPage.jsx
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import PropTypes from 'prop-types';

const LandingPage = ({ onOpenInvitation }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative min-h-screen overflow-hidden transition-colors duration-300 dark:bg-gray-900"
  >
    {/* Decorative Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900" />
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

          {/* Date and Time */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-4 mb-6 sm:mb-8"
          >
            <div className="inline-flex flex-col items-center px-4 py-2 space-y-1 transition-colors duration-300 bg-white/80 dark:bg-gray-700/80 sm:px-6 sm:py-3 rounded-xl">
              <Calendar className="w-5 h-5 text-rose-400" />
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {formatEventDate(config.data.date)}
              </p>
            </div>

            <div className="inline-flex flex-col items-center px-4 py-2 space-y-1 transition-colors duration-300 bg-white/80 dark:bg-gray-700/80 sm:px-6 sm:py-3 rounded-xl">
              <Clock className="w-5 h-5 text-rose-400" />
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {config.data.time}
              </p>
            </div>
          </motion.div>

          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 text-center"
          >
            <div className="space-y-2">
              <h1 className="font-serif text-3xl leading-tight text-gray-800 transition-colors duration-300 sm:text-4xl md:text-5xl dark:text-gray-100">
                {config.data.groomName}
                <span className="mx-2 text-rose-400 sm:mx-3">&</span>
                {config.data.brideName}
              </h1>
              <div className="w-16 h-px mx-auto sm:w-24 bg-rose-200" />
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
    </div>
  </motion.div>
);

LandingPage.propTypes = {
  onOpenInvitation: PropTypes.func.isRequired,
};

export default LandingPage;
