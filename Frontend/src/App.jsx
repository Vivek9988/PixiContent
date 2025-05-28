import { useState,useEffect } from 'react'
import Navbar from './Component/Navbar'
import { FilterProvider } from './Component/Context'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)
  const [photographers, setPhotographers] = useState([]);


  useEffect(() => {
    const fetchPhotographers=async()=>{
      try{
        const response = await axios.get('/api/photo');
        setPhotographers(response.hello)
       

      }
      catch(error){

      }

    };
    fetchPhotographers();
    
  },)
  

  
  return (
    <>
      <FilterProvider>
   <Navbar/>
        <h1>{photographers}</h1>
      </FilterProvider>

   </>
  )
}

export default App
