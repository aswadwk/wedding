import { Calendar, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';

export default function Hero() {
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

    const CountdownTimer = ({ targetDate }) => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    menit: Math.floor((difference / 1000 / 60) % 60),
                    detik: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearInterval(timer);
        }, [targetDate, calculateTimeLeft]);

        return (
            <div className="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-4">
                {Object.keys(timeLeft).map((interval) => (<motion.div
                    key={interval}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center p-3 transition-colors duration-300 border bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-rose-100 dark:border-gray-700"
                >
                    <span className="text-xl font-bold transition-colors duration-300 sm:text-2xl text-rose-600 dark:text-rose-400">
                        {timeLeft[interval]}
                    </span>
                    <span className="text-xs text-gray-500 capitalize transition-colors duration-300 dark:text-gray-400">{interval}</span>
                </motion.div>
                ))}
            </div>
        );
    };

    const FloatingHearts = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0.5],
                            x: Math.random() * window.innerWidth,
                            y: -100
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Heart
                            className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${i % 3 === 0 ? 'text-rose-400' :
                                i % 3 === 1 ? 'text-pink-400' :
                                    'text-red-400'
                                }`}
                            fill="currentColor"
                        />
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <section
            id="home"
            className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden text-center transition-colors duration-300 sm:py-20"
            style={{
                backgroundImage: `url('/images/image-bg-up.png'), url('/images/image-bg-down.png'), linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,241,242,0.05), rgba(255,255,255,0.1))`,
                backgroundSize: 'contain, contain, cover',
                backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
                backgroundPosition: 'top right, bottom right, center',
            }}
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-rose-50/5 to-white/10 dark:from-gray-900/20 dark:via-gray-800/10 dark:to-gray-900/20" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 space-y-6"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block mx-auto"
                >
                    <span className="px-4 py-1 text-sm transition-colors duration-300 border rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800">
                        Catat Tanggal Penting Ini
                    </span>
                </motion.div>

                <div className="space-y-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-base italic font-light text-gray-500 transition-colors duration-300 dark:text-gray-400 sm:text-lg"
                    >
                        InsyaAllah Kami Akan Menikah
                    </motion.p>
                </div>

                {/* <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="relative max-w-2xl mx-auto"
                >
                    <div className="absolute inset-0 transition-colors duration-300 bg-gradient-to-b from-rose-50/50 dark:from-gray-800/50 to-white/50 dark:to-gray-900/50 backdrop-blur-md rounded-3xl" />

                    <div className="relative px-6 py-10 transition-colors duration-300 border sm:px-12 sm:py-14 rounded-3xl border-rose-100/50 dark:border-gray-700/50">
                        <div className="absolute top-0 -translate-x-1/2 -translate-y-px left-1/2">
                            <div className="w-24 sm:w-40 h-[3px] bg-gradient-to-r from-transparent via-rose-300 dark:via-gray-600 to-transparent transition-colors duration-300" />
                        </div>

                        <div className="space-y-8 text-center">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="flex items-center justify-center space-x-3"
                                >
                                    <Calendar className="w-5 h-5 text-rose-400" />
                                    <span className="text-base font-medium text-gray-700 transition-colors duration-300 dark:text-gray-200 sm:text-lg">
                                        {formatEventDate(config.data.date, "full")}
                                    </span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="flex items-center justify-center space-x-3"
                                >
                                    <Clock className="w-5 h-5 text-rose-400" />
                                    <span className="text-base font-medium text-gray-700 transition-colors duration-300 dark:text-gray-200 sm:text-lg">
                                        {config.data.time}
                                    </span>
                                </motion.div>
                            </div>

                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-px transition-colors duration-300 sm:w-16 bg-rose-300/60 dark:bg-gray-600/60" />
                                <div className="w-3 h-3 transition-colors duration-300 rounded-full bg-rose-300 dark:bg-gray-600" />
                                <div className="w-12 h-px transition-colors duration-300 sm:w-16 bg-rose-300/60 dark:bg-gray-600/60" />
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1 }}
                                className="space-y-3"
                            >
                                <p className="font-serif text-base italic text-gray-500 transition-colors duration-300 dark:text-gray-400 sm:text-lg">
                                    Kepada Yth.
                                </p>
                                <p className="text-base font-medium text-gray-600 transition-colors duration-300 dark:text-gray-300 sm:text-lg">
                                    Bapak/Ibu/Saudara/i
                                </p>
                                <p className="text-xl font-semibold transition-colors duration-300 text-rose-500 dark:text-rose-400 sm:text-2xl">
                                    {guestName || "Tamu"}
                                </p>
                            </motion.div>
                        </div>

                        <div className="absolute bottom-0 -translate-x-1/2 translate-y-px left-1/2">
                            <div className="w-24 sm:w-40 h-[3px] bg-gradient-to-r from-transparent via-rose-300 dark:via-gray-600 to-transparent transition-colors duration-300" />
                        </div>
                    </div>

                    <div className="absolute w-20 h-20 rounded-full -top-3 -right-3 sm:w-28 sm:h-28 bg-rose-100/30 blur-2xl" />
                    <div className="absolute w-20 h-20 rounded-full -bottom-3 -left-3 sm:w-28 sm:h-28 bg-rose-100/30 blur-2xl" />
                </motion.div> */}

                <CountdownTimer targetDate={config.data.date} />

                <div className="relative pt-6">
                    <FloatingHearts />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Heart className="w-10 h-10 mx-auto sm:w-12 sm:h-12 text-rose-500" fill="currentColor" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
