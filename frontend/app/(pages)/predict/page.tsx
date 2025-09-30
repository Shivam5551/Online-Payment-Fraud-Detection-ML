import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Predict() {
    const session = await getServerSession(authOptions);
    return (
        <>
            {session && session?.user ? (
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
                            <Button className="transition-all transform duration-200 hover:rounded-2xl bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800">
                                Generate API Token
                            </Button>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                                <h3 className="font-medium mb-2 dark:text-white">
                                    API Endpoint:
                                </h3>
                                <code className="text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-300 p-2 rounded block">
                                    POST /api/predict
                                </code>
                            </div>
                        </div>
                    </div>

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
