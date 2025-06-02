import config from "@/config/config";
import { Clock, MapPin, CalendarCheck, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";

export default function Location() {
    return (<>
        {/* Location section */}
        <section
            id="location"
            className="relative min-h-screen overflow-hidden transition-colors duration-300"
            style={{
                backgroundImage: `url('/images/image-bg-up.png'), url('/images/image-bg-down.png'), linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,241,242,0.05), rgba(255,255,255,0.1))`,
                backgroundSize: 'contain, contain, cover',
                backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
                backgroundPosition: 'top right, bottom right, center',
            }}
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-rose-50/5 to-white/10 dark:from-gray-900/20 dark:via-gray-800/10 dark:to-gray-900/20" />
            <div className="container relative z-10 px-4 py-20 mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 space-y-4 text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-block font-medium transition-colors duration-300 text-rose-500 dark:text-rose-400"
                    >
                        Lokasi Acara
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl text-gray-800 transition-colors duration-300 md:text-5xl dark:text-gray-100"
                    >
                        Lokasi
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200 dark:bg-gray-600 transition-colors duration-300" />
                        <MapPin className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200 dark:bg-gray-600 transition-colors duration-300" />
                    </motion.div>
                </motion.div>

                {/* Location Content */}
                <div className="grid items-center max-w-6xl gap-8 mx-auto md:grid-row-2">
                    {/* Map Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white dark:border-gray-600 transition-colors duration-300"
                    >
                        <iframe
                            src={config.data.maps_embed}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        ></iframe>
                    </motion.div>

                    {/* Venue Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="p-8 transition-colors duration-300 bg-white border border-gray-100 shadow-lg dark:bg-gray-800/90 dark:border-gray-700 rounded-2xl">
                            <h3 className="mb-6 font-serif text-2xl text-gray-800 transition-colors duration-300 dark:text-gray-100">{config.data.location}</h3>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-5 h-5 mt-1 text-rose-500 dark:text-rose-400" />
                                    <p className="flex-1 text-gray-600 transition-colors duration-300 dark:text-gray-300">{config.data.address}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <CalendarCheck className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                                    <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300">{formatEventDate(config.data.date)}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Clock className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                                    <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300">{config.data.time}</p>
                                </div>

                                {/* Action Button - Full Width */}
                                <div className="pt-4">
                                    <motion.a
                                        href={config.data.maps_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        viewport={{ once: true }}
                                        className="w-full flex items-center justify-center gap-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span className="font-semibold">View Map</span>
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    </>)
}