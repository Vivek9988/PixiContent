import { useEffect } from 'react';
import axios from 'axios';
import { useFilters } from './Component/Context';
import Navbar from './Component/Navbar';
import { NavLink } from 'react-router-dom';

function App() {
  const { searchTerm, name, setName } = useFilters();

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await axios.get('api/photographers');
        setName(response.data.photographers);
        
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    };

    fetchPhotographers();
  }, []);


  // console.log("helo")
  // name.map((sss) => {
  //   console.log(sss.id)
  // })
  

  const filteredPhotographers = name.filter(photographer =>
    photographer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>
    <Navbar/>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Photographers</h1>
        {filteredPhotographers.length === 0 ? (
          <p className="text-gray-500">No photographers found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotographers.map((photographer) => (
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

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{photographer.name}</h2>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {photographer.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{photographer.rating}</span>
                    </div>
                    <span className="font-bold">₹{photographer.price.toLocaleString()}</span>
                  </div>

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

                  <NavLink to="/PhotographerProfile" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition">
                    View Profile
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;