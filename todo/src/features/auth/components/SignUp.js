import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { Link } from 'react-router-dom';
// import { devToolsEnhancer } from '@reduxjs/toolkit/dist/devtoolsExtension';

export default function SignUp() {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
      //self for showing google account prompt on the same page
    );
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

      {user && <Navigate to='/' replace={true}></Navigate>}

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-24 w-auto"
          src="/my-Todo-logo.png"
          alt="my-Todo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* noValidate se html khud form ko validat nhi karega */}
        {/* hum validate nhi karana chahte hai, coz hum apna custom error message show karana chahte h */}

        {/* <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
          dispatch(createUserAsync({
            email: data.email,
            password: data.password,
            address: [],
            role: 'user'
          }))
          console.log(data);
        })}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register('email', {
                  required: "email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "invalid email"
                  }
                })}
                type="email"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              User name
            </label>
            <div className="mt-2">
              <input
                id="username"
                {...register("username",
                  {
                    required: "user name is required",
                    // validate: (value, formValues) => value === formValues.password || 'password not matched'
                  }
                )}
                type="text"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `- at least 8 characters\n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                    - Can contain special characters`
                  }
                })}
                type="password"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                {...register("confirmPassword",
                  {
                    required: "confirm password is required",
                    validate: (value, formValues) => value === formValues.password || 'password not matched'
                  }
                )}
                type="password"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </form> */}

        <p className="mt-5 text-center text-sm text-gray-500">
          Already an account ?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log in
          </Link>
        </p>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={googleAuth}
          >
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}