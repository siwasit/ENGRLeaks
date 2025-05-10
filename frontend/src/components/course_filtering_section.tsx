'use client';
import React, { useMemo, useEffect, useState } from 'react';
import CourseCard from '@/components/course_card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@/components/search_bar';
import axios from 'axios';
import { Enrollment } from '@/app/mycourses/page';
import { useRouter } from 'next/navigation';
import { getCsrfTokenFromCookies } from '@/utils/getCsrfToken';
import { getUserIdFromToken } from '@/utils/getUserIdFromToken';


type Course = {
    course_id: number;
    course_name: string;
    creator: string;
    course_description: string;
    total_lessons: number;
    total_exercises: number;
};


export const useCourseFilter = (courses: Course[]) => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<'course_name' | 'creator' | null>(null);
    const [active, setActive] = useState<'course_name' | 'creator' | ''>('');

    const toggleSwitchButton = (field: 'course_name' | 'creator') => {
        if (active === field) {
            setActive('');
            setSortBy(null);
        } else {
            setActive(field);
            setSortBy(field.toLowerCase() as 'course_name' | 'creator');
        }
    };

    const filteredCourses = useMemo(() => {
        try {
            return courses.filter(course =>
                course.course_name.toLowerCase().includes(query.toLowerCase())
            );
        } catch (error) {
            console.error('Error filtering courses:', error);
            return [];
        }
    }, [courses, query]);

    const sortedCourses = useMemo(() => {
        try {
            if (!sortBy) return filteredCourses;
            return [...filteredCourses].sort((a, b) =>
                a[sortBy].localeCompare(b[sortBy])
            );
        } catch (error) {
            console.error('Error sorting courses:', error);
            return filteredCourses;
        }
    }, [filteredCourses, sortBy]);

    return {
        query,
        setQuery,
        sortBy,
        setSortBy,
        active,
        setActive,
        toggleSwitchButton,
        sortedCourses,
    };
};

type StatusParam = {
    course_id: number;
    progress: string;
    status: string;
}


const CourseFilteringSection = () => {
    const user_id = getUserIdFromToken();
    const [courses, setCourses] = useState<Course[]>([]);
    const router = useRouter()
    
    const [courseStatus, setCourseStatus] = useState<StatusParam[]>([]);

    const csrfToken = getCsrfTokenFromCookies();

    const handleCourseAction = async (status: string, course_id: number) => {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            console.log('here')
            router.replace('/authenticate')
            return;
        }

        if (status === 'Resume' || status === 'Finished') {
            router.push('/mycourses')
        } else if (status === 'Enroll Now!') {
            try {
                await axios.post(
                    `http://engrleaks-backend.onrender.com/add_enroll/`,
                    {
                        user_id: user_id,
                        course_id: course_id,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrfToken,  // Use the fetched CSRF token
                        },
                        withCredentials: true,  // Include cookies in the request
                    }
                )
                alert('Enrollment success')
                router.push('/mycourses')
            } catch (error) {
                console.error("Error enroll course:", error);
                return;
            }
        }
    }

    const retrieveStatusCourseUser = async (user_id: string): Promise<Enrollment[]> => {
        let formattedData: StatusParam[] = [];
        if (!user_id) {
            return [];
        }
        try {
            const res = await axios.get(`http://engrleaks-backend.onrender.com/enrollments/${user_id}/`);
            if (res.status === 200) {
                const formatted: Enrollment[] = res.data.enrollments.map((enrollment: any) => ({
                    user: enrollment.user,
                    course: enrollment.course,
                    learned_lesson: enrollment.learned_lesson,
                    course_id: enrollment.course_id,
                    user_id: enrollment.user_id
                }));

                for (const e of formatted) {
                    try {
                        const res = await axios.get(`http://engrleaks-backend.onrender.com/courses/${e.course_id}/`);
                        if (res.status === 200) {
                            const courseRes = res.data
                            if (e.course_id) {
                                const status = {
                                    course_id: courseRes.id,
                                    progress: `${e.learned_lesson.length}/${res.data.total_lessons}`, // Update if real total lessons are available
                                    status: (e.learned_lesson.length === courseRes.total_lessons) ? 'Finished' : 'Resume'
                                };
                                formattedData.push(status);
                            } else {
                                const status = {
                                    course_id: courseRes.id,
                                    progress: `null`, // Update if real total lessons are available
                                    status: 'Enroll Now!'
                                };
                                formattedData.push(status);
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching course:', error);
                    }
                }
                setCourseStatus(formattedData);
                // setEnrollments(formatted);
                return formatted;
            }
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
        return [];
    };

    useEffect(() => {
        // const access_token = localStorage.getItem('access_token');
        
        retrieveStatusCourseUser(user_id);
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://engrleaks-backend.onrender.com/courses/');
                if (res.status === 200) {
                    const formatted = res.data.map((course: any) => ({
                        course_id: course.id,
                        course_name: course.course_name,
                        creator: course.creator,
                        course_description: course.course_description,
                        total_lessons: course.total_lessons,
                        total_exercises: course.total_exercises,
                        // status: course.status,
                    }));
                    setCourses(formatted);

                }
            } catch (error) {
                console.error('Error fetching user courses:', error);
            }
        };

        fetchCourses();

    }, [user_id]);

    const {
        query,
        setQuery,
        active,
        toggleSwitchButton,
        sortedCourses,
    } = useCourseFilter(courses);

    return (
        <>

            <div className="flex items-center justify-center w-full h-full mt-0 space-x-4">
                <SearchBar onSearch={setQuery} />

                <div className="space-x-4">
                    {['course_name', 'creator'].map((label) => (
                        <button
                            key={label}
                            className="shadow-lg py-2 px-4 h-14 rounded-lg inline-block flex place-items-center"
                            style={{
                                color: active === label ? 'white' : '#851515',
                                background: active === label ? '#851515' : 'white',
                            }}
                            onClick={() => toggleSwitchButton(label as 'course_name' | 'creator')}
                        >
                            <span className="text-3xl flex place-items-center space-x-2">
                                <FontAwesomeIcon icon={faArrowDownWideShort} />
                                <span>{label === 'course_name' ? 'Title' : 'Lecturer'}</span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-16 mt-14 place-items-center">
                {sortedCourses.map((course, index) => (
                   <CourseCard
                   course_id={course.course_id}
                   key={index}
                   title={course.course_name}
                   lecturer={course.creator}
                   description={course.course_description}
                   totalLessons={course.total_lessons}
                   totalExercises={course.total_exercises}
                   status={courseStatus.find(c => c.course_id === course.course_id)?.status ?? "Enroll Now!"}
                   callable={() => handleCourseAction((courseStatus.find(c => c.course_id === course.course_id)?.status ?? "Enroll Now!"), course.course_id)}
                 />
                    
                ))}
            </div>
        </>
    );
};

export default CourseFilteringSection;
