import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserTodosAsync, selectUserInfo, selectUserTodos } from '../userSlice';

export default function UserTodos() {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo)
  const todos = useSelector(selectUserTodos)

  useEffect(() => {
    dispatch(fetchLoggedInUserTodosAsync(userInfo?.id))
  }, [])

  return (
    <div className='h-screen md:p-5'>
      <div className='text-xl font-semibold p-5'>My Orders</div>
      {todos && todos.map((todo, index) => (

        <div key={index} className='pb-10'>
          {todo?.task}

          {/* <div className="bg-white mt-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-5 rounded-xl shadow-xl"> */}
          <h2 className="font-bold text-3xl mt-4 pt-4 px-2 sm:px-4 md:px-6 lg:px-8">             Task id : {todo?.id.substr(todo?.id.length - 5)}           </h2>
          <h6 className="font-bold text-lg text-red-600 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
            Task status : {todo?.isDone}
          </h6>

        </div>))}
      <div className="border-t border-gray-200 py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      </div>
    </div>
  );
}