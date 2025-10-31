'use client';
import Link from 'next/link';
import GenerateApiTokenButton from '@/components/custom/buttons/generateApiToken';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useTokenStore } from '@/store/token';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { LuCopyCheck, LuCopyPlus } from 'react-icons/lu';
import MainPredict from '@/components/custom/predict/mainPredict';

export default function Predict() {
    const { data: session } = useSession();
    const { status } = useSession();
    const { token } = useTokenStore();
    const [copied, setCopied] = useState<boolean>(false);

    if (status === 'loading') {
        return (
            <div className="flex gap-4 min-h-screen justify-center items-center mb-6">
                {[...Array(5)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="w-4 h-4 bg-blue-500 rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: index * 0.1,
                        }}
                    />
                ))}
            </div>
        );
    }
    return (
        <>
            {session && session?.user && status === 'authenticated' ? (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">
                            Welcome, {session.user?.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Use your API token to authenticate requests to our
                            fraud detection service.
                        </p>

                        <div className="space-y-4">
                            {token ? (
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
                                    <h3 className="font-medium mb-2 dark:text-white">
                                        Your API Token:
                                    </h3>
                                    <span className="flex w-full bg-gray-200 dark:bg-gray-700 rounded-lg items-center justify-between relative">
                                        <code className="text-sm w-full 0 dark:text-gray-300 p-2 block break-all">
                                            {token}
                                        </code>
                                        <button
                                            className="w-8 h-full flex mr-0.5 justify-center items-center cursor-pointer text-black text-xl dark:text-white"
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(
                                                    token
                                                );
                                                const clipboardText =
                                                    await navigator.clipboard.readText();
                                                if (clipboardText === token) {
                                                    setCopied(true);
                                                    toast('Token copied', {
                                                        type: 'success',
                                                        autoClose: 5000,
                                                        pauseOnHover: true,
                                                    });
                                                }
                                            }}
                                        >
                                            {copied ? (
                                                <LuCopyCheck className="text-blue-500 dark:text-orange-300" />
                                            ) : (
                                                <LuCopyPlus />
                                            )}
                                        </button>
                                    </span>
                                </div>
                            ) : (
                                <GenerateApiTokenButton />
                            )}
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
                                <h3 className="font-medium mb-2 dark:text-white">
                                    API Endpoint:
                                </h3>
                                <code className="text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-2 rounded-lg block">
                                    POST /api/predict
                                </code>
                            </div>
                        </div>
                    </div>
                    <MainPredict />
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">
                            How it works:
                        </h3>
                        <ol className="list-decimal list-inside space-y-2 dark:text-gray-300 text-gray-700">
                            <li>Generate your API token</li>
                            <li>Include the token in your request headers</li>
                            <li>
                                Send transaction data to get fraud prediction
                            </li>
                        </ol>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        Please sign in to access the fraud detection API
                    </h2>
                    <Button
                        variant={'default'}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        <Link href={'/signin'}>Signin</Link>
                    </Button>
                </div>
            )}
        </>
    );
}
