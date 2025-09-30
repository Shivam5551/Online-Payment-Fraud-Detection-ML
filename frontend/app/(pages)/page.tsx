import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

interface IFeature {
    title: string;
    description: string;
    icon: string;
}

const features: IFeature[] = [
    {
        title: 'AI-Powered Insights',
        description:
            'Advanced ML algorithms adapt to new fraud patterns continuously.',
        icon: '🧠',
    },
    {
        title: 'Real-time Detection',
        description:
            'Catch fraudulent transactions instantly with low latency ML models.',
        icon: '⚡',
    },
];

export default async function Home() {
    const session = await getServerSession(authOptions);
    return (
        <div className="max-w-7xl mx-auto space-y-4 p-4 sm:p-8 min-h-screen">
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
                            <Link href="/how-it-works">How it works</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative w-full md:w-1/3 h-80 lg:h-96">
                    <Image
                        src={'/homepage_logo.png'}
                        alt="Fraud Detection"
                        fill
                        className="object-contain rounded-lg dark:invert-0 transform transition-all duration-500 hover:scale-105"
                    />
                </div>
            </section>

            <section className="py-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                    Why Choose Our Platform?
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((f, index) => (
                        <FeatureCard key={index} feature={f} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ feature }: { feature: IFeature }) {
    return (
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="text-4xl flex justify-center gap-2 items-center mb-4">
                {feature.icon}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    {feature.title}
                </h3>
            </div>
            <p className="text-gray-600 text-center dark:text-gray-400">
                {feature.description}
            </p>
        </div>
    );
}
