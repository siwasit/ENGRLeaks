'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ParticlesComponent from "@/components/particle";
import CourseHeader from "@/templates/courseHeader";
import CourseImage from "@/templates/image";
import MultipleChoiceExercise from "@/templates/multipleChoiceExercise";
import Paragraph from "@/templates/paragraph";
import RunTimeIDE from "@/templates/runtimeIDE";
import RunTimeExercise from "@/templates/runtimeIDETest";
import React, { useState } from "react";

export default function CoursePage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(to bottom right, #FFCB91, #FE7474)' }}>
            <div className="absolute top-0 left-0 w-full h-[1000px] z-1"
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
                            <div className="relative text-[40px] font-bold">HTML</div>

                            <span className="relative flex items-center justify-center h-10 w-10 hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
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
                            </span>
                        </div>
                        {isOpen && (
                            <div className={`absolute left-0 right-0 top-13 bg-[#FAD4D4] text-[#851515] border-t-3 border-[#851515] p-4 mt-2 shadow-lg ${isOpen ? 'z-10' : 'z-0'}`}>
                                <ul className="space-y-2">
                                    <li className="text-[#851515] opacity-70 hover:opacity-100 cursor-pointer">HTML Beginer by siwasit</li>
                                    <li className="text-[#851515] opacity-70 hover:opacity-100 cursor-pointer">HTML Basic by siwasit</li>
                                    <li className="text-[#851515] opacity-70 hover:opacity-100 cursor-pointer">HTML Advance by siwasit</li>
                                </ul>
                            </div>
                        )}
                        <div className="z-5">
                            <ul className="">
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">HTML Introduction</p></li>
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">Basic HTML</p></li>
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">Tag Element</p></li>
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">HTML Introduction</p></li>
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">Basic HTML</p></li>
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">Tag Element</p></li>
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">HTML Introduction</p></li>
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">Basic HTML</p></li>
                                <li className="text-[#AA5B5B] text-[20px] hover:text-[#851515] hover:bg-[#FAE8E8] cursor-pointer"><p className="pl-4">Tag Element</p></li>
                            </ul>
                        </div>

                        
                        <div className="flex flex-col justify-center items-center mt-16 sticky top-1/2 transform -translate-y-1/2 gap-2">
                            <div className="relative w-4/5 h-8 bg-white rounded-lg overflow-hidden border-2 border-solid border-[#28A745]">
                                <div
                                    className="absolute top-0 left-0 h-8 rounded-r-lg h-full bg-[#28A745] transition-all duration-500"
                                    style={{ width: '50%' }} // Adjust the width percentage to reflect progress
                                ></div>
                            </div>
                            <div className="text-[#851515] text-[18px] font-bold">3/20 lesson finished</div>
                        </div>

                    </div>

                    {/* Main content */}
                    <div className="py-8 w-full">
                        <div className="flex flex-col w-full gap-4 w-4/5 bg-white py-8 px-16">
                            <div className="w-50" id="tag-course-lesson">
                                <div className="text-[24px] text-center font-bold text-white bg-[#C5211C] px-4 py-2 rounded-md">HTML lesson 1</div>
                                {/* <span className="absolute bottom-3 left-[15] w-4/5 h-[3px] bg-white"></span> */}
                            </div>

                            <CourseHeader title="HTML Introduction" teacher_name="Siwasit Saengnikun" />
                            <Paragraph
                                title="What is HTML?"
                                text="HTML (Hypertext Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. 
                            HTML is the foundation of all web pages. Without HTML, you wouldn't be able to create websites. Learning HTML is the first step in building web applications and understanding how the web works.
                            HTML (Hypertext Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript."
                            />
                            <CourseImage imageUrl="https://happycoding.io/tutorials/html/images/html-3.png" imageDescription="What is HTML actually" />
                            <Paragraph
                                title="How to center a div?"
                                text="HTML (Hypertext Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. 
                            HTML is the foundation of all web pages. Without HTML, you wouldn't be able to create websites. Learning HTML is the first step in building web applications and understanding how the web works.
                            HTML (Hypertext Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript."
                            />
                            <RunTimeIDE
                                initialCode={`<h1 style='color: red'>เป็นควยไร</h1>\n<h2 style='color: blue'>ขอโทษคับพี่</h2>`}
                                title="Example"
                            />
                            <RunTimeExercise
                                title="Exercise: Create a Heading"
                                instructions="Write an HTML heading that says 'Welcome to the IDE!' using an <h1> tag."
                                expectedOutput="<h1>Welcome to the IDE!</h1>"
                            />
                            <MultipleChoiceExercise
                                text="Which tag is used to create a hyperlink in HTML?"
                                options={["<link>", "<a>", "<href>", "<url>"]}
                                correctIndex={1}
                            />
                            <MultipleChoiceExercise
                                text="Which tag is used to create a hyperlink in HTML?"
                                options={["<link>", "<a>", "<href>", "<url>"]}
                                correctIndex={1}
                            />
                            <MultipleChoiceExercise
                                text="Which tag is used to create a hyperlink in HTML?"
                                options={["<link>", "<a>", "<href>", "<url>"]}
                                correctIndex={1}
                            />
                        </div>
                        <div className="flex px-16 justify-between items-center w-full">
                            <div className="flex justify-center items-center mt-8 mb-4">
                                <a href="#" className="bg-[#6C757D] text-white font-bold py-2 px-4 rounded hover:bg-[#5A6268] transition-colors duration-300">
                                    Previous Lesson
                                </a>
                            </div>
                            <div className="flex justify-center items-center mt-8 mb-4">
                                <a href="#" className="bg-[#007BFF] text-white font-bold py-2 px-4 rounded hover:bg-[#0056b3] transition-colors duration-300">
                                    Next Lesson
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    );
}