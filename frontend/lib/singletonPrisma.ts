import { PrismaClient } from './generated/prisma';

const PrismaClientSingleton = (): PrismaClient => {
    return new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
};

declare global {
    var prisma: ReturnType<typeof PrismaClientSingleton> | null;
}

const prisma = globalThis.prisma ?? PrismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}

export default prisma;
