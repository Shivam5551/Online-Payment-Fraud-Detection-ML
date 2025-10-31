'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCallback, useEffect, useState } from 'react';
import LogoutButton from './logoutButton';

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 768);
            setIsDesktop(window.innerWidth > 768);
            setIsOpen(false);
            setIsLogoutOpen(false);
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    useEffect(() => {
        const hide = (event: MouseEvent) => {
            const menubarElement = window.document.getElementById('menubar');
            const logoutElement = document.getElementById('logout');
            const avatar = document.getElementById('avatar');
            if (
                avatar &&
                menubarElement &&
                !menubarElement.contains(event.target as Node) &&
                !avatar.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
            if (
                avatar &&
                logoutElement &&
                !logoutElement.contains(event.target as Node) &&
                !avatar.contains(event.target as Node)
            ) {
                setIsLogoutOpen(false);
            }
        };
        document.addEventListener('click', hide);
        return () => document.removeEventListener('click', hide);
    }, []);

    const showMenubar = useCallback(() => {
        if (isDesktop) {
            if (isLogoutOpen) {
                setIsLogoutOpen(false);
            } else {
                setIsLogoutOpen(true);
            }
        } else if (isMobile) {
            if (isOpen) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        }
    }, [isOpen, isMobile, isDesktop, isLogoutOpen]);

    useEffect(() => {
        const element = window.document.getElementById('menubar');
        if (element) {
            // console.log(element);
            if (isMobile && isOpen) {
                element.classList.remove('hidden');
                element.classList.add('block');
            } else if (isMobile && !isOpen) {
                element.classList.remove('block');
                element.classList.add('hidden');
            }
        }
    }, [isOpen, isMobile]);

    return (
        <div
            id="avatar"
            className="relative cursor-pointer"
            onClick={showMenubar}
        >
            <Avatar>
                <AvatarImage src="avatar.png" alt="@avatar" />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div
                id="logout"
                className={`${isDesktop && isLogoutOpen ? 'flex' : 'hidden'} absolute right-4 top-9`}
            >
                <LogoutButton />
            </div>
        </div>
    );
}
