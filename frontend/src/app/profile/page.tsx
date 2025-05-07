'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useState } from "react";

export default function ProfilePage() {
    const [accountName, setAccountName] = useState("siwasitLnwza");
    const [name, setName] = useState("siwasit");
    const [surname, setSurname] = useState("saengnikun");
    const [email, setEmail] = useState("siwasit2546@gmail.com");
    const [role, setRole] = useState("teacher");
    const [enrolledCourses, setEnrolledCourses] = useState([
        "HTML Beginner",
        "HTML Intermediate",
        "HTML Advanced",
    ]);

    return (
        <div className="relative min-h-screen flex flex-col" style={{ backgroundImage: 'url(/images/plain.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Navbar activePage="Profile" />

            <div className="flex relative justify-center items-center">
                <div className="absolute top-0 left-0 w-full h-full bg-[#FFCB91] opacity-30"></div>
                <div className="relative z-10 w-[75%] h-[75vh] bg-white my-14 rounded-3xl">
                    <div className="absolute left-0 h-full w-5 bg-[#28A745] rounded-l-3xl"></div>
                    <form className="flex flex-col items-center justify-center h-full p-10 space-y-4">
                        <div className="w-full">
                            <label htmlFor="account_name" className="block text-[24px] font-bold text-[#851515]">Account Name</label>
                            <input type="text" id="account_name" value={accountName} onChange={(e) => setAccountName(e.target.value)} name="account_name" className="block w-1/2 focus:outline-none border-b-3" />
                        </div>

                        <div className="w-full flex space-x-4">
                            <div className="w-1/3">
                                <label htmlFor="name" className="block text-[24px] font-bold text-[#851515]">Name</label>
                                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full focus:outline-none border-b-3" />
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="surname" className="block text-[24px] font-bold text-[#851515]">Surname</label>
                                <input type="text" id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} className="block w-full focus:outline-none border-b-3" />
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block text-[24px] font-bold text-[#851515]">E-mail</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-1/2 focus:outline-none border-b-3" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="role" className="block text-[24px] font-bold text-[#851515]">Role</label>
                            <select id="role" name="role" className="p-2 block w-1/2 focus:outline-none border-b-3" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <div className="w-full flex space-x-4">
                            <label htmlFor="enrolled_course" className="block text-[24px] font-bold text-[#851515]">Enrolled Course</label>
                            {enrolledCourses.map((course, index) => (
                                <div key={index} className="relative text-[24px] font-bold text-white px-4 rounded-lg inline-block"
                                    style={{
                                        background: 'linear-gradient(to bottom right, #FE7474, #FFCB91)',
                                    }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-[#C5211C] opacity-25 rounded-lg"></div>
                                    <span className="relative z-10">{course}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-4 jusify-start w-full">
                            <button type="submit" className="px-4 py-2 cursor-pointer bg-green-500 text-white rounded-md shadow hover:bg-green-600">Save Changes</button>
                            <button type="button" className="px-4 py-2 cursor-pointer bg-gray-500 text-white rounded-md shadow hover:bg-gray-600">Dashboard</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex-grow"></div>
            <Footer />
        </div>
    );
}