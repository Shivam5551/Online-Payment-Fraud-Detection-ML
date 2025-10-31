import { NextRequest, NextResponse } from 'next/server';
import { IFormPredict, TransactionType } from '@/types/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/singletonPrisma';
import { User } from '@/lib/generated/prisma';
type RequestBody = IFormPredict & { token: string; email?: string };
interface MLApiResponse {
    is_fraud: boolean;
}
export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as RequestBody;
        const {
            step,
            amount,
            oldbalanceDest,
            newbalanceDest,
            oldbalanceOrg,
            newbalanceOrig,
            transaction_type,
            token,
        } = body;
        let email: string | undefined = undefined;
        const session = await getServerSession(authOptions);
        if (!session && !body.email && !session?.user?.email) {
            return NextResponse.json(
                {
                    message: 'Unauthorized: No session or email provided.',
                    success: false,
                },
                { status: 401 }
            );
        }
        email = body.email || session.user.email;
        if (
            !step ||
            !amount ||
            !(
                transaction_type &&
                transaction_type.split(' ').join('') in TransactionType
            )
        ) {
            return NextResponse.json(
                {
                    message: 'Missing or invalid fields.',
                    success: false,
                },
                { status: 400 }
            );
        }
        if (!token) {
            return NextResponse.json(
                {
                    message: 'Missing authentication token.',
                    success: false,
                },
                { status: 401 }
            );
        }
        const user: User | null = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || user.token !== token) {
            return NextResponse.json(
                {
                    message: 'Unauthorized: Invalid token.',
                    success: false,
                },
                { status: 401 }
            );
        }
        // await (new Promise((resolve) => setTimeout(resolve, 5000)));
        const mlPayload = {
            step,
            amount,
            oldbalanceOrg,
            newbalanceOrig,
            oldbalanceDest,
            newbalanceDest,
            transaction_type,
        };
        const ml_api = process.env.ML_API || 'http://localhost:8080';
        const mlResponse = await fetch(`${ml_api}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mlPayload),
        });

        // 3. Handle errors from the ML API
        if (!mlResponse.ok) {
            const errorText = await mlResponse.text();
            console.error('ML API Error:', errorText);
            return NextResponse.json(
                {
                    message: 'Prediction service failed.',
                    success: false,
                },
                { status: 500 } // Internal Server Error
            );
        }

        // 4. Get the prediction data
        const predictionData = (await mlResponse.json()) as MLApiResponse;

        // --- END: ML API CALL ---
        return NextResponse.json(
            {
                message: 'Prediction successful.',
                success: true,
                data: {
                    isFraud: predictionData.is_fraud,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.log('Server prediction api error: ', error);
        return NextResponse.json(
            {
                message: 'Invalid JSON or Internal Server Error',
                success: false,
            },
            { status: 500 }
        );
    }
}
