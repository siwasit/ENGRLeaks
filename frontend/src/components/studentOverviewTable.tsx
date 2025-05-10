import { getCsrfTokenFromCookies } from "@/utils/getCsrfToken";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Student {
    id: number;
    name: string;
    surname: string;
    email: string;
    courses: string;
}

export default function StudentOverviewTable() {
    

    const [studentOverview, setStudentOverview] = useState<Student[]>([]);

    const handleDelete = async (studentId: number) => {
        const csrfToken = getCsrfTokenFromCookies(); // Assuming you have a function to get the CSRF token from cookies
        try {
            await axios.delete(`http://engrleaks-backend.onrender.com/delete_user/${studentId}/`
                , {
                    headers: {
                        "X-CSRFToken": csrfToken,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
            retrieveStudentOverview();
            window.location.reload();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    }

    const retrieveStudentOverview = async () => {
        try {
            const res = await fetch("http://engrleaks-backend.onrender.com/users/");
            if (res.status === 200) {
                const data = await res.json();
                const resCourses = await fetch("http://engrleaks-backend.onrender.com/enrollments/");
                if (resCourses.status === 200) {
                    const enrollmentsData = await resCourses.json();
                    const enrollments = enrollmentsData.enrollments;  // Corrected here

                    data.users.forEach((s: Student) => {
                        const courses = Array.isArray(enrollments)
                            ? enrollments
                                .filter((e: any) => e.user__id === s.id)
                                .map((e: any) => e.course__course_name)  // Use course name, not learned lessons
                            : [];
                        s.courses = courses.length > 0 ? courses.join(", ") : "No courses enrolled";
                    });
                    setStudentOverview(data.users);
                } else {
                    console.error("Failed to fetch courses:", resCourses.statusText);
                }
            } else {
                console.error("Failed to fetch student overview:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching student overview:", error);
        }
    };


    useEffect(() => {
        retrieveStudentOverview();
    }, []);


    return (
        <div className="flex flex-col my-4">
            <div className="text-[40px] font-bold leading-[1] text-white">All students</div>
            <div className="z-2 my-2 bg-white p-8 rounded-lg shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#851515] text-white">
                            <th className="border border-gray-300 px-4 py-2">User ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Surname</th>
                            <th className="border border-gray-300 px-4 py-2">E-mail</th>
                            <th className="border border-gray-300 px-4 py-2">Enrolled Courses</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentOverview.map((student, index) => (
                            <tr key={student.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{student.id}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{student.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{student.surname}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{student.email}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center w-75">{student.courses}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this student?")) {
                                                    handleDelete(student.id);
                                                }
                                            }}
                                            className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}