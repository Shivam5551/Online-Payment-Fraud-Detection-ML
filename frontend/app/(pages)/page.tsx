import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';

export default async function Home() {
    const session = await getServerSession(authOptions);
    return (
        <div className="w-full mx-auto space-y-4 p-4 sm:p-8 min-h-screen">
            <section className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex-1 space-y-6">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
                        <span className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-200 bg-clip-text text-transparent">
                            Secure Transactions,
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-200 bg-clip-text text-transparent">
                            Smart Predictions
                        </span>
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl font-light dark:text-gray-300 max-w-2xl">
                        This service provides a robust API for detecting
                        fraudulent transactions using advanced machine learning
                        models.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button className="transition-all transform duration-500 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-lg hover:-translate-y-1 rounded-xl px-6 py-2 text-lg">
                            <Link
                                href={
                                    session && session.user
                                        ? '/predict'
                                        : '/signin'
                                }
                            >
                                Get Started
                            </Link>
                        </Button>
                        <Button className="transition-all transform duration-500 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg hover:-translate-y-1 rounded-xl px-6 py-2 text-lg">
                            <Link href="#how-it-works">How it works</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative w-full hidden md:flex md:w-1/3 h-80 lg:h-96">
                    <Image
                        src={'/homepage_logo.png'}
                        alt="Fraud Detection"
                        fill
                        className="object-contain rounded-lg dark:invert-0 transform transition-all duration-500 hover:scale-105"
                    />
                </div>
            </section>
            <section className="py-16 sm:py-20">
                <motion.div
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    id="how-it-works"
                    className="container mx-auto px-4 sm:px-8"
                >
                    <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-xl border border-amber-100 dark:border-amber-500/20 p-6 sm:p-10 flex flex-col items-center text-center transition-colors duration-300">
                        {/* Heading */}
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-800 dark:text-amber-400 mb-6 sm:mb-10">
                            How It Works
                        </h1>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full text-left">
                            {/* --- Fraud Detection Process --- */}
                            <div className="bg-white/70 dark:bg-gray-800/60 rounded-2xl p-5 sm:p-6 shadow hover:shadow-amber-100/30 dark:hover:shadow-amber-500/20 transition-all duration-300 border border-amber-100 dark:border-amber-500/20">
                                <h2 className="text-xl sm:text-2xl font-semibold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 dark:text-amber-400 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m0-4h.01M12 20h9"
                                        />
                                    </svg>
                                    Fraud Detection Process
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                                    Our advanced machine learning system
                                    continuously analyzes transaction patterns
                                    to identify potential fraudulent behavior
                                    before it causes harm.
                                </p>
                            </div>

                            {/* --- Steps --- */}
                            <div className="bg-white/70 dark:bg-gray-800/60 rounded-2xl p-5 sm:p-6 shadow hover:shadow-amber-100/30 dark:hover:shadow-amber-500/20 transition-all duration-300 border border-amber-100 dark:border-amber-500/20">
                                <h2 className="text-xl sm:text-2xl font-semibold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 dark:text-amber-400 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                    Steps
                                </h2>

                                <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                                    <li>
                                        Transaction data is collected and
                                        preprocessed.
                                    </li>
                                    <li>
                                        Machine learning models analyze the data
                                        for suspicious patterns.
                                    </li>
                                    <li>
                                        Risk scores are calculated based on
                                        multiple factors.
                                    </li>
                                    <li>
                                        Transactions are flagged as legitimate
                                        or potentially fraudulent.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
