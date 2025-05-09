// CourseCard.tsx
import React from 'react';

interface CourseCardProps {
    title: string;
    lecturer: string;
    description: string;
    totalLessons: number;
    totalExercises: number;
    status: string;
    course_id: number;
    callable?: (id: number) => void;
}

// Simplified cn function (if you don't have a utility library)
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    lecturer,
    description,
    totalLessons,
    totalExercises,
    status,
    course_id,
    callable
}) => {
    let statusColor = '';

    switch (status) {
        case 'Resume':
            statusColor = 'bg-[#FFB915] text-[24px] text-white';
            break;
        case 'Enroll Now!':
            statusColor = 'bg-rose-300 text-[24px] text-white';
            break;
        case 'Finished':
            statusColor = 'bg-green-500 text-[24px] text-white';
            break;
        case 'Unenroll':
            statusColor = 'bg-red-500 text-[24px] text-white';
            break;
        default:
            statusColor = 'bg-pink-400 text-[24px] text-white';
            break;
    }

    return (
        <div
            className={cn(
                'rounded-lg shadow-lg',
                'flex flex-col md:flex-row items-start',
                'text-white w-full max-w-6xl', // Increased max width
                'bg-white',
                'overflow-hidden',
                'h-full'
            )}

            style={{
                boxShadow: '0 4px 4px rgba(193, 33, 28, 1)',
            }}
        >
            {/* Left Section (Course Title) */}
            <div className='flex h-full'>
                <div className="w-[400px] h-full flex items-center justify-center bg-gradient-to-r from-[#f2a074] to-[#f05f5e]">
                    <h1
                        className={cn(
                            'text-5xl font-bold text-white text-center break-words'
                        )}
                    >
                        {title}
                    </h1>
                </div>

            </div>


            {/* Right Section (Course Details) */}
            <div className="space-y-6 m-4 items-center justify-center"> {/* Increased spacing */}
                <div className="flex items-center gap-4">
                    <div className='text-[#851515] font-bold text-5xl'>
                        {title}
                    </div>
                    <span
                        className={cn(
                            'bg-gradient-to-r from-[#f2a074] to-[#f05f5e]',
                            'px-4 py-2 font-medium rounded-md', // Increased padding
                            'text-sm', // Increased text size
                            'md-0'
                        )}
                    >
                        {lecturer}
                    </span>

                </div>
                <div className="h-[2px] bg-gradient-to-r from-[#f2a074] to-[#f05f5e] mt-0"></div>
                <p className="text-base text-[#851515] leading-relaxed mt-0"> {/* Increased text size */}
                    {description}
                </p>
                <div className="flex items-center gap-3">
                    <span className={cn(
                        'bg-[#851515]',
                        'px-3 py-2 rounded-md', // Increased padding
                        'text-sm' // Increased text size
                    )}>
                        <span className="font-semibold">{totalLessons}</span> Lessons
                    </span>
                    <span className={cn(
                        'bg-[#851515]',
                        'px-3 py-2 rounded-md', // Increased padding
                        'text-sm' // Increased text size
                    )}>
                        <span className="font-semibold">{totalExercises}</span> Exercises
                    </span>
                </div>
                <div>
                    <button
                    onClick={() => callable?.(course_id)}
                        className={cn(
                            'w-50 py-2 rounded-md font-semibold', // Increased padding
                            statusColor,
                            'transition-colors duration-200',
                            'hover:cursor-pointer',
                            status === 'Resume' ? 'hover:bg-yellow-500' : '',
                            status === 'Unenroll' ? 'hover:bg-red-600' : '',
                            status === 'Finished' ? 'hover:bg-green-600' : '',
                            status === 'Enroll Now!' ? 'hover:bg-pink-400' : '',
                        )}
                    >
                        {status}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
