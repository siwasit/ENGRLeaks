'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API } from '@/utils/api';

interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode; // Optional icon
}

const authenticatedNavItems: NavItem[] = [
    { label: 'Courses', href: '/' },
    { label: 'My Courses', href: '/mycourses' },
    { label: 'Profile', href: '/profile' },
];

const unauthenticatedNavItems: NavItem[] = [
    { label: 'Courses', href: '/' },
];

interface NavbarProps {
    activePage: string;
}

const Navbar: React.FC<NavbarProps> = ({ activePage }) => {

    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();

    const refreshToken = async () => {
        const refresh_token = localStorage.getItem('refresh_token');
        if (!refresh_token) {
            console.error('No refresh token found');
            return;
        }

        try {
            // /api/token/refresh/
            const res = await axios.post(API.refreshToken, {
                refresh: refresh_token,
            });

            localStorage.setItem('access_token', res.data.access);
        } catch (error) {
            console.error('Failed to refresh token', error);
        }
    };

    const handleSignIn = () => {
        router.push('/authenticate');
    };

    const getCsrfToken = async () => {
        try {
            // /api/get_csrf/
            const response = await axios.get(API.csrfToken, {
                withCredentials: true,
            });

            const csrfToken = response.data.csrfToken;

            // Set the CSRF token in a cookie directly
            document.cookie = `csrftoken=${csrfToken}; path=/;`;
            //('CSRF token set:', csrfToken);

            return csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    };

    const checkAccessToken = () => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            window.location.href = '/';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLogin(false);
        window.location.href = '/';
    };

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            setIsLogin(true);
        }

        const csrfTokenFromCookies = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];

        if (!csrfTokenFromCookies) {
            getCsrfToken(); // Fetch CSRF token if not found in cookies
        }
    }, []);  // Runs only once on component mount

    return (
        <nav className="bg-[#851515] px-2 md:px-10">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={283} // Adjust width as needed
                        height={80} // Adjust height as needed
                    />
                </div>
                <div className="flex items-center space-x-8">
                    <ul className="flex space-x-12">
                        {isLogin ? authenticatedNavItems.map((item) => (
                            <li key={item.label} className="group">
                                <a
                                    href={item.href}
                                    className={`text-white font-bold text-[20px] hover:text-primary transition-colors flex items-center relative 
                                        ${activePage === item.label ? 'text-primary' : ''}`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-[-5px] left-0 w-0 h-[3px] bg-white transition-all duration-300 group-hover:w-full 
                                        ${activePage === item.label ? 'w-full' : ''}`}></span>
                                </a>
                            </li>
                        )) : unauthenticatedNavItems.map((item) => (
                            <li key={item.label} className="group">
                                <a
                                    href={item.href}
                                    className={`text-white font-bold text-[20px] hover:text-primary transition-colors flex items-center relative 
                                        ${activePage === item.label ? 'text-primary' : ''}`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-[-5px] left-0 w-0 h-[3px] bg-white transition-all duration-300 group-hover:w-full 
                                        ${activePage === item.label ? 'w-full' : ''}`}></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="ml-4">
                        {isLogin ? (
                            <button
                                className="bg-[#C5211C] py-2 px-4 rounded flex items-center justify-center hover:cursor-pointer hover:bg-[#E90B0B] transition-colors"
                                style={{ width: '140px', height: '40px' }}
                                onClick={handleLogout}
                            >
                                <LogOut className="text-white h-5 w-5 mr-2" />
                                <p className="text-white font-bold text-[20px]">
                                    Sign out
                                </p>
                            </button>
                        ) : (
                            <button
                                className="bg-[#C5211C] py-2 px-4 rounded flex items-center justify-center hover:cursor-pointer hover:bg-[#E90B0B] transition-colors"
                                style={{ width: '120px', height: '40px' }}
                                onClick={handleSignIn}
                            >
                                <p className="text-white font-bold text-[20px]">
                                    Sign in
                                </p>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
