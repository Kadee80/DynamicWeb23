import {useContext} from 'react'
import TodosContext from '../context/todos'
import TodoItem from './TodoItem'

export default function TodoList() {
  const {todos} = useContext(TodosContext)
  const renderedTodos = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} />
    )
  })

  return (
  <div>

    {renderedTodos}
    </div>
  )
}
