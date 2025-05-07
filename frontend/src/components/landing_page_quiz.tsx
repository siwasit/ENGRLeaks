'use client';

import React, { useState } from 'react';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

interface QuizQuestionProps {
    question: string;
    options: string[];
    correctAnswer: string;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, options, correctAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resultText, setResultText] = useState('');

    let textColor = '';

    if (isSubmitted) {
        textColor = selectedAnswer === correctAnswer ? 'text-green-500' : 'text-red-500';
    }

    const handleValueChange = (value: string) => {
        setSelectedAnswer(value);
        setIsSubmitted(false); 
        setResultText('');
    };

    const handleSubmit = () => {
        if (selectedAnswer) {
            setIsSubmitted(true);
            if (selectedAnswer === correctAnswer) {
                setResultText("Congratulations! You found the correct answer. Let's start learning more!");
            } else {
                setResultText("Wrong, the correct answer is A. Let's start learning!");
            }
        }
    };

    const isSubmitDisabled = !selectedAnswer;

    return (
        <div className="bg-white p-6 shadow-md w-full h-full">
            <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 bg-gradient-to-r from-[#FFCB91] to-[#FE7474] text-transparent bg-clip-text">
                {question}
            </h2>
            <div className="space-y-2 p-2 rounded-lg">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={cn(
                            "h-[60px] flex items-center bg-gradient-to-r from-[#FFCB91] to-[#FE7474] p-3 rounded-md shadow-sm hover:shadow-md transition-shadow",
                            selectedAnswer === option ? "opacity-100" : "opacity-70"
                        )}
                    >
                        <input
                            type="radio"
                            id={`option-${index}`}
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={() => handleValueChange(option)}
                            className="mr-2 h-4 w-4 text-[#851515] focus:ring-[#851515] border-gray-300"
                        />
                        <label
                            htmlFor={`option-${index}`}
                            className="text-[#851515] font-medium"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-end mt-6">
                {isSubmitted && (
                    <span
                        className={cn(
                            "mr-4 font-medium",
                            textColor
                            // resultText === 'Congratulations!' ? "text-green-500" : "text-red-500"
                        )}
                    >
                        {resultText}
                    </span>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    className={cn(
                        "bg-green-500 text-white px-6 py-2 rounded-md transition-colors",
                        isSubmitDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-white hover:border-green-500 hover:text-green-500 border-2 border-transparent"
                    )}
                >
                    Submit answer
                </button>
            </div>
        </div>
    );
};

const QuizWrapper = () => {
    const questionData = {
        question: "Why do we need document type declaration? (line 1)",
        options: [
            "It tells the browser to render the page in standards mode.",
            "It adds extra formatting and design.",
            "It helps the browser connect to the internet faster.",
        ],
        correctAnswer: "It tells the browser to render the page in standards mode.",
    };

    return (

        <QuizQuestion
            question={questionData.question}
            options={questionData.options}
            correctAnswer={questionData.correctAnswer}
        />

    );
};

export default QuizWrapper;
