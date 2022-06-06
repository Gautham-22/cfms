import React, { useState, useEffect } from 'react';
import './App.css';

//pages
import Homepage from './pages/Homepage/Homepage';
import Contact from './pages/Contact/Contact';
import AboutUs from './pages/About Us/Aboutus';
// import Error from './pages/Errorpage/Errorpage';

import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

function Landing({login, setAppnav}) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        let res = await fetch('http://localhost:5000/cfms/stats', {
          credentials: 'include',
          method: 'GET',
        });
        if(!res.ok) {
          console.log(res);
          return;
        }
        const response = await res.json();
        setStats(response.stats[0]);

      } catch (err) {
        // console.log(err);
      }
    };
    getStats();
  }, []);

  setAppnav(false);
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
          {!login && <a href='/login'>Login</a>}
          {!login && <a href='/signup'>SignUp</a>}
          {login && <a href='/dashboard'>Dashboard</a>}
        </ul>
      </div>
      <Homepage login={login} stats={stats} />
      <AboutUs />
      <Contact />
    </>
  );
}

export default Landing;
