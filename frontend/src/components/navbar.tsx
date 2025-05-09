'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode; // Optional icon
}

const authenticatedNavItems: NavItem[] = [
    { label: 'Courses', href: '/' },
    { label: 'My Courses', href: '/mycourses' },
    { label: 'Profile', href: '/profile' },
    // { label: 'Sign in', href: '/' },
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
            const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                refresh: refresh_token,
            });

            // Update the access token in localStorage
            localStorage.setItem('access_token', res.data.access);
        } catch (error) {
            console.error('Failed to refresh token', error);
        }
    };

    const handleSignIn = () => {
        router.push('/authenticate');  // Replace with your authentication page route
    };

    const getCsrfToken = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get_csrf/', {
                withCredentials: true,  // Include cookies in request
            });

            document.cookie = `csrftoken=${response.data.csrfToken}; path=/;`;
            return response
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    };

    const checkAccessToken = () => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            // Redirect to home page if no access token
            window.location.href = '/';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLogin(false);
        // router.push('/');  // Redirect to login page
        window.location.href = '/';
    };

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        const refresh_token = localStorage.getItem('refresh_token');
        if (access_token) {
            setIsLogin(true);
        } else {
            console.log('No token found');
        }
        if (!localStorage.getItem('csrf_token_initialized')) {
            getCsrfToken();
            localStorage.setItem('csrf_token_initialized', 'true');
        }
    }, []);  // Empty dependency array ensures it runs only on client-side mount

    return (
        <nav
            className="bg-[#851515] px-2 md:px-10"
        >
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
                    <div className='ml-4'>
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
                        )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;