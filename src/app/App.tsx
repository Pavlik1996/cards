import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../Component/Login/Login";
import {Registration} from "../Component/Registration/Registration";
import {Profile} from "../Component/Profile/Profile";
import {Error} from "../Component/404/Error";
import {PassRecovery} from "../Component/passwordRecovery/passRecovery";
import {NewPass} from "../Component/newPass/newPass";
import {Test} from "../Component/test/test";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path={'/'} element={<Login/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/registration'} element={<Registration/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/passrecovery'} element={<PassRecovery/>}/>
          <Route path={'/newpass'} element={<NewPass/>}/>
          <Route path={'/test'} element={<Test/>}/>
          <Route path={'/404'} element={<Error/>}/>
          <Route path={'*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
    </div>
  );
}

export default App;
