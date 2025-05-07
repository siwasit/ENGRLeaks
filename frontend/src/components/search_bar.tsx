import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = () => {
        if (onSearch) onSearch(query);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSearchClick();
    };

    return (
        <div className="flex items-center w-[25%] shadow-lg h-14">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={cn(
                    "flex-1 rounded-l-lg",
                    "placeholder:text-3xl placeholder:text-[#85151570]", // increased font size
                    "text-3xl text-[#851515]", // set font size to 2 rem
                    "h-full px-4 py-0", // tighter height and minimal vertical padding
                    "bg-white",
                    "focus:outline-none",
                )}
            />

            <button
                onClick={handleSearchClick}
                className={cn(
                    "bg-[#851515] text-white rounded-r-lg h-full",
                    "hover:bg-red-800 cursor-pointer",
                    "px-5",
                    "flex items-center justify-center",
                    "text-lg" // increased font size
                )}
            >
                <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
        </div>
    );
};

export default SearchBar;
