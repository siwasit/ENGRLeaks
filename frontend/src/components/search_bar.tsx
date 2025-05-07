import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void; // Optional search handler
}

// Simplified cn function
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(query);
        }
        // You could also trigger navigation here if needed
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className="flex items-center w-[25%] shadow-lg">
            <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={cn(
            "flex-1 rounded-l-lg",
            "placeholder-gray-400",
            "text-sm",
            "h-12",
            "px-4",
            "bg-white",
            "focus:outline-none" // Disable the red border when focused
            )}
            />
            <button
            onClick={handleSearchClick}
            className={cn(
            "bg-[#851515] text-white rounded-r-lg h-12",
            "hover:bg-red-800",
            "px-4",
            "flex items-center"
            )}
            >
               <FontAwesomeIcon icon={faSearch} /></button>
        </div>
    );
};

export default SearchBar;
