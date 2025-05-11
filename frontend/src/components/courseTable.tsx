import { API } from "@/utils/api";
import { getCsrfTokenFromCookies } from "@/utils/getCsrfToken";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CourseTable() {

    const [showModalCourse, setShowModalCourse] = useState(false);
    const [courseTitle, setCourseTitle] = useState("");
    const [description, setDescription] = useState("");
    const [totalLessons, setTotalLessons] = useState("");

    const [courseEditId, setCourseEditId] = useState<number | null>(null);
    const [courseEditTitle, setEditCourseTitle] = useState("");
    const [descriptionEdit, setEditDescription] = useState("");
    const [totalEditLessons, setEditTotalLessons] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    interface Course {
        id: number;
        course_name: string;
        course_description: string;
        total_lessons: number;
        enrollment_count: number;
        course_completion: number;
    }

    interface Enrollment {
        id: number;
        course__course_name: string;
        learned_lesson: number;
    }

    const [courseData, setCourseData] = useState<Course[]>([]);

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

    const handleAddCourse = (e: React.FormEvent) => {
        const userId = getUserIdFromToken();
        const csrfToken = getCsrfTokenFromCookies(); // Fetch CSRF token
        const newCourse = {
            course_name: courseTitle,
            description: description,
            total_lessons: totalLessons,
            creator_id: userId,
        };

        // add_course/
        axios.post(API.addCourse,
            newCourse,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Use the fetched CSRF token
                },
                withCredentials: true,  // Include cookies in the request
            }
        )
    }

    const retrieveCourseById = async (courseId: number) => {
        try {
            // courses/${courseId}/
            const res = await axios.get(API.courseById(courseId));
            if (res.status === 200) {
                const resCourseData = res.data;
                setCourseEditId(resCourseData.id);
                setEditCourseTitle(resCourseData.course_name);
                setEditDescription(resCourseData.description);
                setEditTotalLessons(resCourseData.total_lessons);
            }
        } catch (error) {   
            console.error("Error fetching course data:", error);
        }
    }

    const handleEditCourse = async (courseId: number) => {
        const csrfToken = getCsrfTokenFromCookies(); // Fetch CSRF token
        const updatedCourse = {
            course_name: courseEditTitle,
            description: descriptionEdit,
            total_lessons: totalEditLessons,
        };

        try {
            // update_course/${courseId}/
            await axios.post(API.updateCourse(courseId), updatedCourse, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Use the fetched CSRF token
                },
                withCredentials: true,  // Include cookies in the request
            })
            retrieveCourse();
        } catch (error) {
            console.error("Error updating course:", error);
        }
    }

    const handleDeleteCourse = async (courseId: number) => {
        const csrfToken = getCsrfTokenFromCookies(); // Fetch CSRF token
        try {
            // delete_course/${courseId}/
            await axios.delete(API.deleteCourse(courseId), {
                headers: {
                    'X-CSRFToken': csrfToken,  // Use the fetched CSRF token
                },
                withCredentials: true,  // Include cookies in the request
            })
            retrieveCourse();
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    }

    const retrieveCourse = async () => {
        const courseCount: Record<string, number> = {};
        try {
            // courses/
            const res = await axios.get(API.allCourses);
            if (res.status === 200) {
                const resCourseData = res.data;
                try {
                    // enrollments/
                    const resSum = await axios.get(API.allEnrollment)
                    if (res.status === 200) {
                        const resSummaryData = resSum.data;
                        resSummaryData.enrollments.forEach((enrollment: Enrollment) => {
                            const courseName = enrollment.course__course_name;
                            courseCount[courseName] = (courseCount[courseName] || 0) + 1;
                        });
                        resCourseData.forEach((course: Course) => {
                            const count = courseCount[course.course_name];
                            if (count) {
                                course.enrollment_count = count;
                            } else {
                                course.enrollment_count = 0;
                                course.course_completion = 0;
                            }
                        });
                        // let completedCourses = 0;
                        resSummaryData.enrollments.forEach((enrollment: Enrollment) => {
                            const learned_lesson = Array.isArray(enrollment.learned_lesson) ? enrollment.learned_lesson.length : 0;
                            const courseName = enrollment.course__course_name;

                            // Find the total lessons for the current course
                            const course = resCourseData.find((c: Course) => c.course_name === courseName);
                            const totalLessons = course ? course.total_lessons : 0;

                            // Calculate course completion
                            const completionRatio = learned_lesson / totalLessons;

                            // If the course is fully completed, increment the counter
                            if (course) {
                                course.course_completion ??= 0;
                                if (completionRatio === 1) {
                                    course.course_completion++;
                                }
                            } else {
                                console.warn(`Course not found for enrollment: ${courseName}`);
                            }
                        });
                        setCourseData(resCourseData);
                    }
                } catch (error) {
                    console.error("Error fetching enrollments:", error);
                }
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    useEffect(() => {
        retrieveCourse()
    }, [])

    return (
        <div className="flex flex-col my-4">
            <div className="flex justify-between items-center">
                <div className="text-[40px] font-bold leading-[1] text-white">All course</div>
                <button
                    className="relative cursor-pointer text-[20px] py-1 text-white px-4 rounded-lg inline-block"
                    style={{
                        background: 'linear-gradient(to right, #FFCB91, #FE7474)',
                    }}
                    onClick={() => setShowModalCourse(true)}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[#C5211C] opacity-25 rounded-lg"></div>
                    <span className="relative z-10 font-medium">Add course</span>
                </button>
                {showModalCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(254, 116, 116, 0.3)' }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                            <h2 className="text-[24px] font-bold mb-4 text-[#851515]">Add New Course</h2>
                            <form onSubmit={handleAddCourse}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Course Title</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={courseTitle}
                                        onChange={(e) => setCourseTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Total lesson</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={totalLessons}
                                        onChange={(e) => setTotalLessons(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className=" px-4 w-20 py-2 rounded border-2 border-[#C5211C] text-[#C5211C] hover:bg-[#C5211C] hover:text-white"
                                        onClick={() => setShowModalCourse(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#28A745] w-20 px-4 py-2 rounded hover:bg-green-500 text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(254, 116, 116, 0.3)' }}>
                        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Course Title</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={courseEditTitle}
                                    onChange={(e) => setEditCourseTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={descriptionEdit}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Total lesson</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    value={totalEditLessons}
                                    onChange={(e) => setEditTotalLessons(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => { 
                                        if (courseEditId !== null) {
                                            toggleModal(); 
                                            handleEditCourse(courseEditId); 
                                        } else {
                                            console.error("courseEditId is null");
                                        }
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="z-2 my-2 bg-white p-8 rounded-lg shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#851515] text-white">
                            <th className="border border-gray-300 px-4 py-2">Number</th>
                            <th className="border border-gray-300 px-4 py-2">Subject title</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Total Lessons</th>
                            <th className="border border-gray-300 px-4 py-2">Enrolled Students</th>
                            <th className="border border-gray-300 px-4 py-2">Course completion</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courseData.map((course, index) => (
                                <tr key={course.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{course.course_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">
                                        {course.course_description}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{course.total_lessons}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{course.enrollment_count}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{course.course_completion}</td>
                                    <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                        <button onClick={() => { toggleModal(); retrieveCourseById(course.id); }} className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">Edit</button>
                                        <button onClick={() => handleDeleteCourse(course.id)} className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}