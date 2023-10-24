import TodoItem from './TodoItem'

export default function TodoList(props) {
  const {todos, onDelete, onEdit} = props

  const renderedTodos = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
    )
  })

  return (
  <div>
    {renderedTodos}
    </div>
  )
}
