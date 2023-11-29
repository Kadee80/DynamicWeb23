# Redux Toolkit Continued

So far we have created a Redux `store` and a `songsSlice` to manage all of our state and reducers pertaining to `songs` inside our `state`.

We wired up acces to our `store` located inside `store/index.js` using a `{Provider}` imported from `'react-redux'` and wrapping our entire `App` with it.

We imported `useSelector` from `'react-redux'` to read values from our store's `state` inside our `SongList` component.

We imports `useDispatch` from `'react-redux'` to dispatch different `action`s to add/delete values from our store's `state` inside our `SongList`.

## An Important Note about `state`:

We are seeing the parameter/argument state a lot now right? Inside out reducer, state means the piece of state that reducer is in control of. For example: `state` when we are inside the `songsSlice` only refers to state pertaining to `songs`. Everywhere else in our code, when we reference `state`, it means the entire `state` object in the `store`.

`state` = state this reducer is in control of aka `songs: ['song 1', 'song 2', etc..]` so when we say `state.push` and it only adds to `songs`:

```jsx
  reducers: {
    // name + '/' + functionName = 'song/addSong'
    addSong(state, action) {
      // State here is not the BIG state object in store
      // State here is the piece of state manages by this reducer
      state.push(action.payload)
    }
```

`state` outside of a slice and its reducers like here in `SongList` `state` = everything in store, hence `state.songs`:

```jsx
const songPlaylist = useSelector((state) => {
  return state.songs
})
```

## Movie List

Before we move on, to the the big reset button on the top. Let’s practice everything we learned making our `songSlice`, initialState, reducers and adding them all to our store, and accessing thing within our `SongList` component, but this time with a new moviesSlice, and our `MovieList` component!

- [Notes on Intro to Redux toolkit and last weeks exercise](https://github.com/Kadee80/DynamicWeb23/blob/master/Week11/REDUX_TOOLKIT.md)
- [End of class exercise final code/Todays starter code](https://github.com/Kadee80/DynamicWeb23/blob/master/Week11/finalSrcReduxToolkit.zip). If downloading the code and using it for today’s class, be sure to run `npm install` to make sure you have all of the libraries needed to run this project.

1. Add a new `moviesSlice`
2. Connect it to our Redux store
3. Export an action from our new `moviesSlice`
4. Find the component that needs to use that action and import it
5. Wire that action up in MovieList (using the `useDispatch` hook)
6. Import `useSelector` and call the hook passing a selector function to render what we need from state

## Reset Both

If you take a look at our app, we have one last button to wire up with an action that resets both playlists to empty. Since we just said the word _both_, this event handler should live alongside the reset button jsx in `App`. Let’s call this event handler `handleResetClick`.

```jsx
const handleResetClick = () => {
  // todo
}
```

What’s different about this functionality is it needs access to state controlled by the `songsSlice` and also the `moviesSlice`. For our first pass, we are going to first proceed as if this handler is only responsible for clearing out the state inside our `moviesSlice`. This way we can simply follow the flow we have just learned and practiced.

- Add a new action to our reducer to empty out state. Since we are using Immer, we might think we can write something like `state = []`. This will not work since you are reassigning the variable and giving it an entirely new value! In order for Immer to understand what piece of state we are updating we have to _mutate the existing state_. To do so we need to mutate a property of state. This is a special case, and we need to rely on a fallback, we need to return a new value for immersion to assign as the new state.

```jsx
reset(state, action) {
	return []
    }
```

- Now we have to export it alongside our other `moviesSlice.actions`

```jsx
export const {addMovie, removeMovie, reset} = moviesSlice.actions
```

- Now we have to import `reset` inside `App.js`

```jsx
import {reset} from './store'
```

- in in order to use it we will need to import and `useDispatch` as well.

```jsx
import {useDispatch} from 'react-redux'
…
import {reset} from './store'
…

  const dispatch = useDispatch()
  const handleResetClick = () => {
    dispatch(reset())
  }

```

At this point, we should be able to click the reset button at any time and our movies playlist will be cleared out! We now need to address resetting our songs playlist as well.

## Multiple State Updates

We need to update resetting both the movie and song playlists at the same time.

There are many ways we might try to do this:

#### Idea 1

Have the movieSlice reset update the songs playlist too too. NOPE! Cannot be done. We don’t have access so songs state as state inside of our reducer functions! `moviesSlice` only manages movies state.
The rule to remember here is reducer functions inside a slice can’t see other change state in another slice!

#### Idea 2

Dispatch 2 separate actions? Totally works, but as a general rule we want to minimize the number of dispatches.

#### Idea 3

Have the songsSlice watch for the existing reset action in moviesSlice. We will take a look at this one:
When we create a `songsSlice` it creates a single combined Songs Reducer function. This then flows into the Rescue Store’s dispatch function. This songs reducer now takes a look at all actions types that flow through dispatch. If a type matches, it then runs the corresponding micro reducer.

- The Songs Reducer only cares about types: `song/addSong` and `song/removeSong`.

- The Movies Reducer only cares about types: `movie/addMovie` and `movie/removeMovie`.

A cool thing to remember: When an action is dispatched, it is sent to every combined reducer in our store (songsSlice.reducer OR moviesSlice.reducer, not all of our individual reducer functions)! In addition, if an action is dispatched with a type that matches none of our types, it automatically does nothing. We haven’t had to care about this until now.

Watching for other Actions:

Back to the tas at hand, we want to watch for the existing reset action ( `’movie/reset’`) from our `moviesSlice.Reducer` inside our `songSlice`. We can see this by adding `console.log(action)` to our reset action.

Now that we have the action to watch for, let’s jump down to `songsSlice` and see what that code might look like. After `reducers: {…},` we are going to add a new property (also a function) named `extraReducers`.

```jsx
extraReducers: () => {},
```

or

```jsx
  extraReducers(){

  },
```

The `extraReducers` function receives an argument called `builder`. It is called automatically and receives this builder object This is how we tell our reducer to look for additional action types!

```jsx
  extraReducers(builder){
    builder.addCase('movie/reset', (state, action) => {
      return []
    })
  },

```

`builder.addCase()` takes two arguments. this first is the action type we want to watch for, the second is the mini reducer we would like to fire when that action type is dispatched. In this case, all we want to do is return a new empty array for our songsSlice.state! Now let’s save and test this new code.

It works! But we can still do better. Before we move on to our last idea, let’s do a small refactor.

##### Refactor: Remove raw strings as action types

Before we move on, remember that our slices are automatically creating our action types for us. We are then exporting them at the end of our `store/index.js`.

```jsx
export const {addMovie, removeMovie, reset} = moviesSlice.actions
```

Let’s go ahead and console.log our reset function below that line of code:

```jsx
console.log(moviesSlice.actions.reset.toString())
```

Inside your console you should see `movie/reset`. That is our action type. Let’s use this instead of a raw string inside our extraReducers.

```jsx
  extraReducers(builder) {
    builder.addCase(moviesSlice.actions.reset.toString(), (state, action) => {
      return []
    })
  },
```

This works, and this is a common practice. We can even remove the `toString()` part at the end. This should still work too! remember do not write `reset()` since this will CALL the function and that is not what we want.

This works, but we can still do better! Here are some downsides:

We have a dependency between our two reducers. If we remove or rename our reset inside our movies reducer, we need to remember to update our songs reducer as well. What if we removed or rename our moviesSlice all together? Our songsSlice would break unexpectedly.

#### Idea 4

Make an entirely new reset action and have both slices watch for it. We need to make this type manually.

Then need to tell both of our reducers to watch for this new action type we are about to create. This will be called `app/reset`.

Inside `store/index.js` we need to remove our reset reducer code from our `moviesSlice.reducers` and comment out our case inside `songsSlice.extraReducers`. Don’t forget to delete the reset export at the bottom! Don’t forget to remove any references inside `App.js!`

We now need to import `createAction` from our toolkit at the very top.

```jsx
import {configureStore, createSlice, createAction} from '@reduxjs/toolkit'
```

And define reset directly below that (outside and above our slices):

```jsx
const reset = createAction('app/reset')
```

So what did we just do? This is an action creator! Let’s console log it and take a look. It’s just another action creator in our console with a type and payload!

```jsx
console.log(reset())
```

to get the raw action type we can say:

```jsx
console.log(reset.toString())
```

inside console we now simply see see:

```js
app / reset
```

Great! Now can add in this `extraReducer` into our movieSlice and update our `songsSlice` movie reducer to watch for this new action type!

```jsx
extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return []
    })
  },
```

We now need to write this new reset action up in our `App` component.

Don’t forget to export our new reset from `store/index.js`!

```jsx
export const reset = createAction('app/reset')
```

Inside `App` we may have commented out our imports for reset just to avoid everything breaking during our refactor. Now we can uncomment the imports and usage and everything should work just as before!

It works! This may all feel a little confusing at this point and that’s ok. As long as we walk away here understanding the flow of adding slices and implementing their reducers’ actions in our code, we’ve come a long way! Before we move on, let’s do a little code cleanup!

#### Refactor: Cleaning up our store

Option 1: Organize by function

- components
  - MovieList
  - SongList
  - etc
- store
  - actions (our reset)
  - slices (movies, songs)
  - index (create and export store)

Option 2: Organize by feature

- Movies
  - MovieList
  - moviesSlice
- songs
  - SongList
  - songsSlice
- Store
- App.js

The point here is when you get to work, there’s going to be a preferred convention you will need to learn to implement.

Redux docs recommend by Feature. But we are using ReduxToolkit which works better with the by Function approach because of circular dependencies (circular import issues). We are going to take a look, but ultimately take the by Function approach.

**Consideration 1:**
Components importing directly from a slice file can get messy fast. Instead, once we create our slice files, we will import and export everything ultimately from our index,js file where we also create and export our store. `store/index.js` will be our access point for all exports related to Redux outside of our store directory.

First let’s create a few new files and folders

`store/`

- `index.js
- `actions.js`
- `slices/`
  - `moviesSlice.js`
  - `songsSlice.js`

Now a little copy paste magic and our code will be broken until we fix our import and exports!

actions.js:

```jsx
import {createAction} from '@reduxjs/toolkit'

export const reset = createAction('app/reset')
```

moviesSlice.js:

```jsx
import {createSlice} from '@reduxjs/toolkit'
import {reset} from '../actions'

const moviesSlice = createSlice({
  name: 'movie',
  initialState: [],
  reducers: {
    addMovie(state, action) {
      state.push(action.payload)
    },
    removeMovie(state, action) {
      const index = state.indexOf(action.payload)
      state.splice(index, 1)
    },
  },
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return []
    })
  },
})

// export our actions
export const {addMovie, removeMovie} = moviesSlice.actions
// export the combined reducer, we are going to stick to all named exports, no curly braces cause we are not destructiing here!
export const moviesReducer = moviesSlice.reducer
```

songsSlice.js:

```jsx
import {createSlice} from '@reduxjs/toolkit'
import {reset} from '../actions'

const songsSlice = createSlice({
  name: 'song',
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload)
    },
    removeSong(state, action) {
      const index = state.indexOf(action.payload)
      state.splice(index, 1)
    },
  },

  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return []
    })
  },
})

export const {addSong, removeSong} = songsSlice.actions
export const songsReducer = songsSlice.reducer
```

Finally `index.js` is screaming at us. Let’s tidy it up!

index.js:

```jsx
import {configureStore} from '@reduxjs/toolkit'
// import our actions so this is the central export point for all other files!
import {songsReducer, addSong, removeSong} from './slices/songsSlice'
import {moviesReducer, addMovie, removeMovie} from './slices/moviesSlice'
// dont forget our reset action!
import {reset} from './actions'

const store = configureStore({
  reducer: {
    songs: songsReducer,
    movies: moviesReducer,
  },
})

export {store, addSong, removeSong, addMovie, removeMovie, reset}
```
