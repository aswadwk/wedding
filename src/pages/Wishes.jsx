import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import {
    Calendar,
    Clock,
    ChevronDown,
    User,
    MessageCircle,
    Send,
    Smile,
    CheckCircle,
    XCircle,
    HelpCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react';
import { formatEventDate } from '@/lib/formatEventDate';
import { supabase } from '@/lib/supabase';

export default function Wishes() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [newWish, setNewWish] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendance, setAttendance] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    const options = [
        { value: 'ATTENDING', label: 'Ya, saya akan hadir' },
        { value: 'NOT_ATTENDING', label: 'Tidak, saya tidak bisa hadir' },
        { value: 'MAYBE', label: 'Mungkin, saya akan konfirmasi nanti' }
    ];
    // Example wishes - replace with your actual data
    const [wishes, setWishes] = useState([
        {
            id: 1,
            name: "John Doe",
            message: "Wishing you both a lifetime of love, laughter, and happiness! 🎉",
            timestamp: "2024-12-24T23:20:00Z",
            attending: "attending"
        },
        {
            id: 2,
            name: "Natalie",
            message: "Wishing you both a lifetime of love, laughter, and happiness! 🎉",
            timestamp: "2024-12-24T23:20:00Z",
            attending: "attending"
        },
        {
            id: 3,
            name: "Abdur Rofi",
            message: "Congratulations on your special day! May Allah bless your union! 🤲",
            timestamp: "2024-12-25T23:08:09Z",
            attending: "maybe"
        }
    ]);

    useEffect(() => {
        // Ambil wishes dari Supabase saat komponen mount
        const fetchWishes = async () => {
            const { data, error } = await supabase
                .from('wishes')
                .select('*')
                .order('timestamp', { ascending: false });
            if (!error && data) {
                setWishes(data);
            }
        };
        fetchWishes();
    }, []);

    const handleSubmitWish = async (e) => {
        e.preventDefault();
        if (!newWish.trim() || !name.trim() || !attendance) return;

        setIsSubmitting(true);
        // Simpan ke Supabase
        const { data, error } = await supabase.from('wishes').insert([
            {
                name,
                message: newWish,
                attending: attendance,
                timestamp: new Date().toISOString(),
            },
        ]).select();
        if (error) {
            alert('Gagal mengirim ucapan.');
            setIsSubmitting(false);
            return;
        }
        if (data?.[0]) {
            setWishes(prev => [data[0], ...prev]);
        }
        setNewWish('');
        setName('');
        setAttendance('');
        setIsSubmitting(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };
    const getAttendanceIcon = (status) => {
        switch (status) {
            case 'attending':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'not-attending':
                return <XCircle className="w-4 h-4 text-rose-500" />;
            case 'maybe':
                return <HelpCircle className="w-4 h-4 text-amber-500" />;
            default:
                return null;
        }
    };
    return (<>
        <section id="wishes" className="relative min-h-screen overflow-hidden transition-colors duration-300 dark:bg-gray-900"
            style={{
                backgroundImage: `url('/images/image-bg-up.png'), url('/images/image-bg-down.png'), linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,241,242,0.05), rgba(255,255,255,0.1))`,
                backgroundSize: 'contain, contain, cover',
                backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
                backgroundPosition: 'top right, bottom right, center',
            }}>
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-rose-50/5 to-white/10 dark:from-gray-900/20 dark:via-gray-800/10 dark:to-gray-900/20" />
            <div className="absolute top-0 right-0 w-64 h-64 translate-x-1/2 -translate-y-1/2 rounded-full md:w-96 md:h-96 bg-rose-100/10 dark:bg-rose-900/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-1/2 translate-y-1/2 rounded-full md:w-96 md:h-96 bg-pink-100/10 dark:bg-pink-900/10 blur-3xl" />

            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
            <div className="container relative z-10 px-4 py-20 mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 space-y-4 text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block font-medium transition-colors duration-300 text-rose-500 dark:text-rose-400"
                    >
                        Kirimkan Doa dan Harapan Terbaik Anda
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-serif text-4xl text-gray-800 transition-colors duration-300 dark:text-gray-100 md:text-5xl"
                    >
                        Pesan dan Doa
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200 dark:bg-gray-600 transition-colors duration-300" />
                        <MessageCircle className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200 dark:bg-gray-600 transition-colors duration-300" />
                    </motion.div>
                </motion.div>

                {/* Wishes List */}
                <div className="max-w-2xl mx-auto space-y-6">
                    <AnimatePresence>
                        <Marquee speed={20}
                            gradient={false}
                            className="[--duration:20s] py-2">
                            {wishes.map((wish, index) => (
                                <motion.div
                                    key={wish.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative w-[280px]"
                                >
                                    {/* Background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 dark:from-rose-900/20 to-pink-100/50 dark:to-pink-900/20 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                                    {/* Card content */}
                                    <div className="relative p-4 transition-colors duration-300 border shadow-md backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-xl border-rose-100/50 dark:border-gray-700/50">
                                        {/* Header */}
                                        <div className="flex items-start mb-2 space-x-3">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-rose-400 to-pink-400">
                                                    {wish.name[0].toUpperCase()}
                                                </div>
                                            </div>

                                            {/* Name, Time, and Attendance */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="text-sm font-medium text-gray-800 truncate transition-colors duration-300 dark:text-gray-100">
                                                        {wish.name}
                                                    </h4>
                                                    {getAttendanceIcon(wish.attending)}
                                                </div>
                                                <div className="flex items-center space-x-1 text-xs text-gray-500 transition-colors duration-300 dark:text-gray-400">
                                                    <Clock className="w-3 h-3" />
                                                    <time className="truncate">
                                                        {formatEventDate(wish.timestamp)}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <p className="mb-2 text-sm leading-relaxed text-gray-600 transition-colors duration-300 dark:text-gray-300 line-clamp-3">
                                            {wish.message}
                                        </p>

                                        {/* Optional: Time indicator for recent messages */}
                                        {Date.now() - new Date(wish.timestamp).getTime() < 3600000 && (
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-rose-100 text-rose-600">
                                                    New
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </Marquee>
                    </AnimatePresence>
                </div>
                {/* Wishes Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto mt-12"
                >
                    <form onSubmit={handleSubmitWish} className="relative">
                        <div className="p-6 transition-colors duration-300 border shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl border-rose-100/50 dark:border-gray-700/50">
                            <div className='space-y-2'>
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <div className="flex items-center mb-1 space-x-2 text-sm text-gray-500 transition-colors duration-300 dark:text-gray-400">
                                        <User className="w-4 h-4" />
                                        <span>Nama Kamu</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Masukan nama kamu..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-rose-100 dark:border-gray-600 focus:border-rose-300 dark:focus:border-rose-400 focus:ring focus:ring-rose-200 dark:focus:ring-rose-300 focus:ring-opacity-50 transition-all duration-200 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="relative space-y-2"
                                >
                                    <div className="flex items-center mb-1 space-x-2 text-sm text-gray-500 transition-colors duration-300 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>Apakah kamu hadir?</span>
                                    </div>

                                    {/* Custom Select Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-rose-100 dark:border-gray-600 focus:border-rose-300 dark:focus:border-rose-400 focus:ring focus:ring-rose-200 dark:focus:ring-rose-300 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                                    >
                                        <span className={attendance ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                                            {attendance ?
                                                options.find(opt => opt.value === attendance)?.label
                                                : 'Pilih kehadiran...'}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Options */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute z-10 w-full mt-1 overflow-hidden transition-colors duration-300 bg-white border shadow-lg dark:bg-gray-800 rounded-xl border-rose-100 dark:border-gray-700"
                                            >
                                                {options.map((option) => (
                                                    <motion.button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setAttendance(option.value);
                                                            setIsOpen(false);
                                                        }}
                                                        whileHover={{ backgroundColor: 'rgb(255, 241, 242)' }}
                                                        className={`w-full px-4 py-2.5 text-left transition-colors
                                        ${attendance === option.value
                                                                ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                                                                : 'text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                {/* Wish Textarea */}
                                <div className="space-y-2">
                                    <div className="flex items-center mb-1 space-x-2 text-sm text-gray-500 transition-colors duration-300 dark:text-gray-400">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Harapan kamu</span>
                                    </div>
                                    <textarea
                                        placeholder="Kirimkan harapan dan doa untuk kedua mempelai..."
                                        className="w-full h-32 p-4 text-gray-700 placeholder-gray-400 transition-all duration-200 border resize-none rounded-xl bg-white/50 dark:bg-gray-700/50 border-rose-100 dark:border-gray-600 focus:border-rose-300 dark:focus:border-rose-400 focus:ring focus:ring-rose-200 dark:focus:ring-rose-300 focus:ring-opacity-50 dark:text-gray-200 dark:placeholder-gray-500"
                                        required
                                        value={newWish}
                                        onChange={e => setNewWish(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2 text-gray-500 transition-colors duration-300 dark:text-gray-400">
                                    <Smile className="w-5 h-5" />
                                    <span className="text-sm">Berikan Doa Anda</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${isSubmitting
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-rose-500 hover:bg-rose-600'}`}
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Sedang Mengirim...' : 'Kirimkan Doa'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    </>)
}
