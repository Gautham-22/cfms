import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Landing';
import Login from './components/loginSignupPage/Login';
import SignUp from './components/loginSignupPage/Signup';
import Main from './components/dashboard/Main';
import Account from './components/account/Account';
import Navbar from './components/navbar/Navbar';
import Errorpage from './pages/Errorpage/Errorpage';

const App = () => {
  const [login, setLogin] = useState(false);
  const [appnav, setAppnav] = useState(false);
  const [isAccount, setIsAccount] = useState(false);

  useEffect(() => {
    const getCredentials = async () => {
      try {
        let res = await fetch('http://localhost:5000/cfms/credentials', {
          credentials: 'include',
          method: 'GET',
        });
        if (res.ok) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (err) {
        // console.log(err);
      }
    };
    getCredentials();
  }, []);

  return (
    <div>
      <BrowserRouter>
        {appnav && <Navbar setIsAccount={setIsAccount} setLogin={setLogin} />}
        <Routes>
          <Route
            path='/'
            element={<Landing login={login} setAppnav={setAppnav} />}
          />
          <Route
            path='/login'
            element={<Login setLogin={setLogin} setAppnav={setAppnav} />}
          />
          <Route
            path='/signup'
            element={<SignUp setLogin={setLogin} setAppnav={setAppnav} />}
          />
          <Route
            path='/dashboard'
            element={
              login ? (
                <Main login={login} setLogin={setLogin} setAppnav={setAppnav} />
              ) : (
                <Errorpage />
              )
            }
          />
          <Route
            path='/account'
            element={login ? <Account isAccount={isAccount} /> : <Errorpage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
