import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const open_menu = document.querySelector('.open-menu');
const menu = document.querySelector('.menu');
const open_icon = document.querySelector('.open-menu .open');
const close_icon = document.querySelector('.open-menu .close');

open_menu.addEventListener('click', () => {
  menu.classList.toggle('active');
  open_icon.classList.toggle('active');
  close_icon.classList.toggle('active');
});

const links = document.querySelectorAll('.menu ul a');

links.forEach((link) => {
  link.addEventListener('click', () => {
    clearActives();
    link.classList.add('active');

    setTimeout(() => {
      menu.classList.remove('active');
      open_icon.classList.remove('active');
      close_icon.classList.remove('active');
    }, 500);
  });
});

function clearActives() {
  for (let i = 0; i < links.length; i++) {
    const elem = links[i];
    elem.classList.remove('active');
  }
}

const introtxt = document.querySelector('.home .text-container span');
introtxt.innerHTML = introtxt.innerHTML
  .split('')
  .map((txt, idx) => `<p style='--i:${idx}'>${txt} </p>`)
  .join('');

const homepage = document.querySelector('.App.home');
const about = document.querySelector('.App.about');
const contact = document.querySelector('.App.contact');

const windowHeight = window.innerHeight;
const animationPoint = 500;

function scrollAnimation() {
  const home_top = homepage.getBoundingClientRect().top;
  const about_top = about.getBoundingClientRect().top;
  const contact_top = contact.getBoundingClientRect().top;

  if (home_top < windowHeight - animationPoint) {
    homepage.classList.add('active');
    clearActives();
    links[0].classList.add('active');
  }
  if (about_top < windowHeight - animationPoint) {
    about.classList.add('active');
    clearActives();
    links[1].classList.add('active');
  }
  if (contact_top < windowHeight - animationPoint) {
    contact.classList.add('active');
    clearActives();
    links[2].classList.add('active');
  }
}

scrollAnimation();
window.addEventListener('scroll', scrollAnimation);
