import React, { useEffect } from 'react';
import Home from './pages/Home';
import NavBar from './features/ui/NavBar';
import { createBrowserRouter, RouterProvider, Route, Link, } from "react-router-dom";
import LogOut from './features/auth/components/LogOut';
import PageNotFound from './pages/404';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import Protected from './features/auth/components/Protected';
import UserTodosPage from './pages/UserTodosPage';
import { useDispatch } from 'react-redux';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import CompletedTodoPage from './pages/CompletedTodoPage';
import About from './pages/AboutMePage';
import Contact from './pages/ContactPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div>
        <Protected><Home></Home></Protected>,
      </div>
  },
  {
    path: "/user-todos",
    element:
      <div>
        <Protected><NavBar></NavBar><UserTodosPage></UserTodosPage></Protected>,
      </div>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/tasks-done",
    element: <Protected><CompletedTodoPage></CompletedTodoPage></Protected>,
  },
  {
    path: "/about",
    element: <Protected><About></About></Protected>,
  },
  {
    path: "/contact",
    element: <Protected><Contact></Contact></Protected>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(fetchLoggedInUserAsync())
  // }, [])
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;