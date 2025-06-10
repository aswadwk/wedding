import config from '@/config/config';
import { motion } from 'framer-motion'
import {
    Copy,
    Gift,
    CheckCircle,
    Wallet,
    Building2,
} from 'lucide-react'
import { useState, useEffect } from 'react';

export default function Gifts() {
    const [copiedAccount, setCopiedAccount] = useState(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Set animation to run once on component mount
    useEffect(() => {
        setHasAnimated(true);
    }, []);

    const copyToClipboard = (text, bank) => {
        navigator.clipboard.writeText(text);
        setCopiedAccount(bank);
        setTimeout(() => setCopiedAccount(null), 2000);
    };

    return (
        <section
            id="gifts"
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
                    animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-8 space-y-4 text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="inline-block font-medium transition-colors duration-300 text-rose-500 dark:text-rose-400"
                    >
                        <span className="px-4 py-2 text-sm transition-colors duration-300 border rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800">
                            Hadiah Pernikahan
                        </span>
                    </motion.span>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={hasAnimated ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200 dark:bg-gray-600 transition-colors duration-300" />
                        <Gift className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200 dark:bg-gray-600 transition-colors duration-300" />
                    </motion.div>
                </motion.div>

                {/* Bank Accounts Grid */}
                <div className="grid max-w-2xl gap-6 mx-auto">
                    {config.data.banks.map((account, index) => (
                        <motion.div
                            key={account.accountNumber}
                            initial={{ opacity: 0, y: 20 }}
                            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 * index + 0.7 }}
                            className="relative group"
                        >
                            <div className="relative p-6 transition-colors duration-300 border shadow-lg rounded-2xl border-rose-100/50 dark:border-gray-700/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 p-2 transition-colors duration-300 bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                            <Building2 className="w-full h-full text-rose-500 dark:text-rose-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800 transition-colors duration-300 dark:text-gray-100">{account.bank}</h3>
                                            <p className="text-sm text-gray-500 transition-colors duration-300 dark:text-gray-400">{account.accountName}</p>
                                        </div>
                                    </div>
                                    <Wallet className="w-5 h-5 text-rose-400" />
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between px-4 py-3 transition-colors duration-300 rounded-lg bg-gray-50/80 dark:bg-gray-700/80">
                                        <p className="font-mono text-gray-700 transition-colors duration-300 dark:text-gray-200">{account.accountNumber}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                                            className="flex items-center space-x-1 transition-colors duration-300 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300"
                                        >
                                            {copiedAccount === account.bank ? (
                                                <CheckCircle className="w-4 h-4" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                            <span className="text-sm">
                                                {copiedAccount === account.bank ? 'Copied!' : 'Copy'}
                                            </span>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}