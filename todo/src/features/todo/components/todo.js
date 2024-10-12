import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveTodoAsync, selectTodos } from '../todoSlice';
import { selectSearch } from '../../ui/SearchSlice';
import { PlusIcon } from '@heroicons/react/24/solid';
import { selectUserInfo } from '../../user/userSlice';

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Todo() {
  const dispatch = useDispatch()

  const [Todo, setTodo] = useState({ task: "", desc: "", user: "", priority: "" });
  const [TodoArray, setTodoArray] = useState([]);

  const user = useSelector(selectUserInfo);
  const Todos = useSelector(selectTodos)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const getData = async () => {
    let response = await fetch("http://localhost:8080/todos/" + user?.email);
    let data = await response.json();

    setTodoArray(data);
  }

  useEffect(() => {
    getData();
  }, [])

  const saveTodo = async () => {
    if (Todo.task.length > 2 && Todo.desc.length > 2) {
      const newTodo = { ...Todo, email: user?.email }
      setTodo([...TodoArray, { Todo }]);

      dispatch(saveTodoAsync(newTodo))

      setTodo({ task: "", desc: "", priority: "" });
    }
    else
      alert("To save, Enter the task details !");

    await getData();   //to refresh
  }

  const editTodoForm = async (item) => {
    const id = item?.id;
    setTodo(TodoArray?.filter(i => i.id === id)[0]);       //[0] bcz array.filter returns an array, so indexing is there

    // //Now, delete the old entry, So as to remove the duplicacy
    setTodoArray(TodoArray?.filter(i => i.id != id));

    setSelectedId(item?.id);
  }
  
  const editTodo = async () => {
    const id = selectedId;
    const response = await fetch("http://localhost:8080/todos/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(Todo),
        headers: { 'content-type': 'application/json' }
      });
    const data = await response.json();

    // dispatch(editTodoAsync({Todo, id}))

    setTodo({ task: "", desc: "", priority: "" });
    setSaveFlag(true)
    // dispatch(fetchTodosByuserAsync(user?.id))
    getData()
    // if (Todos)
    //   setTodoArray(Todos);
  }

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

  const handleChange = (e) => {
    setTodo({ ...Todo, [e.target.name]: e.target.value });
  }

  const [saveFlag, setSaveFlag] = useState(true)
  const [selectedId, setSelectedId] = useState()

  const handleStatus = async (item) => {
    const response = await fetch("http://localhost:8080/todos/" + item?.id,
      {
        method: "PATCH",
        body: JSON.stringify({ isDone: !item.isDone }),
        headers: { 'content-type': 'application/json' }
      });
    const data = await response.json();

    getData()
  }

  const sortPriority = async () => {
    let response = await fetch("http://localhost:8080/todos/sort/" + user?.email);
    let data = await response.json();

    setTodoArray(data);
  }

  const [showAdd, setShowAdd] = useState(false)

  const searchString = useSelector(selectSearch);

  return (
    <div>
      <div className='home flex flex-col justify-center items-center mb-12'>
        {/* <Slider className='text-black mb-5 h-5 bg-zinc-400' {...settings}>
          {TodoArray.map((item, index) => (
            <div key={index} className='flex flex-col lg:flex-row items-start lg:items-center px-4 bg-white my-4 w-[80%] mx-auto gap-3 rounded-xl shadow-xl text-wrap overflow-hidden group relative hover:scale-105 transition duration-300 ease-in-out lg:py-2'>
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
              </div>
            </div>
          )
          )}
        </Slider> */}
        <div className='flex flex-col justify-center items-center mb-3 gap-1'>
          <div className='text-xl font-semibold'>Sort Task by Priority</div>
          <button className='bg-blue-100 text-blue-700 rounded-xl px-4 py-2 font-semibold hover:scale-105 transition-all duration-300'
            onClick={sortPriority}
          >
            Sort Tasks
          </button>
        </div>

        <div>
          <button className='bg-green-200 text-green-800 font-semibold rounded-xl px-4 py-2 mb-2 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1'
            onClick={e => { setShowAdd(true); setSaveFlag(true) }}
          >
            <PlusIcon className='h-5 w-5 font-bold' />
            Add a new Task
          </button>
        </div>
        <div className='Todo overflow-x-hidden min-h-[50vh] mx-auto rounded-xl bg-slate-100 w-[90%] sm:w-[85%] md:w-[55%]'>
          {showAdd &&
            <div>
              <div className='mt-5 w-[80%] md:w-[50%] mx-auto'>
                <input value={Todo.task} onChange={handleChange} type='text' placeholder='Enter the task-task' className='w-full rounded-lg mx-auto mt-3 p-2' name='task' id='task'></input>
                <input value={Todo.desc} onChange={handleChange} type='text' placeholder='Enter the description' className='w-full rounded-lg mx-auto mt-3 p-2' name='desc' id='desc'></input>
                <input value={Todo.priority} onChange={handleChange} type='text' placeholder='Enter the Priority' className='w-full rounded-lg mx-auto mt-3 p-2' name='priority' id='priority'></input>
              </div>
              <div className='flex justify-center gap-4'>
                <button onClick={saveFlag ? saveTodo : editTodo} className='flex justify-center items-center w-28 p-2 mt-6 bg-slate-800 text-white hover:bg-white hover:text-black hover:font-bold border border-white hover:shadow-xl rounded-lg'>{saveFlag ? 'Save' : 'Edit'}</button>
                <button onClick={e => { setSaveFlag(false); setShowAdd(false); getData(); setTodo({ task: "", desc: "", priority: "" }) }} className='flex justify-center items-center w-28 p-2 mt-6 bg-white text-black hover:font-bold border hover:shadow-xl rounded-lg'>Cancel</button>
              </div>
            </div>
          }

          {TodoArray?.length === 0 && <div className='text-lg text-center p-6'>No Tasks to do</div>}

          {TodoArray?.length !== 0 &&
            TodoArray
              ?.filter((item) => {
                return (item?.task.toLowerCase().includes(searchString.trim().toLowerCase()) || item.desc.toLowerCase().includes(searchString.trim().toLowerCase()));
              })
              .map((item, index) => (
                <div key={index} className='flex flex-col lg:flex-row items-start lg:items-center px-4 bg-white my-4 w-[80%] mx-auto gap-3 rounded-2xl shadow-xl text-wrap overflow-hidden group relative hover:scale-[1.02] transition duration-300 ease-in-out lg:py-2'>
                  <div className='pt-4 lg:p-4'>
                    <input
                      id={item?.id}
                      type="checkbox"
                      value={item.isDone}
                      onChange={(e) => { handleStatus(item) }}
                      defaultChecked={item.isDone}
                      className="h-5 w-5 rounded-xl border-gray-300 text-indigo-700 focus:ring-indigo-600"
                    />
                  </div>
                  <div className='lg:w-[55%] flex flex-col justify-start items-start'>
                    {/* <div className={`lg:p-2 overflow-hidden ${item.isDone ? 'text-gray-500 line-through' : ''}`}>Task : {item.task}</div> */}
                    <div className={`lg:p-2 overflow-hidden text-2xl`}>{item.task}</div>
                    <div className={`lg:p-2 overflow-hidden`}>Description : {item.desc}</div>
                  </div>
                  <div className='lg:w-[30%]'>
                    <div className='lg:p-2'>
                      <span className={`py-1 px-4 overflow-hidden rounded-lg ${item.priority > 8 ? 'bg-red-600 text-red-200' : 'bg-blue-600 text-blue-200'}`}>Priority : {item?.priority}</span>
                    </div>
                  </div>

                  <div className='flex lg:flex-col justify-center items-center gap-2 p-3 mx-auto'>
                    <div>
                      <PencilIcon className='h-8 w-8 hover:scale-110 cursor-pointer transition-all duration-300 text-blue-800 bg-blue-100 rounded-lg p-1'
                        type='button'
                        onClick={() => { !saveFlag && editTodoForm(item); setShowAdd(true) }}>
                      </PencilIcon>
                    </div>
                    <div>
                      <TrashIcon className='h-8 w-8 hover:scale-110 cursor-pointer transition-all duration-300 text-red-800 bg-[rgb(253,200,200)] rounded-lg p-1'
                        type='button'
                        onClick={() => { deleteTodo(item.id) }} >
                      </TrashIcon>
                    </div>
                  </div>
                </div>
              )
              )}
        </div>
      </div>
    </div>
  )
}