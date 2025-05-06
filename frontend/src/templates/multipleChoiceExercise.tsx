import { useState } from "react";

type MultipleChoiceExerciseProps = {
    text: string;
    options: string[];
    correctIndex: number;
};

export default function MultipleChoiceExercise({
    text,
    options,
    correctIndex,
}: MultipleChoiceExerciseProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (index: number) => {
        setSelected(index);
        setSubmitted(false);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col justify-start items-start">
            <hr className="border-t-2 border-neutral-600 my-1" />
            <div className="text-neutral-600 text-[20px] mb-4">{text}</div>

            <div className="flex flex-col items-start w-[75%]">
                <label className="mb-2 font-semibold text-[#851515]">
                    Select the correct answer:
                </label>

                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`p-2 mb-2 border rounded-lg w-full text-left ${selected === index
                                ? "bg-blue-100 border-blue-500"
                                : "bg-white border-gray-300"
                            }`}
                    >
                        {option}
                    </button>
                ))}

                <div className="flex space-x-4 items-center">
                    <button
                        onClick={handleSubmit}
                        disabled={selected === null}
                        className="mt-4 px-4 py-2 bg-[#851515] text-white rounded-lg hover:bg-[#6e1212] disabled:opacity-50"
                    >
                        Submit
                    </button>

                    {submitted && (
                        <div className="mt-4 text-lg font-semibold">
                            {selected === correctIndex ? (
                                <span className="text-green-600">Correct!</span>
                            ) : (
                                <span className="text-red-600">Incorrect. Try again.</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
