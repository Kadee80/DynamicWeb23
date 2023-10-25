import {useState, useContext} from 'react'
import TodoContext from '../context/todos'
import TodoEdit from './TodoEdit'

export default function TodoItem(props) {
  const {todo} = props
  const [showEdit, setShowEdit] = useState(false)
  const {deleteTodoById} = useContext(TodoContext)

  const handleDeleteClick = () => {
    deleteTodoById(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle) => {
    setShowEdit(false)
    // rely on editTodo component for edit part
  }

  let content = <h3>{todo.title}</h3>
  if (showEdit) {
    // still pass on onSubmit here because TodoItem still needs to know about submit 
    // to hide the edit component
    content = <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }
  return (
    <div>
      {content}
      <button onClick={handleEditClick}>edit</button>
      <button onClick={handleDeleteClick}>delete</button>
    </div>
  )
}
