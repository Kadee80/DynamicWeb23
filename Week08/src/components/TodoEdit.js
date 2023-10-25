import {useState, useContext} from 'react'
import TodoContext from '../context/todos'
export default function TodoEdit(props) {
  const {todo, onSubmit} = props
  const [title, setTitle] = useState(todo.title)
  const {editTodoById} = useContext(TodoContext)

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // we want the title from STATE not from our todo.title
    // still need onSubmit to close this component
    onSubmit()
    editTodoById(todo.id, title)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input onChange={handleChange} value={title} />
        <button>Update</button>
      </form>
    </div>
  )
}
