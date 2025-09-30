import React from 'react';

const HowItWorksPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">How It Works</h1>
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">
                        Fraud Detection Process
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Our advanced machine learning system analyzes
                        transaction patterns to detect potential fraud.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Steps</h2>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Transaction data is collected and preprocessed</li>
                        <li>
                            Machine learning models analyze the data for
                            suspicious patterns
                        </li>
                        <li>
                            Risk scores are calculated based on multiple factors
                        </li>
                        <li>
                            Transactions are flagged as legitimate or
                            potentially fraudulent
                        </li>
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default HowItWorksPage;
