'use client';

import CourseTable from "@/components/courseTable";
import Footer from "@/components/footer";
import LessonTable from "@/components/lessonTable";
import Navbar from "@/components/navbar";
import StudentDetailTable from "@/components/studentDetail";
import StudentOverviewTable from "@/components/studentOverviewTable";
import React, { useState } from "react";

export default function dashboard() {

    const [active, setActive] = useState('Course');

    const toggle = () => {
        setActive((prev) => (prev === 'Course' ? 'Students' : 'Course'));
    };

    return (
        <div className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom right, #FFCB91, #FE7474)' }}>
            <Navbar activePage="" />
            <div className="absolute top-16 left-0 w-full h-[75vh] z-1"
                style={{
                    background: 'linear-gradient(to bottom, rgba(133, 21, 21, 1) 10%, rgba(133, 21, 21, 0) 80%)',
                }}
            ></div>
            <div className="px-16 py-4 z-2 flex flex-col w-full h-full space-y-2" id="content-header">
                <div
                    className="text-[96px] font-bold leading-[1]"
                    style={{
                        background: 'linear-gradient(to right, #FFCB91, #FE7474)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    ENGRLeaks Dashboard
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-white text-[28px]" style={{ letterSpacing: '0.05em' }}>Welcome teacher : Akkarawoot Takhom</div>
                    <div
                        className="flex items-center rounded-lg"
                    >
                        <button
                            className={`relative cursor-pointer py-1 px-4 w-30 rounded-l-lg inline-block transition-all duration-300 ${active === 'Course' ? 'text-white font-bold' : 'font-medium text-[#851515]'}`}
                            style={{
                                background: active === 'Course'
                                    ? 'linear-gradient(to right, #FFCB91, #FE7474)'
                                    : 'white',
                            }}
                            onClick={() => {
                                if (active !== 'Course') toggle();
                            }}
                        >
                            <div className={`absolute top-0 left-0 w-full h-full bg-[#C5211C] opacity-25 rounded-l-lg transition-opacity duration-300 ${active === 'Course' ? 'block' : 'hidden'}`}></div>
                            <span className="relative z-10 text-lg">Course</span>
                        </button>
                        <button
                            className={`relative cursor-pointer py-1 px-4 w-30 rounded-r-lg inline-block transition-all duration-300 ${active === 'Students' ? 'text-white font-bold' : 'font-medium text-[#851515]'}`}
                            style={{
                                background: active === 'Students'
                                    ? 'linear-gradient(to right, #FFCB91, #FE7474)'
                                    : 'white',
                            }}
                            onClick={() => {
                                if (active !== 'Students') toggle();
                            }}
                        >
                            <div className={`absolute top-0 left-0 w-full h-full bg-[#C5211C] opacity-25 rounded-r-lg transition-opacity duration-300 ${active === 'Students' ? 'block' : 'hidden'}`}></div>
                            <span className="relative z-10 text-lg">Students</span>
                        </button>
                    </div>
                </div>
                <hr className="border-3 border-white" />
            </div>

            <div className="px-16 py-4 z-2">
                {
                    active === 'Course' ? (
                        <div>
                            <CourseTable />
                            <LessonTable />
                        </div>
                    ) : (
                        <div>
                            <StudentOverviewTable />
                            <StudentDetailTable />
                        </div>
                    )
                }
            </div>


            <div className="flex-grow"></div>
            <Footer />
        </div>
    );
}   