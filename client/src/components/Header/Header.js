import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className='header'>
        <div className='header_logo'>
          <img src='' alt='' />
        </div>
        <div className='header_center'>
          <Link to='/' className='link'>
            Home
          </Link>
          <Link to='/contact' className='link'>
            Contact Us
          </Link>
          <Link to='/about-us' className='link'>
            About Us
          </Link>
        </div>
        <div className='header_end'>
          <Link to='/login' className='link'>
            Login
          </Link>
          <Link to='/signup' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
