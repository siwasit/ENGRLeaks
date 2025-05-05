'use client';
import React from 'react';
import Image from 'next/image';
import { FaGithub as Github } from 'react-icons/fa'; // Import Github icon
import { BiLogoGmail } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import gsap from 'gsap';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Fixed background image */}
            <div className="absolute top-0 left-0 w-full h-[1000px] z-[-20]">
                <Image
                    src="/images/building.png"
                    alt="Background"
                    fill
                    className="object-fit"
                    priority
                />
            </div>

            {/* Gradient over the image */}
            <div className="absolute top-0 left-0 w-full h-[1000px] z-[-10]"
                style={{
                    background: 'linear-gradient(to bottom, rgba(133, 21, 21, 1) 10%, rgba(133, 21, 21, 0) 80%)',
                }}
            ></div>


            {/* Gradient below image that scrolls with page */}
            <div className="absolute top-[1000px] left-0 w-full h-full z-[-10]"
                style={{
                    background: 'linear-gradient(to bottom right, #FE7474, #FFCB91)',
                }}
            ></div>

            {/* Foreground content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <Layout>
            <div
                className="container mx-auto px-6 md:px-10   py-200 flex-grow relative"
                style={{ minHeight: '60vh' }}
            >
                <h1 className="text-4xl font-bold text-center mb-8 text-black">
                    
                </h1>
                {/* <p className="text-lg text-center text-black">
                    This is a Next.js website with a custom navbar and footer.
                </p> */}

            </div>
        </Layout>
    );
}

export default Home;