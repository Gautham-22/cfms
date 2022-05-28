import React from 'react';
import './Homepage.css';

//icons
import { BsTwitch } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { SiTwitter } from 'react-icons/si';
import { SiTelegram } from 'react-icons/si';
import { FaRedditAlien } from 'react-icons/fa';

function Homepage() {
  return (
    <>
      <div className='App home' id='home'>
        <h3>Home</h3>
        <div className='text-container'>
          <h1>Come Together</h1>
          <h1>To Help Each Other</h1>
          <h2>#Raise For A Cause</h2>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            assumenda molestias atque aperiam deserunt ipsam sit expedita,
            repellat ducimus doloribus.
          </span>
          <a href='#feed' className='feed-btn'>
            Donate
          </a>
        </div>
        <div className='socials'>
          <BsTwitch className='icon' />
          <FaDiscord className='icon' />
          <SiTwitter className='icon' />
          <SiTelegram className='icon' />
          <FaRedditAlien className='icon' />
        </div>
      </div>
    </>
  );
}

export default Homepage;