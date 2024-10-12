import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserAsync, selectUserInfo, } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';

export default function User() {

  // const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  // const user = useSelector(selectLoggedInUser);


  // useEffect(()=>{
  //   dispatch(fetchLoggedInUserAsync(user.id))
  //   console.log("user 2 : ", user2)
  // }, [])

  return (
    <div className='h-screen'>
      <div className='md:p-5'>
        <div className='text-xl font-semibold px-5'>My Profile</div>
        <div className='pb-10'>

          <div className="bg-white mt-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-5 rounded-xl shadow-xl">
            <div className="border-gray-200 md:flex">
              <div className="mt-4 py-4 px-2 sm:px-4 lg:px-8">
                <img className='rounded-xl' src={user?.picture} alt='user-picture' />
              </div>
              <div>
                <h2 className="font-bold text-xl mt-4 py-4 px-2 sm:px-4 lg:px-8">
                  Name : {user?.name}
                </h2>
                <h6 className="font-bold text-xl py-4 px-2 sm:px-4 lg:px-8">
                  Email : {user?.email}
                </h6>
              </div>

              {/* {user?.role === "admin" &&
                <h6 className="font-bold text-xl text-red-500 py-4 px-4 sm:px-6 lg:px-8">
                  Role : {user?.role}
                </h6>
              } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
