//course_filtering_section.tsx
'use client';

import React from 'react';
import CourseCard from '@/components/course_card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@/components/search_bar';
import { useCourseFilter } from '@/app/hooks/useCourseFilter';

const courses = [
    {
        title: "HTML",
        lecturer: "Akkrawoot Takhom",
        description: "Lorem ipsum dolor sit amet...",
        totalLessons: 20,
        totalExercises: 40,
        status: "Resume",
    },
    {
        title: "CSS",
        lecturer: "Worayot Liamkaew",
        description: "Lorem ipsum dolor sit amet...",
        totalLessons: 20,
        totalExercises: 40,
        status: "Enroll now!",
    },
    {
        title: "JS",
        lecturer: "Siwasit Saengnikun",
        description: "Lorem ipsum dolor sit amet...",
        totalLessons: 20,
        totalExercises: 40,
        status: "Finished",
    },
    {
        title: "JS",
        lecturer: "Siwasit Saengnikun",
        description: "Lorem ipsum dolor sit amet...",
        totalLessons: 20,
        totalExercises: 40,
        status: "Unenroll",
    },
];

const CourseFilteringSection = () => {
    const {
        query,
        setQuery,
        active,
        toggleSwitchButton,
        sortedCourses,
    } = useCourseFilter(courses);

    return (
        <>
            <div className="flex flex-row items-center justify-center w-full h-full mt-0 space-x-8">
                <SearchBar onSearch={setQuery} />

                <div className="space-x-4">
                    {['Title', 'Lecturer'].map((label) => (
                        <button
                            key={label}
                            className="shadow-lg py-2 px-4 h-14 rounded-lg inline-block flex place-items-center"
                            style={{
                                color: active === label ? 'white' : '#851515',
                                background: active === label ? '#851515' : 'white',
                            }}
                            onClick={() => toggleSwitchButton(label as 'Title' | 'Lecturer')}
                        >
                            <span className="text-3xl flex place-items-center space-x-2">
                                <FontAwesomeIcon icon={faArrowDownWideShort} />
                                <span>{label}</span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-16 mt-14 place-items-center">
                {sortedCourses.map((course, index) => (
                    <CourseCard
                        key={index}
                        title={course.title}
                        lecturer={course.lecturer}
                        description={course.description}
                        totalLessons={course.totalLessons}
                        totalExercises={course.totalExercises}
                        status={course.status}
                    />
                ))}
            </div>
        </>
    );
};

export default CourseFilteringSection;
