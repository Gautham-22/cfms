import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages
import Homepage from './pages/Homepage/Homepage';
import Contact from './pages/Contact/Contact';
import AboutUs from './pages/About Us/Aboutus';
import Admin from './pages/Admin/Home';
// import Error from './pages/Errorpage/Errorpage';

import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

function App() {
  return (
    <>
      <div className='open-menu'>
        <BiMenuAltRight id='m' className='open' />
        <AiOutlineClose id='m' className='close' />
      </div>
      <div className='menu'>
        <ul>
          <a href='#home' className='active'>
            home
          </a>
          <a href='#about'>About us</a>
          <a href='#contact'>Contact</a>
        </ul>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' exact element={<Admin />} />
        </Routes>
      </BrowserRouter>
      {/* <Homepage />
      <AboutUs />
      <Contact /> */}
    </>
  );
}

export default App;
