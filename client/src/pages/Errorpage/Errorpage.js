import React from 'react';
import "./Errorpage.css"

function Errorpage() {
  return (
    <div className='container'><pre style={{fontSize: '20px'}}>Unauthorized!   <a href='/login'>Login/signup</a></pre></div>
  )
}

export default Errorpage