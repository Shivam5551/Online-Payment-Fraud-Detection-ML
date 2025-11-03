import type { Metadata } from 'next';
import '../globals.css';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/custom/navbar/navbar';
import { ThemeProvider } from '../theme-provider';
import AuthProvider from '../auth-provider';
import Footer from '@/components/custom/footer/footer';
import ChatAssistant from '@/components/custom/chat-assistant/chatAssistant';


export const metadata: Metadata = {
    title: 'Transecta — Smart Transaction Fraud Detection',
    description:
        'Transecta is an intelligent fraud detection platform that analyzes online payment transactions using machine learning to identify potential fraud in real-time. Built with Next.js, XGBoost, and Prisma.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <ToastContainer />
                        <div className="min-h-screen flex justify-center w-full items-start pt-2 dark:bg-gray-950 bg-gray-50">
                            <div className=" w-full flex justify-center flex-col sm:max-w-6xl">
                                <Navbar />
                                {children}
                            </div>
                        </div>
                        <ChatAssistant />
                        <div className="items-baseline">
                            <Footer />
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
