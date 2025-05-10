import axios from "axios";
import React, { useEffect, useState } from "react";

type EnrollmentTableParameters = {
    id: number
    title: string;
    progress: string;
    enrollDate: string;
    status: string;
};

interface Course {
    id: number;
    course_name: string;
    total_lessons: number;
}

interface Enrollment {
    id: number;
    course_id: string;
    course__course_name: string;
    total_lesson: number;
    learned_lesson: number;
}

export default function StudentDetailTable() {

    const [selectedStudent, setSelectedStudent] = useState("");
    const [users, setUsers] = useState<{ id: number; email: string; account_name: string; name: string; surname: string; role: string; created_at: string }[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<EnrollmentTableParameters[]>([]);

    

    const retrieveUsers = async () => {
        try {
            const res = await axios.get("https://engrleaks-backend.onrender.com/users/");
            if (res.status === 200) {
                const usersData = res.data.users;

                const blankUser = {
                    id: 0,
                    email: "",
                    account_name: "",
                    name: "",
                    surname: "",
                    role: "",
                    created_at: ""
                };

                const updatedUsersData = [blankUser, ...usersData];

                setUsers(updatedUsersData);
            } else {
                console.error("Failed to retrieve users:", res.statusText);
            }
        } catch (error) {
            console.error("Error retrieving users:", error);
        }
    }

    const retrieveUsersEnrolledCourses = async (studentId: string) => {
        let formattedData: EnrollmentTableParameters[] = [];
        let idx = 1;
        try {
            const res = await axios.get(`https://engrleaks-backend.onrender.com/enrollments/${studentId}/`);
            if (res.status === 200) {
                const enrollments = res.data.enrollments;
                for (const e of enrollments) {
                    try {
                        const courseRes = await axios.get(`https://engrleaks-backend.onrender.com/courses/${e.course_id}/`);
                        if (courseRes.status === 200) {
                            const rawDate = courseRes.data.created_at;
                            const formattedDate = new Date(rawDate).toLocaleDateString('en-GB');
                            const formatted = {
                                id: idx,
                                title: courseRes.data.course_name,
                                progress: `${e.learned_lesson.length}/${courseRes.data.total_lessons}`, // Assuming learned_lesson is a number
                                enrollDate: formattedDate,
                                status: (e.learned_lesson.length === courseRes.data.total_lessons) ? 'Completed' : 'On-going'
                            };
                            formattedData.push(formatted);
                            idx++;
                        }
                    } catch (error) {
                        console.error('Error fetching course:', error);
                    }
                }
                setEnrolledCourses(formattedData);
            } else {
                console.error("Failed to retrieve enrollments:", res.statusText);
            }
        } catch (error) {
            console.error("Error retrieving users courses:", error);
        }
    };

    useEffect(() => {
        retrieveUsers();
    }, []);

    useEffect(() => {
        if (selectedStudent) {
            retrieveUsersEnrolledCourses(selectedStudent);
        }
    }, [selectedStudent]);

    return (
        <div className="flex flex-col my-4">
            <div className="flex justify-between items-center">
                <select
                    className="w-1/3 p-2 text-[#AA5B5B] font-medium bg-white border border-[#851515] border-2 rounded focus:outline-none"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                >
                    {users.map((user: { id: number; name: string; surname: string }) => (
                        <option key={user.id} value={user.id.toString()} className="hover:bg-[#F5D0D0]">
                            {user.name} {user.surname}
                        </option>
                    ))}
                </select>
            </div>
            <div className="z-2 my-2 bg-white p-8 rounded-lg shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#851515] text-white">
                            <th className="border border-gray-300 px-4 py-2">Number</th>
                            <th className="border border-gray-300 px-4 py-2">Course</th>
                            <th className="border border-gray-300 px-4 py-2">Progress</th>
                            <th className="border border-gray-300 px-4 py-2">Enroll date</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledCourses.length > 0 ? (
                            enrolledCourses.map((enroll, index) => (
                                <tr key={enroll.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{enroll.title}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">{enroll.progress}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {enroll.enrollDate}
                                    </td>
                                    <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                        <div className={`${enroll.status === 'Completed' ? 'bg-[#28A745]' : 'bg-yellow-500'} text-white w-20 py-1 text-center rounded w-25`}>
                                            {enroll.status}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}