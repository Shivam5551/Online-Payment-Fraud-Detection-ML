'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

export default function LogoutButton() {
    return (
        <Button
            variant={'destructive'}
            className="shadow-md w-full shadow-red-200 md:shadow-lg z-20"
            onClick={() => signOut()}
        >
            <FaSignOutAlt />
            <span className="text-sm md:text-lg font-semibold">Logout</span>
        </Button>
    );
}
