'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useRouter } from 'next/navigation';
import React, {useState} from "react";

export default function MyCoursesPage() {

    const enrolledCourses = [
        { id: 1, title: "HTML Beginner", progress: "3/20", enrollDate: "7/5/2568", lecturer: "A. Takhom" },
        { id: 2, title: "HTML Intermediate", progress: "3/20", enrollDate: "7/5/2568", lecturer: "A. Takhom" },
        { id: 3, title: "HTML Advanced", progress: "3/20", enrollDate: "7/5/2568", lecturer: "A. Takhom" },
    ];

    const router = useRouter();

    const [courses, setCourses] = useState(enrolledCourses);

    return (
        <div className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom right, #FFCB91, #FE7474)' }}>
            <div className="absolute top-16 left-0 w-full h-[75vh] z-1"
                style={{
                    background: 'linear-gradient(to bottom, rgba(133, 21, 21, 1) 10%, rgba(133, 21, 21, 0) 80%)',
                }}
            ></div>
            <div className="z-2">
                <Navbar activePage="My Courses" />
            </div>
            
            <div className="z-2 mx-16 my-8 bg-white p-8 rounded-lg shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#851515] text-white">
                            <th className="border border-gray-300 px-4 py-2">Number</th>
                            <th className="border border-gray-300 px-4 py-2">Subject title</th>
                            <th className="border border-gray-300 px-4 py-2">Progress</th>
                            <th className="border border-gray-300 px-4 py-2">Enroll date</th>
                            <th className="border border-gray-300 px-4 py-2">Lecturer</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.id} className={index % 2 === 0 ? "" : "bg-gray-100"}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.title}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{course.progress}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{course.enrollDate}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{course.lecturer}</td>
                                <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                    <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">Unenroll</button>
                                    <button 
                                        className="bg-[#28A745] cursor-pointer text-white w-20 py-1 rounded hover:bg-green-500 transition-colors"
                                        onClick={() => router.push('/course')}
                                    >
                                        Resume
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="z-2 flex-grow"></div>
            <div className="z-2">
                <Footer />
            </div>
            
        </div>
    );
}