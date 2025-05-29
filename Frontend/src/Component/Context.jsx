import { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [name, setName] = useState([]);
    
    return (
        <FilterContext.Provider
            value={{
                searchTerm, setSearchTerm,
                name, setName,
                
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => useContext(FilterContext);
