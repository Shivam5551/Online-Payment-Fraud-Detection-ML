'use client';

import { usePathname } from 'next/navigation';
import LogoutButton from './logoutButton';
import Link from 'next/link';

interface INavItems {
    title: string;
    route: string;
}

const navItems: INavItems[] = [
    { title: 'Home', route: '/' },
    { title: 'Predict', route: '/predict' },
];

export default function NavItems({ id }: { id: string }) {
    const route = usePathname();

    return (
        <div
            id={id}
            className="hidden bg-gray-200 dark:bg-black md:dark:bg-slate-950 shadow-xs transition-all duration-200 transform shadow-slate-900 dark:shadow-amber-100 md:shadow-none space-y-1 md:space-y-0 p-2 right-5 rounded-r-none z-10 rounded-b-xl top-9 md:rounded-none md:top-0 md:right-0 rounded-xl md:bg-accent absolute md:relative md:flex text-center items-center justify-between  md:gap-4"
        >
            {navItems.map((n, index) => {
                return (
                    <Link
                        href={n.route}
                        className={`text-base font-medium cursor-pointer bg-gray-100 dark:bg-slate-800  rounded-md p-1 md:p-0 md:dark:bg-slate-950  hover:text-black dark:hover:text-white hover:font-semibold transform duration-200 hover:scale-x-105 ${route === n.route ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-300'}`}
                        key={index}
                    >
                        {n.title}
                    </Link>
                );
            })}
            <div className="block pb-1 md:hidden w-full">
                <LogoutButton />
            </div>
        </div>
    );
}
