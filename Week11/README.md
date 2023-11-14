# Intro To Redux: `useReducer`

Today we are going to first take a look at the React hook `useReducer`. To do so, we are going to make a quick counter (yes, another counter) in a `CounterPage` inside the app we have been working on for the past few weeks. Before we do that, let’s add another highly reusable component called `Card`. Our card component is simply a full width div with a light rounded border, a drop shadow, and the ability to add in other custom classes via the `className` prop.

Note: Last week we disabled our Typescript Plugin when working with Flow. Let’s make sure it is re-enabled today so we have access to all of the autocomplete goodies that plugin gives us for free.

To enable/disable the TypeScript plugin, go to the extensions panel (4th icon down in the left sidebar) and search :

```
@builtin typescript
```

View the plugin’s dashboard and `enable/disable` at will.

Card Component:

```jsx
import cx from 'classnames'

export default function Card({children, className}) {
  const styles = cx(
    'border border-slate-300 rounded-lg p-3 shadow bg-white w-full',
    className
  )

  return <div className={styles}>{children}</div>
}
```

Counter Page:
``jsx
import {useState} from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

export default function CounterPage({initialCount}) {
const [count, setCount] = useState(initialCount)

const increment = () => {
setCount(count + 1)
}

const decrement = () => {
setCount(count - 1)
}

return (
<Card className="m-4">

<h1 className="text-xl mb-4">Count is currently: {count}</h1>
<div className="flex flex-row">
<Button success outline rounded onClick={increment}>
Increment
</Button>
<Button danger outline rounded onClick={decrement}>
Decrement
</Button>
</div>
</Card>
)
}

````

And let’s not forget to add our CounterPage to a route inside `App.js`:

```jsx
<Route path="/counter">
          <CounterPage initialCount={23} />
        </Route>
````

And our `Menu` component:

```jsx
{label: 'Counter', path: '/counter'},
```

OK. Now that we can see our counter page and it’s working, let’s add the form to add larger number at a time.

```jsx<form>
        <label>Add a custom number to the count:</label>
        <input
          type="number"
          className="p-1 m-4 bg-slate-50 border border-slate-300"
        />
        <Button primary outline rounded>
          Add Custom
        </Button>
      </form>

```

Don’t forget to bind our form input to a piece of state! Let’s call ours `valueToAdd`. Remember: even though we have an input with `type=“number”` it’s still going to be received as a string. We also need to account for the user deleting any value from the form and receiving an `NaN`. Can’t do math with that right?

```jsx
  const [valueToAdd, setValueToAdd] = useState(0)

…

  const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0
    setValueToAdd(value)
  }

…

<input
          value={valueToAdd || ''}
          onChange={handleChange}
          type="number"
          className="p-1 m-4 bg-slate-50 border border-slate-300"
        />

```

Looking good. One last thing to add: `handleSubmit` on our form. Remember this will be called when a user presses the `enter` key or clicks the button inside our form.

```jsx
const handleSubmit = (event) => {
    event.preventDefault()
    setCount(count + valueToAdd)
    setValueToAdd(0)
  }

…

<form onSubmit={handleSubmit}>

…

```

All set! Now it’s time to refactor to use and better understand how `useReducer` works before we jump into learning `Redux`.

## useReducer

`useReducer` is another built in hook from React.

- a `useState` alternative that also produces state, which causes a component to re-render when this state changes
- great for when you have several related pieces of state (count + valueToAdd)
- great for when future state has to account for the current state (count + 1)

Back to our code. Let’s start my commenting out any usage of `useState` and its setters.

Now, let’s replace useState with useReducer. We will get an error in our browser for the time being. hang tight!

```jsx
import {useReducer} from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

const reducer = (state, action) => {
  // nothing here just yet
}

export default function CounterPage({initialCount}) {
  // const [count, setCount] = useState(initialCount)
  // const [valueToAdd, setValueToAdd] = useState(0)
  const [state, dispatch] = useReducer(reducer, {
    count: initialCount,
    valueToAdd: 0,
  })

…

```

So `useState` and `useReducer` have a few commonalities:

- state variable
- a function to change the state
- initial values for each piece of state
- The difference is `useState` defines each piece individually where `useReducer` defines all state within a single object we call `state`. So if we want access to our `count` variable inside our `state` it is now `state.count`. Let’s fix that up inside our JSX.

```jsx
<h1 className="text-xl mb-4">Count is currently: {state.count}</h1>

…

<input
          value={state.valueToAdd || ''}
          onChange={handleChange}
          type="number"
          className="p-1 m-4 bg-slate-50 border border-slate-300"
        />

```

OK, our counter works again, but how do we update it? Enter `dispatch`.

- When we call dispatch, React finds our reducer function and runs it.
- The state argument in reducer is our current state.
- Whatever argument we pass in to `dispatch()` shows up in our reducer function as `action`. (Calling the second argument `action` is a very common pattern, but not a hard requirement. )
- The reducer function returns our updated state when called. If we return nothing, our state it `undefined`!!!
- We cannot use async/await, requests, promises or outside variables in our reducer. In summation: our reducer should only operate based on our `state` and `action` parameters.
- _We should never directly modify the state object. Don’t mute that state!_ We should copy and overwrite like we did earlier in the semester in our Todo list.

OK that last one is a big one. Let’s take a look at an example of a good and bad reducer:

BAD:

```jsx
const reducer = (state, action) => {
  state.count = state.count + 1
  return state
}
```

GOOD:

```jsx
const reducer = (state, action) => {
  return {
    ...state,
    count: state.count + 1,
  }
}
```

Back in our `CounterPage`, we still need to update our code in our handler function to use this new pattern. We start by calling `dispatch()`. When we call dispatch our reducer function is called. If we do not pass an argument in to dispatch, `action` is undefined. That is OK!

```jsx
const increment = () => {
  dispatch()
}
```

```jsx
const reducer = (state, action) => {
  return {
    ...state,
    count: state.count + 1,
  }
}
```

Now when we click our increment button, we are correctly updating our counter state! Right now, our reducer only/always increments the count by 1 when called. We will need to refactor immediately to add in cases for all of our handlers. To do that, we need to take a deeper dive into our `action` argument.

How do we tell the reducer why it is being executed and what piece of state to update? Let’s take a look at a popular convention:

- When we call dispatch, we should always pass in an action object.
- The action object should always have a `type` property to tell the reducer what update to make
- Any other data we need to pass to the reducer should come in under the `payload` property

For our increment handler:

```jsx
const increment = () => {
  dispatch({
    type: 'increment-count',
  })
}
```

For our input binding:

```jsx
  const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0
    dispatch({type: 'change-value-to-add’, payload: value})
  }

```

What might these look like inside our reducer? Let’s start out with a series of conditional statements.

```jsx
const reducer = (state, action) => {
  if (action.type === 'increment-count') {
    return {
      ...state,
      count: state.count + 1,
    }
  }
  if (action.type === 'change-value-to-add) {
    return {
      ...state,
      valueToAdd: action.payload,
    }
  }
  // return state by default in the event none of the conditions above are met
  return state
}
```

#### Refactor 1: Constants for action types

This refactor is going to look familiar to those of you who have seen redux in the wild. Here’s why we do it: long strings = more possibilities for typos! A simple convention has arisen to help avoid this.

- Make the action types constants
- By using variable names instead of raw strings, an error will be thrown if you mis-spell the variable name.
- Use the ALL_CAPS convention to communicate to other engineers that this is an action type

```jsx
const INCREMENT_COUNT = 'increment-count'
const SET_VALUE_TO_ADD = 'set-value-to-add'

const reducer = (state, action) => {
  if (action.type === INCREMENT_COUNT) {
    return {
      ...state,
      count: state.count + 1,
    }
  }
  if (action.type === SET_VALUE_TO_ADD) {
    return {
      ...state,
      valueToAdd: action.payload,
    }
  }
  // return state by default in the event none of the conditions above are met
  return state
}

…

const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
    })
  }

…

const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0
    dispatch({type: SET_VALUE_TO_ADD, payload: value})
  }
```

#### Refactor 2: Use a switch statement

Once we have all of our logic in place, we can refactor into a switch statement to make our code a little easier to read.

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      }
    case SET_VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.payload,
      }

    default:
      return state
  }
}
```

### In Class Exercise

Now that we have tackled `handleChange` and `increment` handlers. Take a few minutes to add in all of the other cases our `CounterPage` needs to function as it did before with `useState`.

Hmmm. Our last case in our reducer is copying over, and then replacing everything we have in state. So our original copied in `…state` is deleted and overwritten. What’s the point of doing this in the first place? Well, what if we expanded our application to have more properties in state in the future? We could easily miss this and accidentally destroy a piece of state. By always copying over all of our state, we future proof our code.

## Immer

Remember the rule DON’T MUTATE THAT STATE? Well, yeah. writing out `{…state, }` over and over again can be a bit redundant and tedious. There is a library that allows us to directly mutate state called Immer. We are going to take a look at it briefly now, but remember:

- You might not be using Immer at work. (You probably won’t).
- You need to know the proper way to update state without it.

With Immer:

- You can directly mutate state
- You do not have to return a value
- BUT you still have to add a return line for each case so js doesn’t keep running through the rest of your cases.

To install:

```bash
nem install immer
```

To use:

```jsx
import {produce} from 'immer'
```

We then pass our reducer into the `produce` function from Immer. It will return a new wrapped reducer that allows us to directly mutate state.

```jsx
const [state, dispatch] = useReducer(produce(reducer), {
  count: initialCount,
  valueToAdd: 0,
})
```

Now we can be bad babies and directly mutate the state inside of our reducer:

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      state.count = state.count + 1
      return
    case DECREMENT_COUNT:
      state.count = state.count - 1
      return
    case SET_VALUE_TO_ADD:
      state.valueToAdd = action.payload
      return
    case ADD_VALUE_TO_COUNT:
      state.count = state.count + state.valueToAdd
      state.valueToAdd = 0
      return
    default:
      return
  }
}
```
