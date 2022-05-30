import React from 'react';
import Main from './components/dashboard/Main';
import Navbar from "./components/navbar/Navbar";
import Account from './components/account/Account';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Main /> */}
      <Account />
    </div>
  )
};

export default App;