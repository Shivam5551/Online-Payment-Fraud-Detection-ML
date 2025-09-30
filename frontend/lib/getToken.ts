import { randomBytes } from 'crypto';
import prisma from './singletonPrisma';

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

export default async function getToken(email: string): Promise<string> {
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
