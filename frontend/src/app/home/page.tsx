//home/page.tsx
import ParticlesComponent from '@/components/particle';
import React from 'react';
import Image from 'next/image';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import QuizWrapper from '@/components/landing_page_quiz';
import ClientCourseFilteringWrapper from '@/components/clientCourseFilteringWrapper';

// import CourseFilteringSection from '@/components/course_filtering_section';

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
                    background: 'linear-gradient(to bottom right, #FFCB91, #FE7474)',
                }}
            ></div>

            {/* Foreground content */}
            <div className="relative flex flex-col min-h-screen">
                <div className='z-3'><Navbar activePage='' /></div>

                <main className="flex-1 relative z-5"> {children}</main>
                <div className='z-[2]'><ParticlesComponent /></div>
                <div className='relative z-[1]'><Footer /></div>
            </div>
        </div>
    );
};

const Home = () => {

    return (
        <Layout>

            <div className="container mx-auto pt-200 pb-20 flex-grow relative">
                {/* Gradient Text Layer */}
                <p
                    className="text-[7.4rem] font-bold text-center mb-8 absolute top-20 left-1/2 transform -translate-x-1/2 z-10"
                    style={{
                        background: 'linear-gradient(to left, #FE7474, #FFCB91)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    ENGRLeaks
                </p>
                {/* Shadowed Text Behind */}
                <p
                    className="text-[7.4rem] font-bold text-center mb-8 absolute top-20 left-1/2 transform -translate-x-1/2"
                    style={{
                        background: 'linear-gradient(to left, #FE7474, #FFCB91)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                        zIndex: -1,
                    }}
                >
                    ENGRLeaks
                </p>

                <p className="whitespace-nowrap text-white text-[7.5rem] font-bold text-center mb-8 absolute top-48 left-1/2 transform -translate-x-1/2"
                    style={{ textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
                >
                    Start Learning Today!
                </p>
                <p className="whitespace-nowrap text-white text-[2rem] font-bold text-center mb-8 absolute top-86 left-1/2 transform -translate-x-1/2"
                    style={{ textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)' }}
                >
                    Try this below
                </p>

                <div className="absolute top-100 left-1/2 transform -translate-x-1/2 w-20 h-20 animate-bounce">
                    <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={4} fill="none" stroke="url(#grad1)">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FE7474" />
                                <stop offset="100%" stopColor="#FFCB91" />
                            </linearGradient>
                        </defs>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={4} fill="none" stroke="url(#grad1)" className='absolute top-8'>
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FE7474" />
                                <stop offset="100%" stopColor="#FFCB91" />
                            </linearGradient>
                        </defs>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                <div className="absolute flex top-190 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto mt-0 p-0 pt-2 pb-2 shadow-lg w-full h-[470px] z-10"
                    style={{
                        background: 'linear-gradient(to left, #FE7474, #FFCB91)',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <div className="relative top-0 left-0 w-1/2 h-full overflow-hidden">
                        <Image src="/images/code.png" alt="Background" fill className="object-cover" priority />
                    </div>
                    <div className="relative top-0 right-0 w-1/2 h-full overflow-hidden">
                        <QuizWrapper />
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center w-full h-full bg-white mt-80" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <div className="flex flex-col">
                        <div className='p-10'>
                            <h2 className="text-6xl font-bold mb-4 overflow-hidden"
                                style={{
                                    background: 'linear-gradient(to right, #FE7474, #FFCB91)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Welcome to ENGRLeaks
                            </h2>
                            <ul className="text-[1.5rem] font-bold list-disc list-inside text-gray-700">
                                <li>An e-learning platform designed for personalized and flexible online education</li>
                                <li>Suitable for students, professionals, and lifelong learners</li>
                                <li>Empowers users to take control of their learning journey</li>
                                <li>Learn your way—anytime, anywhere</li>
                            </ul>
                        </div>
                    </div>

                    <div className='flex flex-row items-center justify-end h-full'>
                        <Image src="/images/tu01.jpg" alt="Web icon" width={550} height={0} className="object-cover h-full" priority />
                    </div>
                </div>

                <div className='flex flex-row items-center justify-center w-full h-full mt-30'>
                    <h2 className="text-8xl font-bold mb-4 overflow-hidden text-white text-shadow-lg">
                        All Courses Now
                    </h2>
                </div>

                {/* <CourseFilteringSection/> */}
                <ClientCourseFilteringWrapper />

                

            </div>
        </Layout>
    );
};

export default Home;