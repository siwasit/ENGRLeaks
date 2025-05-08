'use client';

import React, { useMemo, useEffect, useState } from 'react';
import CourseCard from '@/components/course_card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@/components/search_bar';
import axios from 'axios';


type Course = {
    course_name: string;
    creator: string;
    course_description: string;
    total_lessons: number;
    total_exercises: number;
    status: string;
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


const CourseFilteringSection = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:8000/courses/');
                if (res.status === 200) {
                    const formatted = res.data.map((course: any) => ({
                        course_name: course.course_name,
                        creator: course.creator,
                        course_description: course.course_description,
                        total_lessons: course.total_lessons,
                        total_exercises: course.total_exercises,
                        status: course.status,
                    }));
                    console.log(formatted);
                    setCourses(formatted);
                
                }
            } catch (error) {
                console.error('Error fetching user courses:', error);
            }
        };

        fetchCourses();

    }, []);

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
                        key={index}
                        title={course.course_name}
                        lecturer={course.creator}
                        description={course.course_description}
                        totalLessons={course.total_lessons}
                        totalExercises={course.total_exercises}
                        status={course.status}
                    />
                ))}
            </div>
        </>
    );
};

export default CourseFilteringSection;
