import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';

export default function Couple() {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        { src: '/images/man.jpg', title: config.data.groomName, subtitle: 'Calon Mempelai Pria' },
        { src: '/images/women.jpg', title: config.data.brideName, subtitle: 'Calon Mempelai Wanita' },
        { src: '/images/couple.jpg', title: 'Calon Pengantin', subtitle: 'Kami Berdua' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const FloatingHearts = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: typeof window !== 'undefined' ? window.innerHeight : 1000
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0.5],
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: -100
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Heart
                            className={`w-6 h-6 ${i % 3 === 0 ? 'text-rose-300' :
                                i % 3 === 1 ? 'text-pink-300' :
                                    'text-red-300'
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
            id="couple"
            className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden transition-colors duration-300 sm:py-20"
            style={{
                backgroundImage: `url('/images/image-bg-up.png'), url('/images/image-bg-down.png'), linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,241,242,0.05), rgba(255,255,255,0.1))`,
                backgroundSize: 'contain, contain, cover',
                backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
                backgroundPosition: 'top right, bottom right, center',
            }}
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-rose-50/5 to-white/10 dark:from-gray-900/20 dark:via-gray-800/10 dark:to-gray-900/20" />

            {/* Floating Hearts Animation */}
            <FloatingHearts />

            <div className="relative z-10 w-full max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mx-auto mb-6"
                    >
                        <span className="px-4 py-2 text-sm transition-colors duration-300 border rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800">
                            ✨ Calon Pengantin ✨
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-4 font-serif text-3xl text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600"
                    >
                        Mengenal Lebih Dekat
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="max-w-2xl mx-auto text-base italic font-light text-gray-500 transition-colors duration-300 dark:text-gray-400 sm:text-lg"
                    >
                        &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.&rdquo;
                        <br />
                        <span className="text-sm font-medium text-rose-500 dark:text-rose-400">- QS. Ar-Rum: 21 -</span>
                    </motion.p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Image Section with Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative w-full max-w-md mx-auto">
                            {/* Main Image Container */}
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                                {/* Background decorative elements */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-rose-200/20 to-pink-200/20 dark:from-rose-800/20 dark:to-pink-800/20 rounded-3xl blur-xl" />

                                {/* Animated Images */}
                                {images.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{
                                            opacity: currentImage === index ? 1 : 0,
                                            scale: currentImage === index ? 1 : 1.1,
                                        }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.title}
                                            className="object-cover object-center w-full h-full"
                                            loading="lazy"
                                        />
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                    </motion.div>
                                ))}

                                {/* Image Title Overlay */}
                                <motion.div
                                    key={currentImage}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="absolute bottom-0 left-0 right-0 p-6 text-center text-white"
                                >
                                    <div className="p-4 bg-black/30 backdrop-blur-sm rounded-xl">
                                        <h3 className="mb-1 font-serif text-xl font-bold sm:text-2xl">
                                            {images[currentImage].title}
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            {images[currentImage].subtitle}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Image Navigation Dots */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentImage === index
                                            ? 'bg-rose-500 scale-125'
                                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-rose-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute w-20 h-20 rounded-full -top-4 -right-4 bg-rose-100/50 dark:bg-rose-800/30 blur-2xl" />
                            <div className="absolute w-16 h-16 rounded-full -bottom-4 -left-4 bg-pink-100/50 dark:bg-pink-800/30 blur-2xl" />
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="order-1 space-y-6 text-center lg:order-2"
                    >
                        {/* Groom Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="space-y-2"
                        >
                            <h3 className="font-serif text-3xl font-bold text-gray-800 sm:text-4xl dark:text-gray-100">
                                {config.data.groomName}
                            </h3>
                            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                Calon Mempelai Pria
                            </p>
                            <p className="text-base italic text-gray-500 dark:text-gray-500">
                                {config.data.parentGroom}
                            </p>
                        </motion.div>

                        {/* Heart Connector */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.4 }}
                            className="flex items-center justify-center py-4"
                        >
                            <div className="flex items-center space-x-6">
                                <div className="w-20 h-px bg-gradient-to-r from-transparent to-rose-300 dark:to-rose-600" />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Heart className="w-10 h-10 text-rose-500" fill="currentColor" />
                                </motion.div>
                                <div className="w-20 h-px bg-gradient-to-l from-transparent to-rose-300 dark:to-rose-600" />
                            </div>
                        </motion.div>

                        {/* Bride Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6 }}
                            className="space-y-2"
                        >
                            <h3 className="font-serif text-3xl font-bold text-gray-800 sm:text-4xl dark:text-gray-100">
                                {config.data.brideName}
                            </h3>
                            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                Calon Mempelai Wanita
                            </p>
                            <p className="text-base italic text-gray-500 dark:text-gray-500">
                                {config.data.parentBride}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="mt-16 text-center"
                >
                    <div className="max-w-2xl mx-auto">
                        <p className="mb-4 font-serif text-lg italic text-gray-600 sm:text-xl dark:text-gray-300">
                            &ldquo;Dengan mengucap nama Allah yang Maha Pengasih lagi Maha Penyayang, kami bermaksud menyelenggarakan resepsi pernikahan putra-putri kami&rdquo;
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-12 h-px bg-rose-300 dark:bg-rose-600" />
                            <div className="w-3 h-3 rounded-full bg-rose-300 dark:bg-rose-600" />
                            <div className="w-12 h-px bg-rose-300 dark:bg-rose-600" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
