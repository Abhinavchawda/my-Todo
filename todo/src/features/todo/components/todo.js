import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react'
import { selectLoggedInUser } from '../../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { editTodoAsync, fetchTodosByuserAsync, saveTodoAsync, selectTodos } from '../todoSlice';

export default function Todo() {
  const dispatch = useDispatch()

  const [Todo, setTodo] = useState({ task: "", desc: "", date: "", user: "", priority: "" });
  const [TodoArray, setTodoArray] = useState([]);

  const user = useSelector(selectLoggedInUser)

  // const Todos = useSelector(selectTodos)

  const getData = async () => {
    // dispatch(fetchTodosByuserAsync(user?.id))

    let req = await fetch("http://localhost:8080/todos/" + user?.id);
    let Todos = await req.json();

    // console.log("dos : ", Todos)
    if (Todos)
      setTodoArray(Todos);
  }

  useEffect(() => {
    getData();
    // dispatch(fetchTodosByuserAsync(user?.id))
    // if (Todos)
    //   setTodoArray(Todos);
  }, [])

  const saveTodo = async () => {
    if (Todo.task.length > 2 && Todo.desc.length > 2 && Todo.date.length > 4) {
      const newTodo = { ...Todo, user: user?.id }
      setTodo([...TodoArray, { Todo }]);

      dispatch(saveTodoAsync(newTodo))

      setTodo({ task: "", desc: "", date: "", priority: "" });
    }
    else
      alert("To save, Enter the task details !");

    getData()   //to refresh
  }

  const editTodoForm = async (item) => {
    const id = item.id
    setTodo(TodoArray.filter(i => i.id === id)[0]);       //[0] bcz array.filter returns an array, so indexing is there

    // //Now, delete the old entry, So as to remove the duplicacy
    setTodoArray(TodoArray.filter(i => i.id != id));

    setSelectedId(item.id)
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

    setTodo({ task: "", desc: "", date: "", priority: "" });
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
    const response = await fetch("http://localhost:8080/todos/" + item.id,
      {
        method: "PATCH",
        body: JSON.stringify({ isDone: !item.isDone }),
        headers: { 'content-type': 'application/json' }
      });
    const data = await response.json();
    getData()
  }

  const sortPriority = async () => {
    // dispatch(fetchTodosByuserAsync(user?.id))
    let req = await fetch("http://localhost:8080/todos/sort/" + user?.id);
    let Todos = await req.json();

    // console.log("dos : ", Todos)
    if (Todos) {
      setTodoArray(Todos);
    }
  }

  const [showAdd, setShowAdd] = useState(false)
  return (
    <div>
      <div className='home flex flex-col justify-center items-center mb-12'>
        <div className='flex flex-col justify-center items-center mb-3 gap-1'>
          <div className='text-xl font-semibold font-serif'>Sort Task by Priority</div>
          <button className='bg-slate-200 text-gray-600 rounded-lg px-4 py-1 font-semibold hover:scale-105 transition-all duration-300'
            onClick={sortPriority}
          >
            Sort
          </button>
        </div>

        <div>
          <button className='bg-green-500 text-white rounded-lg px-4 py-1 font-semibold mb-2 hover:scale-105 transition-all duration-300'
          onClick={e=>{setShowAdd(true); setSaveFlag(true)}}
          >
            Add a new Task
          </button>
        </div>
        <div className='Todo overflow-x-hidden min-h-[50vh] mx-auto rounded-xl bg-slate-200 w-[90%] sm:w-[85%] md:w-[55%]'>
          {showAdd &&
            <div>
              <div className='mt-5 w-[80%] md:w-[50%] mx-auto'>
                <input value={Todo.task} onChange={handleChange} type='text' placeholder='Enter the task-task' className='w-full rounded-lg mx-auto mt-3 p-2' name='task' id='task'></input>
                <input value={Todo.desc} onChange={handleChange} type='text' placeholder='Enter the description' className='w-full rounded-lg mx-auto mt-3 p-2' name='desc' id='desc'></input>
                <input value={Todo.priority} onChange={handleChange} type='text' placeholder='Enter the Priority' className='w-full rounded-lg mx-auto mt-3 p-2' name='priority' id='priority'></input>
                <input value={Todo.date} onChange={handleChange} type='date' placeholder='Enter the due date' className='w-full rounded-lg mx-auto mt-3 p-2' name='date' id='date'></input>
              </div>
              <div className='flex justify-center gap-4'>
                <button onClick={saveFlag ? saveTodo : editTodo} className='flex justify-center items-center w-28 p-2 mt-6 bg-slate-800 text-white hover:bg-white hover:text-black hover:font-bold border border-white hover:shadow-xl rounded-lg'>{saveFlag ? 'Save' : 'Edit'}</button>
                <button onClick={e => { setSaveFlag(false); setShowAdd(false); getData(); setTodo({ task: "", desc: "", date: "", priority: "" }) }} className='flex justify-center items-center w-28 p-2 mt-6 bg-white text-black hover:font-bold border hover:shadow-xl rounded-lg'>Cancel</button>
              </div>
            </div>
          }

          {TodoArray.length === 0 && <div className='text-lg text-center p-6'>No Tasks to do</div>}

          {TodoArray.length !== 0 &&
            TodoArray.map((item, index) => (
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
                  <div className={`lg:p-2 overflow-hidden ${item.isDone ? 'text-gray-500 line-through' : ''}`}>Task : {item.task}</div>
                  <div className={`lg:p-2 overflow-hidden ${item.isDone ? 'text-gray-500 line-through' : ''}`}>Description : {item.desc}</div>
                </div>
                <div className='lg:w-[30%]'>
                  <div className='lg:p-2'>
                    <span className={`py-1 px-4 overflow-hidden rounded-lg ${item.priority > 8 ? 'bg-red-600 text-red-200' : 'bg-blue-600 text-blue-200'} ${item.isDone ? 'line-through' : ''}`}>Priority : {item?.priority}</span>
                  </div>
                  <div className={`lg:p-2 overflow-hidden ${item.isDone ? 'text-gray-500 line-through' : ''}`}>Due-date : {item?.date.substr(0, item?.date.length - 14)}</div>
                </div>

                <div className='flex lg:flex-col justify-center items-center gap-2 p-3 mx-auto'>
                  <div>
                    <PencilIcon className='h-5 w-5 hover:scale-125 cursor-pointer transition-all duration-300'
                      type='button'
                      onClick={() => { !saveFlag && editTodoForm(item); setShowAdd(true) }}>
                    </PencilIcon>
                  </div>
                  <div>
                    <TrashIcon className='h-5 w-5 hover:scale-125 cursor-pointer transition-all duration-300'
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