import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

//pages
import Header from './components/Header/Header';
import Homepage from './pages/Homepage/Homepage';
import Contact from './pages/Contact/Contact';
import AboutUs from './pages/About Us/Aboutus';
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
      <Homepage />
      <AboutUs />
      <Contact />
    </>
  );
}

export default App;
