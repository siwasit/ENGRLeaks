import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CourseTable() {

    const [showModalLesson, setShowModalLesson] = useState(false);
    const [lessonTitle, setLessonTitle] = useState("");
    const [body, setBody] = useState("");

    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const router = useRouter();

    return (
        <div className="flex flex-col my-4">
            <div className="flex justify-between items-center">
                <select
                    className="w-1/3 p-2 text-[#AA5B5B] font-medium bg-white border border-[#851515] border-2 rounded focus:outline-none"
                    defaultValue={"1"}
                >
                    <option value="1" className="hover:bg-[#F5D0D0]">HTML Beginner</option>
                    <option value="2" className="hover:bg-[#F5D0D0]">HTML Intermediate</option>
                    <option value="3" className="hover:bg-[#F5D0D0]">HTML Advance</option>
                </select>

                <button
                    className="relative cursor-pointer text-[20px] py-1 text-white px-4 rounded-lg inline-block"
                    style={{
                        background: 'linear-gradient(to bottom right, #FE7474, #FFCB91)',
                    }}
                    // onClick={() => setShowModalLesson(true)}
                    onClick={() => {
                        router.push("/addlesson");
                    }}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[#C5211C] opacity-25 rounded-lg"></div>
                    <span className="relative z-10 font-medium">Add lesson</span>
                </button>
                {showModalLesson && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(254, 116, 116, 0.3)' }}>
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                            <h2 className="text-[24px] font-bold mb-4 text-[#851515]">Add Lesson</h2>
                            <form onSubmit={handleAddCourse}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Lesson Title</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={lessonTitle}
                                        onChange={(e) => setLessonTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Body</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className=" px-4 w-20 py-2 rounded border-2 border-[#C5211C] text-[#C5211C] hover:bg-[#C5211C] hover:text-white"
                                        onClick={() => setShowModalLesson(false)}
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
                            <th className="border border-gray-300 px-4 py-2">Lesson Name</th>
                            <th className="border border-gray-300 px-4 py-2">Content Size (byte)</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                            <th className="border border-gray-300 px-4 py-2">Create By</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2">HTML Introduction</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">
                                284 bytes
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">7/5/2568</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Siwasit Saengnikun</td>
                            <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">Edit</button>
                                <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">Delete</button>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2">Basic HTML</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">
                                284 bytes
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">7/5/2568</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Siwasit Saengnikun</td>
                            <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                <button className="bg-[#FFB915] cursor-pointer text-white w-20 py-1 rounded hover:bg-yellow-400 transition-colors">Edit</button>
                                <button className="bg-[#C5211C] cursor-pointer text-white w-20 py-1 rounded hover:bg-red-600 transition-colors">Delete</button>
                            </td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2">Tag Element</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">
                                284 bytes
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">7/5/2568</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">Siwasit Saengnikun</td>
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