import {useState} from 'react'
import TodoEdit from './TodoEdit'

export default function TodoItem(props) {
  const {todo, onDelete, onEdit} = props
  const [showEdit, setShowEdit] = useState(false)

  const handleDeleteClick = () => {
    onDelete(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle)
    setShowEdit(false)
  }

  let content = <h3>{todo.title}</h3>
  if (showEdit) {
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
