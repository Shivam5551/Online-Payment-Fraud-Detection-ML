import { authOptions } from '@/lib/authOptions';
import getToken from '@/lib/getToken';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                {
                    message: 'Unauthorized request',
                },
                { status: 401 }
            );
        }
        const { email }: { email: string | undefined } = await request.json();
        if (!email) {
            return NextResponse.json(
                {
                    message: 'Email address required',
                },
                { status: 403 }
            );
        }
        const token: string = await getToken(email);
        return NextResponse.json(
            {
                message: 'This token can be used for 10 times per month',
                token: token,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Token generation error:', error);
        return NextResponse.json(
            {
                message: 'Internal server error',
            },
            { status: 500 }
        );
    }
}
