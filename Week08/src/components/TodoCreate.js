import {useState, useContext} from 'react'
import TodosContext from '../context/todos'

export default function TodoCreate(props) {
  const [title, setTitle] = useState('')
  const {createTodo} = useContext(TodosContext)
  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // no more onCreate prop, now we call createTodo
    createTodo(title)
    setTitle('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input onChange={handleChange} value={title} />
        <button>Create</button>
      </form>
    </div>
  )
}
