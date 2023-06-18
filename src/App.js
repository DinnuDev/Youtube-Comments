import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Login';
import HomeComponent from './Home';
import Video from './Video';
import Profile from './Profile';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/home' element={<HomeComponent/>} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/my-video' element={<Video  embedId='mxpYHW-M_Ac'/>} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
