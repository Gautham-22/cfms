import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./components/loginSignupPage/login";
import SignUp from "./components/loginSignupPage/signup";

const App = () => {
  return (
    <div className="App">
      {/* <Login></Login> */}
      {/* <SignUp></SignUp> */}
      <Router>
        <Routing />
      </Router>
    </div>
  )
};

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
