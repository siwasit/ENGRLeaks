import { getCsrfTokenFromCookies } from "@/utils/getCsrfToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// { id: 1, name: "HTML Introduction", size: "284 bytes", date: "7/5/2568", creator: "Siwasit Saengnikun" }
type CourseTableParam = {
    id: number,
    name: string,
    size: string,
    date: string,
    creator: string
}

const jsonSizeCalculate = async (data: string) => {
    try {
        const dataSize = new TextEncoder().encode(JSON.stringify(data)).length;
        return dataSize.toString();
    } catch (error) {
        console.error("Error fetching data:", error);
        return '0';
    }
};

export default function CourseTable() {

    const [courses, setCourses] = useState<{ id: number; creator: string; course_name: string; course_description: string; total_lessons: number; total_exercises: number; created_at: string }[]>([]);
    
    const [selectedCourse, setSelectedCourse] = useState("0");
    const [tableData, setTableData] = useState<CourseTableParam[]>([]);

    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const router = useRouter();
    const routerRoute = useRouter

    const retrieveCourse = async () => {
        try {
            const res = await axios.get(`http://engrleaks-backend.onrender.com/courses/`);
            if (res.status === 200) {
                const coursesData = Array.isArray(res.data) ? res.data : [];

                const blankCourse = {
                    id: 0,
                    creator : "",
                    course_name: "",
                    course_description: "",
                    total_lessons: "",
                    total_exercises: "",
                    created_at: ""
                };

                const updatedCourseData = [blankCourse, ...coursesData];

                // console.log(updatedCourseData);
                setCourses(updatedCourseData);
            } else {
                console.error("Failed to retrieve courses:", res.statusText);
            }
        } catch (error) {
            console.error("Error retrieving courses:", error);
        }
    }

    const handleLessonDelete = async (lesson_id: string) => {
        const csrfToken = getCsrfTokenFromCookies();
        try {
            await axios.delete(`http://engrleaks-backend.onrender.com/delete_lessons/${lesson_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Use the fetched CSRF token
                },
                withCredentials: true, // Include cookies in the request
            });
            // retrieveCourse();
            if (selectedCourse) {
                await retrieveLessonByCourseId(selectedCourse)
            }
            // window.location.reload()
        } catch (error) {
            console.error('Error during unenrollment:', error);
        }
    }

    const retrieveLessonByCourseId = async (course_id: string) => {
        try {
            const res = await axios.get(`http://engrleaks-backend.onrender.com/lessons/course/${course_id}`);
            if (res.status === 200) {
                const lessons = res.data.lessons;

                let data = [];
                for (let lesson of lessons) {
                    const rawDate = lesson.created_at;
                    const formattedDate = new Date(rawDate).toLocaleDateString('en-GB');
                    const size = await jsonSizeCalculate(lesson.body);
                    data.push(
                        {
                            id: lesson.id,
                            name: lesson.lesson_name,
                            size: size === '1' ? size + ' byte' : size + ' bytes',
                            date: formattedDate,
                            creator: lesson.creator ?? 'null'
                        }
                    );
                }
                setTableData(data);
            } else {
                console.error("Failed to retrieve courses:", res.statusText);
            }
        } catch (error) {
            console.error("Error retrieving course:", error);
        }
    }
    
    useEffect(() => {
        retrieveCourse();
    }, [])

    useEffect(() => {
        if (selectedCourse) {
            retrieveLessonByCourseId(selectedCourse);
        }
    }, [selectedCourse]);
    
    return (
        
        <div className="flex flex-col my-4">
            <div className="flex justify-between items-center">
                <select
                    className="w-1/3 p-2 text-[#AA5B5B] font-medium bg-white border border-[#851515] border-2 rounded focus:outline-none"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                >
                    {courses.map((c: { id: number; creator: string; course_name: string; course_description: string; total_lessons: number; total_exercises: number; created_at: string }) => (
                        <option key={c.id} value={c.id.toString()} className="hover:bg-[#F5D0D0]">
                            {c.course_name}
                        </option>
                    ))}
                </select>
                
                <button
                    className="relative cursor-pointer text-[20px] py-1 text-white px-4 rounded-lg inline-block"
                    style={ selectedCourse === '0' ? {
                        background: 'linear-gradient(to bottom right, #A9A9A9, #D3D3D3)', // Disabled color
                        cursor: 'not-allowed',
                    } : {
                        background: 'linear-gradient(to bottom right, #FE7474, #FFCB91)',
                    }}
                    onClick={() => {
                        if (selectedCourse !== '0') {
                            router.push(`/addlesson/${Number(selectedCourse)}`);
                        }
                    }}
                    disabled={selectedCourse === '0'}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[#C5211C] opacity-25 rounded-lg"></div>
                    <span className="relative z-10 font-medium">Add lesson</span>
                </button>
            </div>
            <div className="z-2 my-2 bg-white p-8 rounded-lg shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#851515] text-white">
                            <th className="border border-gray-300 px-4 py-2">Number</th>
                            <th className="border border-gray-300 px-4 py-2">Lesson Name</th>
                            <th className="border border-gray-300 px-4 py-2">Content Size (byte)</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                            <th className="border border-gray-300 px-4 py-2">Create By</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (tableData.length > 0) ?
                        tableData
                        .map((lesson, index) => (
                            <tr key={lesson.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{lesson.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">
                                    {lesson.size}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{lesson.date}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{lesson.creator}</td>
                                <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                    {/* <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">Edit</button> */}
                                    <button 
                                        className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors"
                                        onClick={() => {
                                            const confirmed = window.confirm("Are you sure you want to delete this lesson?");
                                            if (confirmed) {
                                                handleLessonDelete(lesson.id.toString())
                                            }
                                          }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) : (
                        <tr>
                            <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}