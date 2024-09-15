import React, { useEffect } from 'react';
import Home from './pages/Home';
import NavBar from './features/ui/NavBar';
// import { Counter } from './features/counter/Counter';
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
  // {
  //   path: "/admin",
  //   element:
  //     <ProtectedAdmin>
  //       <AdminHome></AdminHome>
  //     </ProtectedAdmin>,
  // },
  {
    path: "/login",
    element: <div><LoginPage></LoginPage></div>,
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
    element: <div><Protected><About></About></Protected></div>,
  },
  {
    path: "/contact",
    element: <div><Protected><Contact></Contact></Protected></div>,
  },
  {
    path: "/profile",
    element: <div><UserProfilePage></UserProfilePage></div>,
  },
  {
    path: "/logout",
    element: <div><LogOut></LogOut></div>,
  },
  // {
  //   path: "/forgot-password",
  //   element: <div><ForgotPasswordPage></ForgotPasswordPage></div>,
  // },
  {
    path: "*",
    element: <div><PageNotFound></PageNotFound></div>,
  },
]);

function App() {
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(fetchLoggedInUserAsync())
  // }, [])
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
