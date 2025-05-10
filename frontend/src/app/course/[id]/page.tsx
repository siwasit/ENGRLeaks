'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ParticlesComponent from "@/components/particle";
import CourseHeader from "@/templates/courseHeader";
import CourseImage from "@/templates/image_component";
import MultipleChoiceExercise from "@/templates/multipleChoiceExercise";
import Paragraph from "@/templates/paragraph";
import RunTimeIDE from "@/templates/runtimeIDE";
import RunTimeExercise from "@/templates/runtimeIDETest";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Lesson {
    body: string;
    [key: string]: any;
}

export default function CoursePage() {
    // const [isOpen, setIsOpen] = useState(false);
    const params = useParams();
    const course_id = params?.id as string;

    const [lessonsData, setLessonsData] = useState<Lesson[]>([]);
    const [courseName, setCourseName] = useState("");
    const [lessonIndex, setLessonIndex] = useState<number>(0);

    const retrieveAllLesson = async () => {
        try {
            const lessonsRes = await axios.get(`http://engrleaks-backend.onrender.com/lessons/course/${course_id}`);
            if (lessonsRes.status === 200) {
                const lessonsData = lessonsRes.data.lessons.map((lesson: Lesson) => {
                    return {
                        ...lesson,
                        body: JSON.parse(lesson.body)
                    };
                });
                // setLessonId(lessonsData[0].id)
                setLessonsData(lessonsData)
            }
        } catch (error) {
            console.error('Error fetching Lessons: ', error);
        }
    }

    const retrieveCourseName = async () => {
        try {
            const resCourseName = await axios.get(`http://engrleaks-backend.onrender.com/courses/${course_id}/`)
            if (resCourseName.status === 200) {
                setCourseName(resCourseName.data.course_name)
            }
        } catch (error) {
            console.error('Error fetching Course name: ', error);
        }
    }

    useEffect(() => {
        retrieveAllLesson();
        retrieveCourseName();
    }, [course_id])

    if (!course_id || course_id === '0') {
        return (<><p>ID not found</p></>);
    }

    return (
        <div className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom right, #FFCB91, #FE7474)' }}>
            <div className="absolute top-0 left-0 w-full h-[100vh] z-1"
                style={{
                    background: 'linear-gradient(to bottom, rgba(133, 21, 21, 1) 10%, rgba(133, 21, 21, 0) 80%)',
                }}
            ></div>
            <div className="z-2">
                <Navbar activePage="" />
            </div>
            <div className='z-[1]'><ParticlesComponent /></div>


            <div className="relative z-2 flex-grow flex items-center justify-center">
                <div className="bg-white flex w-full my-8 container rounded-lg">
                    {/* Navigator content */}
                    <div className="w-1/5 flex flex-col relative justify-start">
                        <div className="absolute w-full h-full" style={{ backgroundColor: '#E68A8D', opacity: 0.1 }}></div>
                        <div className="relative flex justify-between items-center text-[#851515] px-4">
                            <div className="absolute inset-0" style={{ opacity: 0.5, backgroundColor: '#E68A8D' }}></div>
                            <div className="relative text-[28px] font-bold">{courseName}</div>

                            {/* <span className="relative flex items-center justify-center h-10 w-10 hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 ml-2 transform transition-transform duration-300 rotate-180"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={4}
                                        style={{ marginLeft: 0 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 ml-2 transform transition-transform duration-300 rotate-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={4}
                                        style={{ marginLeft: 0 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </span> */}
                        </div>
                        {/* {isOpen &&
                            (
                                <div className={`absolute left-0 right-0 top-13 bg-[#FAD4D4] text-[#851515] border-t-3 border-[#851515] p-4 mt-2 shadow-lg ${isOpen ? 'z-10' : 'z-0'}`}>
                                    <ul className="space-y-2">
                                        <li className="text-[#851515] opacity-70 hover:opacity-100 cursor-pointer">HTML Beginer by siwasit</li>
                                        <li className="text-[#851515] opacity-70 hover:opacity-100 cursor-pointer">HTML Basic by siwasit</li>
                                        <li className="text-[#851515] opacity-70 hover:opacity-100 cursor-pointer">HTML Advance by siwasit</li>
                                    </ul>
                                </div>
                            )} */}
                        <div className="z-5">
                            <ul className="">
                                {lessonsData.map((lesson, index) => (
                                    <li key={index} className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer">
                                        <p className="pl-4" onClick={() => setLessonIndex(index)}>{lesson.lesson_name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* <div className="flex flex-col justify-center items-center mt-16 sticky top-1/2 transform -translate-y-1/2 gap-2">
                            <div className="relative w-4/5 h-8 bg-white rounded-lg overflow-hidden border-2 border-solid border-[#28A745]">
                                <div
                                    className="absolute top-0 left-0 h-8 rounded-r-lg h-full bg-[#28A745] transition-all duration-500"
                                    style={{ width: '50%' }} // Adjust the width percentage to reflect progress
                                ></div>
                            </div>
                            <div className="text-[#851515] text-[18px] font-bold">3/20 lesson finished</div>
                        </div> */}

                    </div>

                    {/* Main content */}
                    <div className="py-8 w-full">
                        <div className="flex flex-col w-full gap-4 w-4/5 bg-white py-8 px-16">
                            <div className="" id="tag-course-lesson">
                                <div className="text-[24px] text-center font-bold text-white bg-[#C5211C] px-4 py-2 rounded-md">{courseName}</div>
                                {/* <span className="absolute bottom-3 left-[15] w-4/5 h-[3px] bg-white"></span> */}
                            </div>

                            {lessonsData.map((lesson, index) => (
                                <div key={index}>

                                    {/* {item.type === "CourseHeader" && <CourseHeader title={detail.content} teacher_name={detail.initialTeacherName ?? ""} />}
                                    {detail.type === "Paragraph" && <Paragraph title={detail.initialTitle ?? ""} text={detail.content} />}
                                    {detail.type === "IDERuntimeTutorial" && <RunTimeIDE initialCode={detail.content} title="Tutorial" />}
                                    {detail.type === "IDERuntimeExercise" && <RunTimeExercise initialCode={detail.content} title="Exercise" instructions="Write an HTML heading that says 'Welcome to the IDE!' using an <h1> tag." expectedOutput="<h1>Welcome to the IDE!</h1>" />}
                                    {detail.type === "Image" && <CourseImage imageUrl={detail.src ?? ""} imageDescription={detail.content} />}
                                    {detail.type === "ExerciseChoice" && <MultipleChoiceExercise text={detail.content} options={["<link>", "<a>", "<href>", "<url>"]} correctIndex={1} />} */}
                                </div>
                            ))}

                            {/* <LessonRenderer content={lessonsData[lessonIndex].body}/> */}
                            <div>
                                {Array.isArray(lessonsData[lessonIndex]?.body) ? (
                                    lessonsData[lessonIndex]?.body.map((item: any, idx: number) => (
                                        <div key={idx}>
                                            {/* Render item properties here */}
                                            {item.type === "Paragraph" && <Paragraph title={item.title} text={item.content} />}
                                            {item.type === "CourseHeader" && <CourseHeader title={item.title} teacher_name={item.lecturer} />}
                                            {item.type === "IDERuntimeTutorial" && <RunTimeIDE initialCode={item.content} title="Tutorial" />}
                                            {item.type === "IDERuntimeExercise" && <RunTimeExercise initialCode={item.content} title="Exercise" instructions="Write an HTML heading that says 'Welcome to the IDE!' using an <h1> tag." expectedOutput="<h1>Welcome to the IDE!</h1>" />}
                                            {item.type === "Image" && <CourseImage imageUrl={item.src ?? ""} imageDescription={item.content} width={item.width} height={item.height}/>}
                                            {item.type === "ExerciseChoice" && <MultipleChoiceExercise text={item.question} options={item.choices} correctIndex={item.correctChoice - 1} />}
                                            {/* Add more conditions for other types */}
                                        </div>
                                    ))
                                ) : (
                                    <p>{JSON.stringify(lessonsData[lessonIndex]?.body)}</p>
                                )}
                            </div>

                        </div>
                        <div className="flex px-16 justify-between items-center w-full">
                            <button className={`flex ${lessonIndex === 0 ? '' : 'cursor-pointer hover:bg-[#5A6268]'} justify-center items-center mt-8 mb-4 bg-[#6C757D] text-white font-bold py-2 px-4 rounded transition-colors duration-300`}
                                onClick={() => {
                                    if (lessonIndex > 0) setLessonIndex(lessonIndex - 1);
                                }}
                                disabled={lessonIndex === 0}
                            >
                                <a href='#'>Previous Lesson</a>
                            </button>
                            <button className={`flex ${lessonIndex === lessonsData.length - 1 ? '' : 'cursor-pointer hover:bg-[#0056b3]'} justify-center items-center mt-8 mb-4 bg-[#007BFF] text-white font-bold py-2 px-4 rounded transition-colors duration-300`}
                                onClick={() => {
                                    lessonIndex < lessonsData.length - 1 && setLessonIndex(lessonIndex + 1)
                                }}
                                disabled={lessonIndex === lessonsData.length - 1}
                            >
                                <a href="#">Next Lesson</a>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {/* <div className="flex-grow"></div> */}
            <Footer />
        </div>

    );
}