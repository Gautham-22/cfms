import React from 'react';
import './Contact.css';

import { SiGmail } from 'react-icons/si';
import { FaDiscord } from 'react-icons/fa';
import { SiTwitter } from 'react-icons/si';
import { SiTelegram } from 'react-icons/si';
import { FaRedditAlien } from 'react-icons/fa';

import { BsChevronDoubleUp } from 'react-icons/bs';

function Contact() {
  return (
    <>
      <div className='App contact' id='contact'>
        <h1>Get in Touch</h1>

        <div className='socials'>
          <SiTwitter className='icon' style={{ '--i': 1 }} />
          <SiGmail className='icon' style={{ '--i': 2 }} />
          <FaDiscord className='icon' style={{ '--i': 3 }} />
          <SiTelegram className='icon' style={{ '--i': 4 }} />
          <FaRedditAlien className='icon' style={{ '--i': 5 }} />
        </div>

        <div className='to-top'>
          <a href='#home'>
            Home <BsChevronDoubleUp />
          </a>
        </div>
      </div>
    </>
  );
}

export default Contact;
