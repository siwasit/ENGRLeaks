'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import ParticlesComponent from "@/components/particle";
import axios from "axios";
import { getCsrfTokenFromCookies } from "@/utils/getCsrfToken";

export default function ProfilePage() {
    const [accountName, setAccountName] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const router = useRouter();

    const getCsrfToken = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/get_csrf/', {
                withCredentials: true,  // Include cookies in request
            });

            document.cookie = `csrftoken=${response.data.csrfToken}; path=/;`;
            return response
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    };

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

    const retreiveProfile = async () => {
        const userId = getUserIdFromToken();
        if (userId) {
            try {
                const res = await axios.get(`http://localhost:8000/users/${userId}/`)
                if (res.status === 200) {
                    const userData = res.data;
                    setAccountName(userData.account_name);
                    setName(userData.name);
                    setSurname(userData.surname);
                    setEmail(userData.email);
                    setRole(userData.role);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        } else {
            console.error('Access token not found');
        }
    };

    const retreiveCourses = async () => {
        const userId = getUserIdFromToken();
        if (userId) {
            try {
                const res = await axios.get(`http://localhost:8000/enrollments/${userId}/`)
                if (res.status === 200) {
                    const userCourseData = res.data;
                    const courses = userCourseData.enrollments.map((course: any) => course.course);
                    setEnrolledCourses(courses);
                }
            } catch (error) {
                console.error('Error fetching user course:', error);
            }
        }

    };

    const handleChangeSubmit = async () => {
        const userId = getUserIdFromToken();
        const csrfToken = getCsrfTokenFromCookies(); // Fetch CSRF token

        if (!csrfToken) {
            alert('CSRF token not found. Please refresh the page.');
            return;
        }

        if (userId) {
            try {
                const response = await axios.post(
                    `http://localhost:8000/api/update_user/${userId}/`,
                    {
                        account_name: accountName,
                        name: name,
                        surname: surname,
                        email: email,
                        role: role,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrfToken,  // Use the fetched CSRF token
                        },
                        withCredentials: true,  // Include cookies in the request
                    }
                );
                console.log('Profile updated successfully:', response.data);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating user profile:', (error as any).response?.data ?? (error as any).message);
            }
        }
    };

    useEffect(() => {
        retreiveProfile();
        retreiveCourses();
        getCsrfToken();
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col" style={{ backgroundImage: 'url(/images/plain.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='z-[0]'><ParticlesComponent /></div>
            <div className="z-1"><Navbar activePage="Profile" /></div>

            <div className="flex relative justify-center items-center">
                <div className="absolute top-0 left-0 w-full h-full bg-[#FFCB91] opacity-30"></div>
                <div className="relative z-10 w-[75%] h-[75vh] bg-white my-14 rounded-3xl">
                    <div className="absolute left-0 h-full w-5 bg-[#28A745] rounded-l-3xl"></div>
                    <form className="flex flex-col items-center justify-center h-full p-10 space-y-4" onSubmit={(e) => { e.preventDefault(); handleChangeSubmit(); }}>
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
                            <select id="role" name="role" className="p-2 block w-1/2 focus:outline-none border-b-3" defaultValue={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <div className="w-full flex space-x-4">
                            <label htmlFor="enrolled_course" className="block text-[24px] font-bold text-[#851515]">Enrolled Course</label>
                            {enrolledCourses.map((course) => (
                                <div key={course} className="relative text-[24px] font-bold text-white px-4 rounded-lg inline-block"
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
                            <button onClick={() => router.push('/dashboard')} type="button" className="px-4 py-2 cursor-pointer bg-gray-500 text-white rounded-md shadow hover:bg-gray-600">Dashboard</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex-grow"></div>
            <Footer />
        </div>
    );
}