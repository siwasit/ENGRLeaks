'use client';

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ParticlesComponent from "@/components/particle";
import { API } from "@/utils/api";
import { getCsrfToken } from "@/utils/getCsrfToken";
import axios from "axios";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

type EnrollmentTableParameters = {
    idx: number;
    id: number;
    title: string;
    progress: string;
    enrollDate: string;
    lecturer: string;
};

export type Enrollment = {
    user: string,
    course: string,
    learned_lesson: string[],
    course_id: number,
    user_id: number
};

export default function MyCoursesPage() {

    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [data, setData] = useState<EnrollmentTableParameters[]>([]);
    const router = useRouter();

    function getUserIdFromToken() {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            console.error('No access token found');
            return null;
        }

        try {
            const base64Url = access_token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            const decodedUserID = JSON.parse(jsonPayload);
            return decodedUserID.user_id;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }

    const retrieveEnrollment = async (): Promise<Enrollment[]> => {
        const userId = getUserIdFromToken();
        if (userId) {
            try {
                // enrollments/${userId}
                const res = await axios.get(API.enrollmentByUserId(userId));
                if (res.status === 200) {
                    const formatted: Enrollment[] = res.data.enrollments.map((enrollment: any) => ({
                        user: enrollment.user,
                        course: enrollment.course,
                        learned_lesson: enrollment.learned_lesson,
                        course_id: enrollment.course_id,
                        user_id: enrollment.user_id
                    }));
                    setEnrollments(formatted);
                    return formatted;
                }
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            }
        } else {
            console.error('Access token not found');
        }
        return [];
    };

    const retrieveCourseData = async () => {
        const fetchedEnrollments = await retrieveEnrollment();
        let data: EnrollmentTableParameters[] = [];
        let idx = 1;

        for (const enr of fetchedEnrollments) {
            try {
                // courses/${enr.course_id}
                const res = await axios.get(API.courseById(enr.course_id));
                if (res.status === 200) {
                    const rawDate = res.data.created_at;
                    const formattedDate = new Date(rawDate).toLocaleDateString('en-GB');
                    const formatted = {
                        idx: idx,
                        id: res.data.id,
                        title: res.data.course_name,
                        progress: `${enr.learned_lesson.length}/${res.data.total_lessons}`, // Update if real total lessons are available
                        enrollDate: formattedDate, // Replace with actual date if available
                        lecturer: res.data.creator_name,
                    };
                    data.push(formatted);
                    idx++;
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        }

        setData(data);
    };

    const handleUnenroll = async (course_id: number) => {
        const csrfToken = getCsrfToken();
        const user_id = getUserIdFromToken();
        
        if (!csrfToken) {
            console.error('CSRF Token not found.')
            return;
        }
        if (!user_id) {
            console.error('UID not found.')
            return;
        }
        
        try {
            // First await the CSRF token promise to get the actual token value
            const csrfResponse = await getCsrfToken();
            const csrfToken = csrfResponse.token; // Extract the token from response
            
            // delete_enroll
            await axios.delete(API.deleteEnroll, {
              data: {
                user_id: user_id,
                course_id: course_id,
              },
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken, // Now using the resolved token string
              },
              withCredentials: true,
            });
            
            retrieveCourseData();
          } catch (error) {
            console.error('Error during unenrollment:', error);
          }
    }

    useEffect(() => {
        retrieveCourseData();
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom right, #FFCB91, #FE7474)' }}>
            <div className='z-[1]'><ParticlesComponent /></div>
            <div className="absolute top-16 left-0 w-full h-[75vh] z-1"
                style={{
                    background: 'linear-gradient(to bottom, rgba(133, 21, 21, 1) 10%, rgba(133, 21, 21, 0) 80%)',
                }}
            ></div>

            <div className="z-3"><Navbar activePage="My Courses" /></div>
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
                        {data.map((course, index) => (
                            <tr key={course.id} className={index % 2 === 0 ? "" : "bg-gray-100"}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{course.title}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{course.progress}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{course.enrollDate}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{course.lecturer}</td>
                                <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                    <button 
                                        className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors"
                                        onClick={() => {
                                            const confirmed = window.confirm("Are you sure you want to unenroll from this course?");
                                            if (confirmed) {
                                              handleUnenroll(course.id);
                                            }
                                        }}
                                    >
                                        Unenroll
                                    </button>
                                    <button
                                        className="bg-[#28A745] cursor-pointer text-white w-20 py-1 rounded hover:bg-green-500 transition-colors"
                                        onClick={() => router.push(`/course/${course.id}`)}
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
            <div className="z-0">
                <Footer />
            </div>
        </div>
    );
}
