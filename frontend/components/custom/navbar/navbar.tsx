import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import NavItems from './navItems';
import { ModeToggle } from '@/components/ui/darkmodeToggle';
import Profile from './profile';
import LogIn from './login';

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <nav className="flex py-4 px-2 items-center justify-between">
            <h1 className="text-lg md:text-2xl font-bold dark:text-yellow-100 text-yellow-950">
                Transecta
            </h1>
            <NavItems id="menubar" />
            <div className="flex justify-center items-center gap-2">
                <ModeToggle />
                {session && session.user ? <Profile /> : <LogIn />}
            </div>
        </nav>
    );
}
