import React, { useState } from "react";

export default function CourseTable() {

    const [showModalCourse, setShowModalCourse] = useState(false);
    const [courseTitle, setCourseTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className="flex flex-col my-4">
            <div className="flex justify-between items-center">
                <div className="text-[40px] font-bold leading-[1] text-white">All course</div>
                <button
                    className="relative cursor-pointer text-[20px] py-1 text-white px-4 rounded-lg inline-block"
                    style={{
                        background: 'linear-gradient(to right, #FFCB91, #FE7474)',
                    }}
                    onClick={() => setShowModalCourse(true)}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[#C5211C] opacity-25 rounded-lg"></div>
                    <span className="relative z-10 font-medium">Add course</span>
                </button>
                {showModalCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(254, 116, 116, 0.3)' }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                            <h2 className="text-[24px] font-bold mb-4 text-[#851515]">Add New Course</h2>
                            <form onSubmit={handleAddCourse}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Course Title</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={courseTitle}
                                        onChange={(e) => setCourseTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className=" px-4 w-20 py-2 rounded border-2 border-[#C5211C] text-[#C5211C] hover:bg-[#C5211C] hover:text-white"
                                        onClick={() => setShowModalCourse(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#28A745] w-20 px-4 py-2 rounded hover:bg-green-500 text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className="z-2 my-2 bg-white p-8 rounded-lg shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#851515] text-white">
                            <th className="border border-gray-300 px-4 py-2">Number</th>
                            <th className="border border-gray-300 px-4 py-2">Subject title</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Total Lessons</th>
                            <th className="border border-gray-300 px-4 py-2">Enrolled Students</th>
                            <th className="border border-gray-300 px-4 py-2">Course completion</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2">HTML Beginner</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate"> 
                                {/* we can add truncate to make it 1 line */}
                                This course covers the basics of HTML, including structure, elements, and best practices for building web pages.
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">20</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                            <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">Edit</button>
                                <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">Delete</button>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2">HTML Intermediate</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate"> 
                                {/* we can add truncate to make it 1 line */}
                                This course covers the basics of HTML, including structure, elements, and best practices for building web pages.
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">20</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">6</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">4</td>
                            <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">Edit</button>
                                <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">Delete</button>
                            </td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2">HTML Advance</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate"> 
                                {/* we can add truncate to make it 1 line */}
                                This course covers the basics of HTML, including structure, elements, and best practices for building web pages.
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">20</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                            <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">Edit</button>
                                <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}