import React from 'react';
import './Homepage.css';
import {Typography} from "@mui/material";

//icons
import { SiGmail } from 'react-icons/si';
import { FaDiscord } from 'react-icons/fa';
import { SiTwitter } from 'react-icons/si';
import { SiTelegram } from 'react-icons/si';
import { FaRedditAlien } from 'react-icons/fa';

function Homepage({login, stats}) {
  return (
    <>
      <div className='App home' id='home'>
        <h3>Home</h3>
        <div className='text-container'>
          <h1>Come Together</h1>
          <h1>To Help Each Other</h1>
          <h2>#Raise For A Cause</h2>
          {stats && <Typography variant='button' style={{color: "rgb(199, 199, 13)", margin: '20px 0px'}}>
            {stats.users}+ active users, Over ₹{stats.total_raised} raised...
          </Typography>}
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In
            assumenda molestias atque aperiam deserunt ipsam sit expedita,
            repellat ducimus doloribus.
          </span>
          <a href={login ? '/dashboard' : '/login'} className='feed-btn'>
            Start a Fundraiser
          </a>
        </div>
        <div className='socials'>
          <SiGmail className='icon' />
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
