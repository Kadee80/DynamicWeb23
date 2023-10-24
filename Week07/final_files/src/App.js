import {useState, useEffect} from 'react'
import axios from 'axios'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
export default function App() {
  const [todos, setTodos] = useState([])

  const fetchTodos = async() => {
    const response = await axios.get('http://localhost:3001/todos')
    setTodos(response.data)
  }

  useEffect(() =>{
    fetchTodos()
  }, [])

  const createTodo = async (title) => {
  const response = await axios.post('http://localhost:3001/todos', {
    title: title
  })

    const updatedTodos = [
      ...todos,
      response.data
    ]
    setTodos(updatedTodos)
    console.log(todos)
  }

  const deleteTodoById = async (id) => {
    // delete from DB
    const response = await axios.delete(`http://localhost:3001/todos/${id}`)
    console.log(response)

    // filter method does not mutate an existing array it returns a whole new one
    const updatedTodos = todos.filter((todo) => {
      // if true, keep the todo aka return it in the new filtered array
      return todo.id !== id
    })
    setTodos(updatedTodos)
  }

  const editTodoById = async(id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/todos/${id}`, {
      title: newTitle
    })

    const updatedTodos = todos.map((todo) => {
      //if the current todo matches the ID given, we want to edit it
      if (todo.id === id) {
        return {...todo, ...response.data}
      }
      // otherwise just return the other todos as they are
      return todo
    })
    setTodos(updatedTodos)
  }
  return (
    <div>
      {todos.length}
      <TodoCreate onCreate={createTodo} />

      <TodoList todos={todos} onDelete={deleteTodoById} onEdit={editTodoById} />
    </div>
  )
}
