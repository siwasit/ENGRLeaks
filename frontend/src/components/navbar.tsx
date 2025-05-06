import Image from 'next/image';
import React from 'react';

interface NavItem {
    label: string;
    href: string;
    icon?: React.ReactNode; // Optional icon
}

const navItems: NavItem[] = [
    { label: 'Courses', href: '/course' },
    { label: 'My Courses', href: '/my_course' },
    { label: 'Profile', href: '/profile' },
    // { label: 'Sign in', href: '/' },
];

const Navbar = () => {
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
                        {navItems.map((item) => (
                            <li key={item.label} className="group">
                                <a
                                    href={item.href}
                                    className="text-white font-bold text-[20px] hover:text-primary transition-colors flex items-center relative"
                                >
                                    {item.icon}
                                    {item.label}
                                    <span className="absolute bottom-[-5px] left-0 w-0 h-[3px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className='ml-4'>
                        <a href="/">
                            <button
                                className="bg-[#C5211C] py-2 px-4 rounded flex items-center justify-center hover:cursor-pointer hover:bg-[#E90B0B] transition-colors"
                                style={{ width: '120px', height: '40px' }}
                            >
                                <p className="text-white font-bold text-[20px]">
                                    Sign in
                                </p>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;