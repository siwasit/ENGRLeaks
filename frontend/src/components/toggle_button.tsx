import React, { useState } from 'react';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

interface ToggleButtonProps {
    icon?: React.ReactNode;
    label: string;
    width?: string;
    height?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    className?: string; 
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    label,
    icon,
    width = 'w-12',
    height = 'h-12',
    checked = false,
    onCheckedChange,
    className = '',  // Destructure className
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckedChange = (checked: boolean) => {
        setIsChecked(checked);
        if (onCheckedChange) {
            onCheckedChange(checked);
        }
    };

    return (
        <div className="flex items-center space-x-2 shadow-lg">
            <button
                role="switch"
                aria-checked={isChecked}
                onClick={() => handleCheckedChange(!isChecked)}
                className={cn(
                    isChecked ? "bg-[#851515] text-white" : "bg-white text-[#851515]", // Active background color
                    width,
                    height,
                    "pl-2 pr-2", // Padding for the button
                    "rounded-md", // Border radius for the button
                    "transition-colors duration-200", // Smooth transition for color change
                    "cursor-pointer", // Cursor pointer on hover
                    className // Apply the className prop to the button
                )}
            >
                <span className="text-base font-semibold leading-none place-items-center space-x-3">
                    {icon && <span className="text-3xl">{icon}</span>}
                    <span className="text-3xl">{label}</span>
                </span>
            </button>
        </div>
    );
};

export { ToggleButton };
