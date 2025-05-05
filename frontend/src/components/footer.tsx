import Image from 'next/image';
import React from 'react';
import { FaGithub as Github } from 'react-icons/fa'; // Import Github icon
import { BiLogoGmail } from 'react-icons/bi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#851515] text-white py-6 px-6 md:px-10">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex items-center mb-4">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={283} // Adjust width as needed
                        height={80} // Adjust height as needed
                    />
                </div>
                <p className="text-sm mb-2">Designed and Developed by</p>
                <div
                    style={{
                        width: '350px',
                        height: '2px',
                        backgroundColor: 'white',
                        margin: '0 0',
                    }}
                ></div>
                <div className="flex items-center justify-center mb-4">
                    <p className="text-md font-semibold mr-2">Siwasit Saengnikun & Worayot Liamkaew</p>
                </div>
                <div className="flex items-center gap-4">
                    <div
                        className="flex items-center text-sm hover:opacity-80 transition-opacity"
                    >
                        <BiLogoGmail className="mr-1 h-4 w-4" />
                        scig80114@gmail.com
                    </div>
                    <a
                        href="https://github.com/Siwasit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm hover:opacity-80 transition-opacity"
                    >
                        <Github className="mr-1 h-4 w-4" />
                        github.com/Siwasit
                    </a>

                    <a
                        href="https://github.com/Worayot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm hover:opacity-80 transition-opacity"
                    >
                        <Github className="mr-1 h-4 w-4" />
                        github.com/Worayot
                    </a>
                </div>
                <p className="text-xs mt-4">
                    &copy; {currentYear} ENGRLeaks E-Learning. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;