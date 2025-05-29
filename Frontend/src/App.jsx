import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await axios.get('api/photographers');
        setPhotographers(response.data.photographers);
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    };

    fetchPhotographers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Photographers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photographers.map((photographer) => (
          <div key={photographer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Profile Picture */}
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                src={photographer.profilePic}
                alt={photographer.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
            </div>

            {/* Photographer Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{photographer.name}</h2>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {photographer.location}
                </span>
              </div>

              {/* Rating and Price */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{photographer.rating}</span>
                </div>
                <span className="font-bold">₹{photographer.price.toLocaleString()}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {photographer.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Profile Button */}
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;