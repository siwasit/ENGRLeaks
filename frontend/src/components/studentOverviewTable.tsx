import React, { useState } from "react";

export default function StudentOverviewTable() {

    const [showModalCourse, setShowModalCourse] = useState(false);
    const [courseTitle, setCourseTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="flex flex-col my-4">
            <div className="text-[40px] font-bold leading-[1] text-white">All students</div>
            <div className="z-2 my-2 bg-white p-8 rounded-lg shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#851515] text-white">
                            <th className="border border-gray-300 px-4 py-2">Number</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Surname</th>
                            <th className="border border-gray-300 px-4 py-2">E-mail</th>
                            <th className="border border-gray-300 px-4 py-2">Enrolled Courses</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Siwasit</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Saengnikun</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">siwasit2546@gmail.com</td>
                            <td className="border border-gray-300 px-4 py-2 text-center w-75">HTML Beginner, HTML Intermediate, HTML Advance</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex justify-center space-x-4">
                                    <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">
                                        Edit
                                    </button>
                                    <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Siwasit</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Saengnikun</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">siwasit2546@gmail.com</td>
                            <td className="border border-gray-300 px-4 py-2 text-center w-75">HTML Beginner, HTML Intermediate, HTML Advance</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex justify-center space-x-4">
                                    <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">
                                        Edit
                                    </button>
                                    <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Siwasit</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Saengnikun</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">siwasit2546@gmail.com</td>
                            <td className="border border-gray-300 px-4 py-2 text-center w-75">HTML Beginner, HTML Intermediate, HTML Advance</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex justify-center space-x-4">
                                    <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">
                                        Edit
                                    </button>
                                    <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}