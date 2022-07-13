<<<<<<< Updated upstream
import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Landing';
import Login from './components/loginSignupPage/login';
import SignUp from './components/loginSignupPage/signup';
import Main from './components/dashboard/Main';
import Account from './components/account/Account';
import Navbar from './components/navbar/Navbar';
import Errorpage from './pages/Errorpage/Errorpage';
import Adminlogin from './components/admin/Adminlogin';
import Adminhome from './components/admin/Adminhome';
>>>>>>> Stashed changes

import Login from "./components/loginSignupPage/login";
import SignUp from "./components/loginSignupPage/signup";


function App() {
  return (
    <div className="App">
      {/* <Login></Login> */}
      {/* <SignUp></SignUp> */}
      <Router>
        <Routing />
      </Router>
    </div>
  );
}

const Routing = () => {
  return(
      <>
          <Routes>
              <Route path="/" exact element={<Login></Login>}/>
              <Route path="/signup" exact element={<SignUp></SignUp>}/>
          </Routes>
      </>
  );
}

export default App;
