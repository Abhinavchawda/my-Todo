import { TrashIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react'
import { selectLoggedInUser } from '../../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from '../todoSlice';

export default function CompletedTodo() {
  const dispatch = useDispatch()

  const [TodoArray, setTodoArray] = useState([]);

  const user = useSelector(selectLoggedInUser)

  // const Todos = useSelector(selectTodos)

  const getData = async () => {
    // dispatch(fetchTodosByuserAsync(user?.id))

    let req = await fetch("http://localhost:8080/todos/" + user?.id);
    let Todos = await req.json();

    if (Todos)
      setTodoArray(Todos);
  }

  useEffect(() => {
    getData();
  }, [])

  const deleteTodo = async (id) => {
    // const flag = confirm("Are you sure to delete the task?");
    if (true) {
      //BE CAREFUL
      //TodoArray.filter((i)=>{i.id !== id}))   this should not be done, bcz {i.id !== id} will delete the whole TodoArray
      // localStorage.setItem("Todos", JSON.stringify(TodoArray.filter((i)=>i.id !== id)));

      await fetch('http://localhost:8080/todos/' + id,
        {
          method: "DELETE",
          headers: { 'content-type': 'application/json' }
        });
    }
    getData()
  }

  const handleStatus = async (item) => {
    const response = await fetch("http://localhost:8080/todos/" + item.id,
      {
        method: "PATCH",
        body: JSON.stringify({ isDone: !item.isDone }),
        headers: { 'content-type': 'application/json' }
      });
    const data = await response.json();
    getData()
  }

  return (
    <div>
      <div className='Todo overflow-x-hidden min-h-[50vh] mx-auto rounded-xl bg-slate-200 w-[90%] sm:w-[85%] md:w-[55%] mb-10'>

        {TodoArray.length === 0 && <div className='text-lg text-center p-6'>No Task Completed</div>
        }

        {TodoArray.length !== 0 &&
          TodoArray.map((item, index) => (
            <div key={index} className='flex items-center justify-center'>

              {item.isDone &&
                <div className='flex flex-col lg:flex-row items-start lg:items-center px-4 bg-white my-4 w-[80%] mx-auto gap-3 rounded-xl shadow-xl text-wrap overflow-hidden group relative hover:scale-105 transition duration-300 ease-in-out lg:py-2'>
                  <div className='pt-4 lg:p-4'>
                    <input
                      id={item.id}
                      type="checkbox"
                      value={item.isDone}
                      onChange={(e) => { handleStatus(item) }}
                      defaultChecked={item.isDone}
                      className="h-4 w-4 rounded-xl border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className='lg:w-[55%] flex flex-col justify-start items-start'>
                    <div className={`lg:p-2 overflow-hidden`}>Task : {item.task}</div>
                    <div className={`lg:p-2 overflow-hidden`}>Description : {item.desc}</div>
                  </div>
                  <div className='lg:w-[30%]'>
                    <div className='lg:p-2'>
                      <span className={`py-1 px-4 overflow-hidden rounded-lg ${item.priority > 8 ? 'bg-red-600 text-red-200' : 'bg-blue-600 text-blue-200'}`}>Priority : {item?.priority}</span>
                    </div>
                    {/* <div className={`lg:p-2 overflow-hidden`}>Due-date : {item?.date.substr(0, item?.date.length - 14)}</div> */}
                  </div>

                  <div className='flex lg:flex-col justify-center items-center gap-2 p-3 mx-auto'>
                    <div>
                      <TrashIcon className='h-5 w-5 hover:scale-125 cursor-pointer transition-all duration-300'
                        type='button'
                        onClick={() => { deleteTodo(item.id) }} >
                      </TrashIcon>
                    </div>
                  </div>
                </div>
              }
            </div>
          )
          )}
      </div>
    </div >
  )
}