import { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [name, setName] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [sortOption, setSortOption] = useState('');

    return (
        <FilterContext.Provider
            value={{
                searchTerm, setSearchTerm,
                name, setName,
                selectedStyles, setSelectedStyles,
                selectedCity, setSelectedCity,
                sortOption, setSortOption,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => useContext(FilterContext);
