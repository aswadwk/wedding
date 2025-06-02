import { motion } from 'framer-motion'
import {
    MessageCircle,
} from 'lucide-react'

export default function Wish() {

    return (
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

            <div className="container relative z-10 px-4 py-20 mx-auto">
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
                        Terima Kasih Atas Kehadiran dan Doa Anda
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-serif text-4xl text-gray-800 transition-colors duration-300 dark:text-gray-100 md:text-5xl"
                    >
                        Terima Kasih
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

                    {/* Thank You Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-3xl mx-auto mt-8 space-y-6"
                    >
                        <div className="p-8 text-center transition-colors duration-300 border shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl border-rose-100/50 dark:border-gray-700/50">
                            <div className="space-y-4">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white rounded-full bg-gradient-to-r from-rose-400 to-pink-400">
                                    <MessageCircle className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl font-semibold text-gray-800 transition-colors duration-300 dark:text-gray-100">
                                    Terima Kasih dari Lubuk Hati Kami
                                </h3>

                                <p className="text-lg leading-relaxed text-gray-600 transition-colors duration-300 dark:text-gray-300">
                                    Kehadiran Anda dalam hari bahagia kami adalah anugerah yang tak ternilai.
                                    Setiap doa, ucapan selamat, dan kehadiran Anda menjadi saksi dalam
                                    perjalanan cinta kami menuju kehidupan yang baru.
                                </p>

                                <div className="pt-4 space-y-3">
                                    <p className="text-base text-gray-600 transition-colors duration-300 dark:text-gray-300">
                                        Semoga Allah SWT senantiasa memberikan keberkahan dan kebahagiaan
                                        untuk kita semua.
                                    </p>

                                    <div className="pt-4">
                                        <p className="text-lg font-medium transition-colors duration-300 text-rose-600 dark:text-rose-400">
                                            Dengan Cinta,
                                        </p>
                                        <p className="font-serif text-xl text-gray-800 transition-colors duration-300 dark:text-gray-100">
                                            Kedua Mempelai
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
