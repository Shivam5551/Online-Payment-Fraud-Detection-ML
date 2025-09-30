import React from 'react';

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">About Transecta</h1>
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-700 mb-4">
                        Transecta is dedicated to providing advanced fraud
                        detection solutions using state-of-the-art machine
                        learning algorithms to protect businesses and consumers
                        from fraudulent transactions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Technology</h2>
                    <p className="text-gray-700 mb-4">
                        Our platform leverages cutting-edge artificial
                        intelligence and data analytics to identify suspicious
                        patterns and anomalies in real-time transaction data.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-gray-700">
                        For more information about our services, please reach
                        out to us at{' '}
                        <a
                            href="mailto:contact@transecta.com"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            contact@transecta.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
