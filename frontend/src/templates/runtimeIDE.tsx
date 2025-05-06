import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { TerminalSquare } from 'lucide-react';

type RunTimeIDEProps = {
    initialCode?: string;
    title: string;
};

export default function RunTimeIDE({ initialCode = '<h1 class="title">Hello <span>World</span></h1>', title }: RunTimeIDEProps) {
    const [code, setCode] = useState<string>(initialCode);

    return (
        <div className="my-8">
            <div>
                <h1 className="text-[30px] font-bold text-[#C5211C] mb-4">{title}</h1>
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
                </div>
            </div>
        </div>
    );
}
