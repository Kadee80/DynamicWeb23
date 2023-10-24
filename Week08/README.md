## Sanity Check:

Let’s first make sure we are all on the same page with our API refactor from last week. We had a few hiccups, myself included so let’s all double check our scripts and API calls before moving on.

1. Update our script to be super explicit about the host location:

If you have `db.json` as a free file inside the root of your project:

```bash
"server": "json-server --port 3001 --watch db.json --host 127.0.0.1",
```

If you moved `db.json` into a folder named `server/` at the root of your project

```bash
"server": "json-server --port 3001 --watch server/db.json --host 127.0.0.1",
```

2. Make sure your have REST Client installed and enabled in VS Code

3. Open your projects in 2 tabs in terminal.

- in the first tab run
  `npm start`
- in the second tab run
  `npm run server`

_NOTE: since we are fetching our todos list on load from our db.json now, only running rpm start will throw an error. make sure your server is up and running before running your dev server project!_

We can test API calls with our `api.http` file by clicking the send request button that appears above each route. These will not work unless we are running our server. Let’s take a moment to test them now.

After that let’s make sure all of our functionality is working in our app.

Once we are all on the same page it’s time to move on to an exciting refactor. Remember how tedious it was passing all of those functions down from `App` into children, and children of children? It can get confusing for sure and opens up a lot of opportunity for simple errors. Today we will explore an alternative to props alone: Context!

## An Alternative to Props Alone: Context

Things to remember as we proceed:

- Context is not a replacement for props!
- Context is not a replacement for centralized state stores like Redux.
- Context by itself is a communication channel

Before we do a considerable refactor to use Context inside of our app. Let’s do a small simple exercise to understand Context and what it is doing for us.

1. Create the context.

- `createContext` has 2 properties: Provider and Consumer (more on this in later classes). The Provider is the component used to specify what data we want to share across our application.
  `<Context.Provider>`

2. Specify the data to be shared.
   The `value` prop here is super special, whatever is provided here will be shared with the rest of the application. can be a number string, array with a list or an object with a bunch of stuff including functions.
   Anything wrapped in the provider can access the values shared in context

3. “Consume” the data in a component
   `useContext` is the function for accessing value in `context`

Let’s write some code and see the steps above in action

Create folder called `context/` inside src

- create a new file `todos.js`
- import, create and export

```jsx
import {createContext} from 'react'
// use create context to create our context for our todos
const TodosContext = createContext()

//export it
export default TodosContext
```

Open index.js and wrap the app component with the context provider

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TodosContext from './context/todos'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <TodosContext.Provider value={5}>
    <App />
  </TodosContext.Provider>
)
```

Try and get access in TodoList using useContext

```jsx
import {useContext} from 'react'
import TodosContext from '../context/todos'
import TodoItem from './TodoItem'
export default function TodoList(props) {
  const {todos, onDelete, onEdit} = props
  const num = useContext(TodosContext)
  const renderedTodos = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
    )
  })

  return (
    <div>
      {num}
      {renderedTodos}
    </div>
  )
}
```

Now we have the value shared in context, but it is static aka won’t change
We want it to change over time
and we want to content on the screen to update accordingly… STATE like count setCount, how do we pass this in to our context provider? Something like:

`value={{count,setCount}}`

Here’s the confusing part: another provider. same word, but it does different things.

The second provider wraps the first. We can do that in our todos.js

```jsx
import {createContext, useState} from 'react'

// use create conext to create our contect for our todos
const TodosContext = createContext()

function Provider({children}) {
  const [count, setCount] = useState(5)

  const valuesToShare = {
    count: count,
    incrementCount: () => {
      setCount(count + 1)
    },
  }

  return (
    <TodosContext.Provider value={valuesToShare}>
      {children}
    </TodosContext.Provider>
  )
}

// named export
export {Provider}
//export as default
export default TodosContext

// import TodosContext, {Provider} from './content/....'
```

Now in `index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from './context/todos'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider>
    <App />
  </Provider>
)
```

NOTE: the `App` component shows up as the prop `children` inside Provider!

Now inside `TodoList` we need to access multiple properties using destructuring. Lets also add a button to call our incrementCount function

```jsx
import {useContext} from 'react'
import TodosContext from '../context/todos'
import TodoItem from './TodoItem'

export default function TodoList(props) {
  const {todos, onDelete, onEdit} = props
  const {count, incrementCount} = useContext(TodosContext)
  const renderedTodos = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
    )
  })

  return (
    <div>
      {count}
      <button onClick={incrementCount}>Add to Count</button>
      {renderedTodos}
    </div>
  )
}
```

What’s happening: Provider has some state, every time our count updates Provider and everything wrapped in it (app, etc) updates!

Before we update our Provider with everything App.js was handling we need to think about Application State vs Component State for example `todos` vs `showEdit`. Many components consume our list of todos, only our individual `TodoItem`s care about `showEdit`. What about to titles inside the forms? those are probably component state too right?

_Application State_

- Todos
- Fetch
- Create
- Edit
- Delete

_Component State_

- Title(s) bound to input elements
- showEdit

## In Class Exercise: Refactor!

Let’s do a big refractor and move all of the TODOs as well as Fetch, Create, Edit, Delete functions to our context provider and consume them differently inside each component.

Final `src/` folder will me posted inside of this weeks notes at the end of class.

Together we will:

- move everything from `App` state to context provider, leave our useEffect function
- update value from empty object to share all the things!
- reach up to context to grab the fetchTodos function
- peep our child components and remove the props

Then

- update all children components to consume the proper functions and values from context instead of props. There will be some instances where we use both props and context!
