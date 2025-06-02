import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import config from '@/config/config';
import BottomBar from '@/components/BottomBar';
import ThemeToggle from '@/components/ui/ThemeToggle';

const Layout = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);

  // First useEffect to handle initial setup and auto-play attempt
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(config.data.audio.src);
    audioRef.current.loop = config.data.audio.loop;

    // Try to autoplay
    const attemptAutoplay = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        wasPlayingRef.current = true;
        setShowToast(true);
        const timer = setTimeout(() => setShowToast(false), 3000);
        return () => clearTimeout(timer);
      } catch {
        console.log('Autoplay failed, waiting for user interaction');
        // Add click event listener for first interaction
        const handleFirstInteraction = async () => {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            wasPlayingRef.current = true;
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            document.removeEventListener('click', handleFirstInteraction);
          } catch (err) {
            console.error('Playback failed after interaction:', err);
          }
        };
        document.addEventListener('click', handleFirstInteraction);
      }
    };

    attemptAutoplay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Second useEffect to handle visibility and focus changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasPlayingRef.current = isPlaying;
        if (audioRef.current && isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (audioRef.current && wasPlayingRef.current) {
          audioRef.current.play().catch(console.error);
          setIsPlaying(true);
        }
      }
    };

    const handleWindowBlur = () => {
      wasPlayingRef.current = isPlaying;
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleWindowFocus = () => {
      if (audioRef.current && wasPlayingRef.current) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    };

    // Audio event listeners
    const handlePlay = () => {
      setIsPlaying(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), config.audio.toastDuration);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowToast(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);

      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
      }
    };
  }, [isPlaying]);

  // Toggle music function
  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          wasPlayingRef.current = false;
        } else {
          await audioRef.current.play();
          wasPlayingRef.current = true;
        }
      } catch (error) {
        console.error('Playback error:', error);
      }
    }
  };

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        className="mx-auto w-full max-w-[430px] min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Theme Toggle Button */}
        <ThemeToggle className="fixed z-50 top-4 left-4" />

        {/* Music Control Button with Status Indicator */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="fixed z-50 p-3 transition-colors duration-200 border rounded-full shadow-lg top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-rose-100/50 dark:border-gray-700/50"
        >
          {isPlaying ? (
            <div className="relative">
              <PauseCircle className="w-6 h-6 text-rose-500" />
              <span className="absolute w-2 h-2 bg-green-500 rounded-full -top-1 -right-1 animate-pulse" />
            </div>
          ) : (
            <PlayCircle className="w-6 h-6 text-rose-500" />
          )}
        </motion.button>

        <main className="relative h-full w-full pb-[100px]">
          {children}
        </main>
        <BottomBar />
        {/* Music Info Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed z-50 transform -translate-x-1/2 bottom-24 left-1/2"
            >
              <div className="flex items-center px-4 py-2 space-x-2 text-white transform -translate-x-1/2 rounded-full bg-black/80 backdrop-blur-sm">
                <Music className="w-4 h-4 animate-pulse" />
                <span className="text-sm whitespace-nowrap">
                  {config.data.audio.title}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;