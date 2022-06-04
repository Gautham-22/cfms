import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from './Landing';
import Login from './components/loginSignupPage/Login';
import SignUp from './components/loginSignupPage/Signup';
import Main from "./components/dashboard/Main";
import Account from "./components/account/Account";
import Navbar from "./components/navbar/Navbar";
import Errorpage from "./pages/Errorpage/Errorpage";
import Adminlogin from './components/admin/Adminlogin';
import Adminhome from "./components/admin/Adminhome";

const App = () => {
  const [login, setLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [appnav, setAppnav] = useState(false);
  const [isAccount , setIsAccount] = useState(false);
  console.log(process.env.REACT_APP_ADMIN_LOGIN)
  
  useEffect(() => {
    const getCredentials = async () => {
      try {
        let res = await fetch("http://localhost:5000/cfms/credentials", {
            credentials: 'include',
            method: 'GET',
        });
        if(res.ok) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch(err) {
        // console.log(err);
      }
    }
    getCredentials();
    const getAdminCredentials = async () => {
      try {
        let res = await fetch("http://localhost:5000/cfms/adminCredentials", {
            credentials: 'include',
            method: 'GET',
        });
        if(res.ok) {
          setAdminLogin(true);
        } else {
          setAdminLogin(false);
        }
      } catch(err) {
        // console.log(err);
      }
    }
    getAdminCredentials();
  }, [])

  return (
      <div>
        <BrowserRouter>
          {appnav && <Navbar setIsAccount={setIsAccount} adminLogin={adminLogin} setAdminLogin={setAdminLogin} setLogin={setLogin} />}
          <Routes>
            <Route path='/' element={<Landing login={login} setAppnav={setAppnav} />} />
            <Route path='/login' element={<Login setLogin={setLogin} setAppnav={setAppnav} />} />
            <Route path='/signup' element={<SignUp setLogin={setLogin} setAppnav={setAppnav} />} />
            <Route path='/dashboard' element={login ? <Main login={login}  setLogin={setLogin} setAppnav={setAppnav} />: <Errorpage />} />
            <Route path='/account' element={login ? <Account isAccount={isAccount} /> : <Errorpage />} />
            <Route path={process.env.REACT_APP_ADMIN_LOGIN} element={<Adminlogin setAdminLogin={setAdminLogin} />} />
            <Route path={process.env.REACT_APP_ADMIN_ROUTE} element={adminLogin ? <Adminhome setAppnav={setAppnav} /> : <Errorpage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );

};

export default App;