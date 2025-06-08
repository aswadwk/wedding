// EventCard.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  X,
  Chrome,
  Apple,
  Calendar as CalendarIcon
} from 'lucide-react';
import { formatEventDate } from '@/lib/formatEventDate';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90%] max-w-sm"
          >
            <div className="p-6 transition-colors duration-300 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-100 shadow-2xl dark:bg-gray-800 rounded-2xl dark:border-gray-700">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CalendarButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
  </motion.button>
);

/**
 * SingleEventCard component displays an event card with options to add the event 
 * to various calendars (Google Calendar, Apple Calendar, and Outlook Calendar).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.eventData - Object containing event data.
 * @param {string} props.eventData.date - The date of the event (expected format: YYYY-MM-DD).
 * @param {string} props.eventData.startTime - The start time of the event (expected format: HH:mm).
 * @param {string} props.eventData.endTime - The end time of the event (expected format: HH:mm).
 * @param {string} props.eventData.title - The title of the event.
 * @param {string} props.eventData.description - A description of the event.
 * @param {string} props.eventData.location - The location where the event takes place.
 * @param {string} props.eventData.timeZone - The time zone of the event.
 *
 * @example
 * const eventData = {
 *   date: '2023-10-15',
 *   startTime: '14:00',
 *   endTime: '16:00',
 *   title: 'Wedding Ceremony - Reception',
 *   description: 'Join us to celebrate the wedding ceremony and reception.',
 *   location: 'Sunset Gardens',
 *   timeZone: 'Asia/Jakarta'
 * };
 *
 * <SingleEventCard eventData={eventData} />
 *
 * @returns {JSX.Element} A JSX element representing the event card.
 */
const SingleEventCard = ({ eventData }) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const googleCalendarLink = () => {
    const startTime = eventData.startTime.replace(/\./g, ':');
    const endTime = eventData.endTime.replace(/\./g, ':');

    const startDate = new Date(`${eventData.localDateString}T${startTime}:00`);
    const endDate = new Date(`${eventData.localDateString}T${endTime}:00`);

    const formatDate = (date) => {

      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}&ctz=${eventData.timeZone}`;
  };

  const generateICSContent = () => {
    const startTime = eventData.startTime.replace(/\./g, ':');
    const endTime = eventData.endTime.replace(/\./g, ':');

    const startDate = new Date(`${eventData.localDateString}T${startTime}:00`);
    const endDate = new Date(`${eventData.localDateString}T${endTime}:00`);

    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description}
LOCATION:${eventData.location}
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICSFile = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${eventData.title.toLowerCase().replace(/ /g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      <motion.div
        className="p-6 space-y-4 transition-colors duration-300 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-2xl dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 dark:text-gray-100">{eventData.title.split(' - ')[0]}</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="transition-colors text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
            onClick={() => setShowCalendarModal(true)}
          >
            <CalendarPlus className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="space-y-3 text-gray-600 transition-colors duration-300 dark:text-gray-300">
          <div className="flex items-center space-x-3">
            <Calendar className="flex-shrink-0 w-5 h-5 text-rose-500 dark:text-rose-400" />
            <span>{formatEventDate(eventData.date)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="flex-shrink-0 w-5 h-5 text-rose-500 dark:text-rose-400" />
            <span>{eventData.startTime} - {eventData.endTime} WITA</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="flex-shrink-0 w-5 h-5 text-rose-500 dark:text-rose-400" />
            <span>{eventData.location}</span>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <div className="space-y-6 ">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 dark:text-gray-100">Add to Calendar</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCalendarModal(false)}
              className="text-gray-500 transition-colors duration-300 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-3">
            <CalendarButton
              icon={(props) => <Chrome {...props} className="w-5 h-5 text-rose-500" />}
              label="Google Calendar"
              onClick={() => window.open(googleCalendarLink(), '_blank')}
            />

            <CalendarButton
              icon={(props) => <Apple {...props} className="w-5 h-5 text-gray-900" />}
              label="Apple Calendar"
              onClick={downloadICSFile}
            />

            <CalendarButton
              icon={(props) => <CalendarIcon {...props} className="w-5 h-5 text-blue-600" />}
              label="Outlook Calendar"
              onClick={downloadICSFile}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Main EventCards component that handles multiple events
const EventCards = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <SingleEventCard key={index} eventData={event} />
      ))}
    </div>
  );
};

// PropTypes for components
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

CalendarButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SingleEventCard.propTypes = {
  eventData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired,
    localDateString: PropTypes.string.isRequired, // Added for local date string
  }).isRequired,
};

EventCards.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventCards;