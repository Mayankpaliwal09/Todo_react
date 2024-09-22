import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos , setTodos] = useState([])


  // add todo method bnaenge jo context mei bnaya hai 

  const addTodo = (todo) =>{

    setTodos((prev)=> [{id:Date.now() , ...todo }, ...prev])
    // setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  
  // update todo method bnaenge jo context mei bnaya hai for update the todo

  const updateTodo = (id , todo)=>{

     setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo)))
  }


    // delete todo method bnaenge jo context mei bnaya hai for update the todo
  const deleteTodo = (id)=>{

    setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
  }

  // toogle method bnaenge for work complete or not 
  const toggleComplete = (id)=>{
    console.log(id)
       setTodos((prev)=>
         prev.map((prevTodo)=>
           prevTodo.id === id ? {...prevTodo,
            completed : !prevTodo.completed}: prevTodo))
  }


 
  // local sorage functionality 

  // useEffect use krege ki jab page load ho to ye local stoage mei jae or todos ko [todos] mei load krde

  // ye effect tab kam krege jab hamara pafge load hoga to display krega on browswer to get 
  useEffect(()=>{
   const todos = JSON.parse( localStorage.getItem("todos"))

     if (todos && todos.length > 0) {
       setTodos(todos)
     }
  },[])
 
// ye effect todos ko local stoarage mei set krega 
  useEffect(()=>{
     localStorage.setItem("todos",JSON.stringify(todos))
  },[])

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">

                        {/* Todo form goes here */} 

                        <TodoForm />

                    </div>
                    <div className="flex flex-wrap gap-y-3">
                      
                        {/*Loop and Add TodoItem here */}
                        
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>

                            <TodoItem todo={todo}/>
                          </div>
                        ))}


                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
