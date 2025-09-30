'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LogIn() {
    return (
        <Link href={'/signin'}>
            <Button
                variant={'default'}
                className="transition-all transform duration-500 hover:rounded-xl"
            >
                Login
            </Button>
        </Link>
    );
}
