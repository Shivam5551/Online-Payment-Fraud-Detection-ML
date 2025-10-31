/* eslint-disable @typescript-eslint/no-explicit-any */
// Creating or Checking the user exists

import prisma from './singletonPrisma';

export const userExists = async (user: any): Promise<boolean> => {
    if (user && user.email) {
        const isExists = await prisma?.user.findUnique({
            where: {
                email: user.email,
            },
        });
        return isExists ? true : false;
    }
    return false;
};

export const createUser = async (user: any, account: any) => {
    try {
        const newUser = await prisma?.user.create({
            data: {
                email: user.email,
                provider: account.provider.toUpperCase(),
            },
        });
        return newUser ? true : false;
    } catch (error) {
        console.error('Creating User error', error);
        return false;
    }
};
