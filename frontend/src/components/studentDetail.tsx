import React, { useState } from "react";

export default function StudentDetailTable() {

    return (
        <div className="flex flex-col my-4">
            <div className="flex justify-between items-center">
                <select
                    className="w-1/3 p-2 text-[#AA5B5B] font-medium bg-white border border-[#851515] border-2 rounded focus:outline-none"
                    defaultValue={"1"}
                >
                    <option value="1" className="hover:bg-[#F5D0D0]">Siwasit Saengnikun</option>
                    <option value="2" className="hover:bg-[#F5D0D0]">Worayot Liamkaew</option>
                    <option value="3" className="hover:bg-[#F5D0D0]">Akkarawoot Takhom</option>
                </select>
            </div>
            <div className="z-2 my-2 bg-white p-8 rounded-lg shadow-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#851515] text-white">
                            <th className="border border-gray-300 px-4 py-2">Number</th>
                            <th className="border border-gray-300 px-4 py-2">Course</th>
                            <th className="border border-gray-300 px-4 py-2">Progress</th>
                            <th className="border border-gray-300 px-4 py-2">Enroll date</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                            <td className="border border-gray-300 px-4 py-2">HTML Beginner</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">3/20</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">7/5/2568</td>
                            <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                <div className="bg-[#FFB915] text-white w-20 py-1 text-center rounded w-25">On-going</div>
                            </td>
                        </tr>
                        <tr className="">
                        <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                            <td className="border border-gray-300 px-4 py-2">HTML Beginner</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">3/20</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">7/5/2568</td>
                            <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                <div className="bg-[#FFB915] text-white w-20 py-1 text-center rounded w-25">On-going</div>
                            </td>
                        </tr>
                        <tr className="bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 text-center">3</td>
                            <td className="border border-gray-300 px-4 py-2">HTML Beginner</td>
                            <td className="border border-gray-300 px-4 py-2 text-center max-w-xs truncate">3/20</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">7/5/2568</td>
                            <td className="border flex justify-center space-x-4 border-gray-300 py-2">
                                <div className="bg-[#28A745] text-white w-20 py-1 text-center rounded w-25">Completed</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}