import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { TerminalSquare } from "lucide-react";

type RunTimeExerciseProps = {
    initialCode?: string;
    title: string;
    instructions: string;
    expectedOutput: string;
};

export default function RunTimeExercise({
    initialCode = '',
    title,
    instructions,
    expectedOutput,
}: RunTimeExerciseProps) {
    const [code, setCode] = useState<string>(initialCode);
    const [result, setResult] = useState<"correct" | "incorrect" | null>(null);

    const handleCheckAnswer = () => {
        const normalizedCode = code.replace(/\s/g, "").toLowerCase();
        const normalizedExpected = expectedOutput.replace(/\s/g, "").toLowerCase();
        setResult(normalizedCode === normalizedExpected ? "correct" : "incorrect");
    };

    return (
        <div className="my-8">
            <div>
                <h1 className="text-[30px] font-bold text-[#C5211C] mb-2">{title}</h1>
                <p className="text-base mb-4 text-[#333]">{instructions}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#FFEDD9] p-4 rounded-lg shadow-md">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
                    <div className="mb-4 flex items-center justify-start space-x-2">
                        <TerminalSquare color="black" strokeWidth={2.5} className="h-6 w-6" />
                        <h1 className="text-2xl font-bold text-[#851515]">HTML Runtime IDE</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Code Editor */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-[#851515]">HTML Code</label>
                            <CodeMirror
                                value={code}
                                height="256px"
                                theme={oneDark}
                                extensions={[html()]}
                                onChange={(value) => setCode(value)}
                            />
                        </div>

                        {/* Output Preview */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-semibold text-[#851515]">Output</label>
                            <iframe
                                className="w-full h-64 border border-[#3c3c3c] bg-white"
                                srcDoc={code}
                                title="Output Preview"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4 justify-start align-items-center items-center">
                        <button
                            onClick={handleCheckAnswer}
                            className="mt-4 bg-[#0d6efd] text-white py-2 px-4 rounded hover:bg-[#0a58ca] transition-colors"
                        >
                            Check Answer
                        </button>
                        <button
                            onClick={() => setCode(expectedOutput)}
                            className="mt-4 bg-[#C5211C] text-white py-2 px-4 rounded hover:bg-[#E90B0B] transition-colors"
                        >
                            Reveal code
                        </button>
                        {result && (
                            <p className={`mt-2 font-semibold ${result === "correct" ? "text-[#28A745]" : "text-[#C5211C]"}`}>
                                {result === "correct" ? "✅ Correct Answer!" : "❌ Try Again."}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
