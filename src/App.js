import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })    
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
     <div className="App-container">
      <h3><u>To-Do List</u></h3>
      <div className="Todo-container">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
      <div className="Input-textbox">
      <input ref={todoNameRef} type="text" />
      </div>
      <div className="Buttons">
      <button onClick={handleAddTodo}>Add To-Do</button>
      <button onClick={handleClearTodos}>Clear List</button>
      </div>
      <div className="todocount">
        {todos.filter(todo => !todo.complete).length} TO-DOs left
      </div>
     </div>
    </>
  )
}

export default App;