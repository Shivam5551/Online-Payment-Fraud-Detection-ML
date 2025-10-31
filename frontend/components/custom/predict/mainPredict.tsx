'use client';

import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTokenStore } from '@/store/token';
import { toast } from 'react-toastify';
import { IFormPredict, TransactionType } from '@/types/types';

const SubmittingMessage: string[] = [
    'Hang tight, we’re checking your data...',
    'Almost there — getting your results...',
    'Just a moment, analyzing your transaction...',
    'Verifying transaction details...',
    'Crunching the numbers for you...',
    'Preparing your fraud analysis...',
    'Finalizing the prediction...',
    'Just a sec, almost done...',
    'Getting everything ready for you...',
];

export default function MainPredict() {
    const { token } = useTokenStore();
    const [message, setMessage] = useState<string>(SubmittingMessage[0]);
    const [form, setForm] = useState<IFormPredict>({
        step: '',
        amount: '',
        oldbalanceOrg: '',
        newbalanceOrig: '',
        oldbalanceDest: '',
        newbalanceDest: '',
        transaction_type: null,
    });
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (!submitting) return;
        const interval = setInterval(() => {
            const index = Math.floor(Math.random() * SubmittingMessage.length);
            console.log('hello', index);
            setMessage(SubmittingMessage[index]);
        }, 2000);
        return () => clearInterval(interval);
    }, [submitting]);

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            try {
                setSubmitting(true);
                if (!token) {
                    toast.error(
                        'API token is missing. Please generate your API token first.'
                    );
                    return;
                }
                if (!form.transaction_type) {
                    toast.error('Please select a transaction type.');
                    return;
                }
                if (!form.step) {
                    toast.error('Please enter the step value.');
                    return;
                }
                if (!form.amount) {
                    toast.error('Please enter the amount value.');
                    return;
                }
                const payload = {
                    step: Number(form.step),
                    amount: Number(form.amount),
                    oldbalanceOrg: Number(form.oldbalanceOrg),
                    newbalanceOrig: Number(form.newbalanceOrig),
                    oldbalanceDest: Number(form.oldbalanceDest),
                    newbalanceDest: Number(form.newbalanceDest),
                    transaction_type: form.transaction_type,
                    token: token,
                };
                const sendPredictRequest = async () => {
                    const response = await fetch('/api/predict', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        toast.success(
                            `Prediction: ${data.data.isFraud ? 'Fraudulent' : 'Legitimate'}`
                        );
                    } else {
                        toast.error(
                            `Error: ${data.message || 'Failed to get prediction'}`
                        );
                        return;
                    }
                };
                await sendPredictRequest();
            } catch (error) {
                toast.error(
                    'An unexpected error occurred. Please try again later.'
                );
                console.error('Error during prediction request:', error);
                return;
            } finally {
                setSubmitting(false);
            }
        },
        [
            token,
            form.step,
            form.amount,
            form.newbalanceDest,
            form.oldbalanceDest,
            form.oldbalanceOrg,
            form.newbalanceOrig,
            form.transaction_type,
        ]
    );
    const handleReset = useCallback(() => {
        setForm({
            step: '',
            amount: '',
            oldbalanceOrg: '',
            newbalanceOrig: '',
            oldbalanceDest: '',
            newbalanceDest: '',
            transaction_type: null,
        });
    }, [setForm]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Fraud Detection Prediction
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Transaction Details Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
                        Transaction Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabelledInput
                            label="Step"
                            value={form.step}
                            placeholder="Enter step (e.g., 2000)"
                            onChange={e =>
                                setForm({ ...form, step: e.target.value })
                            }
                            description="Time step in hours"
                        />
                        <LabelledInput
                            label="Amount"
                            value={form.amount}
                            placeholder="Enter amount (e.g., 150000)"
                            onChange={e =>
                                setForm({ ...form, amount: e.target.value })
                            }
                            description="Transaction amount"
                        />
                    </div>
                </div>

                {/* Balance Information Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
                        Balance Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabelledInput
                            label="Old Balance Origin"
                            value={form.oldbalanceOrg}
                            placeholder="Enter old balance (e.g., 200000)"
                            onChange={e =>
                                setForm({
                                    ...form,
                                    oldbalanceOrg: e.target.value,
                                })
                            }
                            description="Origin account balance before transaction"
                        />
                        <LabelledInput
                            label="New Balance Origin"
                            value={form.newbalanceOrig}
                            placeholder="Enter new balance (e.g., 50000)"
                            onChange={e =>
                                setForm({
                                    ...form,
                                    newbalanceOrig: e.target.value,
                                })
                            }
                            description="Origin account balance after transaction"
                        />
                        <LabelledInput
                            label="Old Balance Destination"
                            value={form.oldbalanceDest}
                            placeholder="Enter old balance (e.g., 0)"
                            onChange={e =>
                                setForm({
                                    ...form,
                                    oldbalanceDest: e.target.value,
                                })
                            }
                            description="Destination account balance before transaction"
                        />
                        <LabelledInput
                            label="New Balance Destination"
                            value={form.newbalanceDest}
                            placeholder="Enter new balance (e.g., 150000)"
                            onChange={e =>
                                setForm({
                                    ...form,
                                    newbalanceDest: e.target.value,
                                })
                            }
                            description="Destination account balance after transaction"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
                        Transaction Type
                    </h3>
                    <select
                        required={true}
                        value={form.transaction_type || ''}
                        onChange={e =>
                            setForm({
                                ...form,
                                transaction_type: e.target
                                    .value as TransactionType,
                            })
                        }
                        className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none dark:bg-gray-800 dark:text-white"
                    >
                        <option
                            className="text-gray-500 dark:text-gray-200"
                            value=""
                            disabled
                        >
                            Select transaction type
                        </option>
                        {Object.values(TransactionType).map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-center items-center gap-4 pt-4">
                    <motion.button
                        whileHover={{ scale: 1.02, borderRadius: '12px' }}
                        transition={{ duration: 0.05, type: 'spring' }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex-1 cursor-pointer px-6 py-3 duration-200 bg-linear-to-r from-cyan-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-800 transition-all shadow-md hover:shadow-lg"
                    >
                        <AnimatePresence mode="wait">
                            {submitting ? (
                                <motion.p
                                    key={message}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-amber-700 dark:text-amber-400 font-medium text-lg"
                                >
                                    {message}
                                </motion.p>
                            ) : (
                                <span>Predict Fraudulence</span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                    <motion.button
                        whileHover={{
                            scale: 1.2,
                            borderRadius: '16px',
                        }}
                        transition={{
                            duration: 0.05,
                            type: 'spring',
                        }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-3 cursor-pointer bg-red-500 dark:bg-red-700 text-white hover:text-black dark:text-gray-200 font-semibold rounded-lg hover:bg-red-300 dark:hover:bg-red-500 transition-all shadow-md hover:shadow-lg"
                    >
                        Reset
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
}

function LabelledInput({
    label,
    value,
    placeholder,
    onChange,
    description,
    min,
    max,
}: {
    label: string;
    value: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    description?: string;
    min?: number;
    max?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
        >
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <input
                type="number"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                max={max}
                className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
            {description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
