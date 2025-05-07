import React from 'react';

export default function CourseHeader({ title, teacher_name }: { title: string; teacher_name: string }) {
    return (
       <>
        <div className="mb-8">
            <div className='text-[50px] font-bold text-[#C5211C]'>
                {title}
            </div>
            <hr className='border-t-4 border-[#851515] my-1' />
            <div className='flex gap-2 text-neutral-600 text-[24px]'><p className='font-medium'>Author:</p> {teacher_name}</div>
        </div>
       </>
    );
}