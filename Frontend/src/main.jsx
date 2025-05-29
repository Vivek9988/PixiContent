import { StrictMode } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FilterProvider } from './Component/Context';
import Signup from './Component/Signup.jsx';
import PhotographerProfile from './Component/PhotographerProfile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}></Route>
        <Route path="/signup" element={<Signup/>} />
      <Route path="/PhotographerProfile" element={<PhotographerProfile/>} />

      

   
   
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilterProvider>
      <RouterProvider router={router} />
    </FilterProvider>
    
  </StrictMode>,
)
