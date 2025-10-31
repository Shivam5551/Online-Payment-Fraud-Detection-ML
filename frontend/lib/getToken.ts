'use server';
import { randomBytes } from 'crypto';
import prisma from './singletonPrisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

async function generateToken(email: string): Promise<string> {
    const token = 'token-' + randomBytes(30).toString('hex');
    await prisma.user.update({
        where: {
            email,
        },
        data: {
            token,
        },
    });
    return token;
}

export default async function getToken(): Promise<string> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        throw new Error('User is not authenticated');
    }
    const email: string = session.user.email;
    const existingToken = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            token: true,
        },
    });
    if (existingToken && existingToken.token) {
        return existingToken.token;
    }
    return await generateToken(email);
}
