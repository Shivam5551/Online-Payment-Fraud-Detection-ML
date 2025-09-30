'use client';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function Signin() {
    return (
        <div className="flex items-center bg-neutral-200 dark:bg-black justify-center h-screen overflow-auto">
            <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-3xl bg-gray-50 dark:bg-gray-900">
                <div className="text-center space-y-2 mb-4">
                    <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 text-xs md:text-lg dark:text-gray-400">
                        Sign in to your account to continue
                    </p>
                </div>
                <Button
                    className="h-14 text-base font-semibold md:rounded-2xl md:text-2xl"
                    variant={'outline'}
                    onClick={async () => {
                        await signIn('google', { callbackUrl: '/' });
                    }}
                >
                    <FcGoogle /> Continue with Google
                </Button>
                <Button
                    className="h-14 text-base font-semibold md:rounded-2xl md:text-2xl"
                    variant={'outline'}
                    onClick={async () => {
                        await signIn('github', { callbackUrl: '/' });
                    }}
                >
                    <FaGithub /> Continue with Github
                </Button>
            </div>
        </div>
    );
}
