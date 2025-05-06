import React from "react";

export default function Paragraph({ title, text }: { title: string, text: string }) {
    return (
        <>
            <div>
                <div className="text-[30px] font-bold text-[#C5211C]">
                    {title}
                </div>
                <hr className='border-t-2 border-neutral-600 my-1' />
                <div className="text-neutral-600 text-[20px]">
                    {text}
                </div>
            </div>
        </>
        
    );
}