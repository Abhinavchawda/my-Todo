import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import PageNotFound from './pages/404';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import CompletedTodoPage from './pages/CompletedTodoPage';
import About from './pages/AboutMePage';
import Contact from './pages/ContactPage';
import { setUserDetails } from "./features/user/userSlice"

function App() {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
      dispatch(setUserDetails(data.user._json));
    }
    catch (err) {
      console.log("Error in App.js in getUser() : ", err);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className='font-lora'>
      <Routes>
        <Route path='/'
          element={user ? <Home user={user} /> : <Navigate to='/login' />}
        />

        <Route path='/login'
          element={user ? <Navigate to='/' /> : <LoginPage/>}
        />

        <Route path='/signup'
          element={user ? <Navigate to='/' /> : <SignUpPage/>}
        />

        <Route path="/tasks-done" element={<CompletedTodoPage />} />

        <Route path="/profile" element={<UserProfilePage/>} />

        <Route path="/about" element={<About/>} />

        <Route path="/contact" element={<Contact/>} />

        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;