import React, { useEffect } from 'react';
import axios from 'axios';
import { useFilters } from './Context';

const SetContext = () => {
    const { setName } = useFilters(); // assumes setName is defined in your FilterContext

    useEffect(() => {
        const fetchPhotographers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/photographers'); 
                const photographerNames = response.data.map((p) => p.name); 
                setName(photographerNames);
                co 
            } catch (error) {
                console.error('Error fetching photographers:', error);
            }
        };

        fetchPhotographers();
    }, [setName]);

    return null; // No UI needed
};

export default SetContext;
