# Redux Toolkit

Our next project is going to span a few week. We are going to me making and managing several lists with some randomly generated content using FakerJs. Faker is a fun library for generating fake data so we can focus on other things (like learning Redux Toolkit).

In our Week11 folder you will find some starter files for todays project. Here is a new `create-react-app` with the following libraries installed:

- [classnames](https://www.npmjs.com/package/classnames)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [Tailwind Merge](https://www.npmjs.com/package/tailwind-merge)
- [FakerJS](https://fakerjs.dev/guide/)
- [React Icons](https://react-icons.github.io/react-icons/)

We also have an our `Button` and `Card` components from our last project and a file inside `data/` that exports a few functions to generate some random content for us.

These starter files should take care of our JSX so we can focus on our reducers! Please note we have defined handlers, but they do not do anything yet!.

This app has 2 separate lists we need to keep track of, so we will need 2 reducers. Aside from that, the flow is almost identical to our last exercise using `useReducer`!

Our state will look something like:

```jsx
{
	movies: [‘Face Off’],
	songs: [‘Protect ya Neck’],
}
```

One reducer will handle updates to movies, and another reducer will handle updates to songs. To start, we will keep all of our redux code inside named `store/index.js`. Let’s go ahead and create that file and folder now.

We are now going to start using redux toolkit. First we need to install `react-redux` in our project.

```bash
npm install redux
npm install @reduxjs/toolkit
```

now let’s import some tools inside `store/index.js`

```jsx
import {configureStore, createSlice} from '@reduxjs/toolkit'

const songSlice = createSlice({
  name: 'song',
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload)
    },
    removeSong(state, action) {
      // looks familiar right?
    },
  },
})

const store = configureStore({
  reducer: {
    songs: songSlice.reducer,
  },
})

console.log(store)
```

We aren’t calling anything from our store file anywhere yet. Let’s go ahead and import it in our main `src/index.js` so we can see our console.log and check for errors.

```jsx
import './store'
```

OK. Cool. We are logging out our Redux Store now. But what the heck did we just write?

Store: an object that will hold all of our state
React-Redux library will handle the store for us most of the time. However, sometimes we might want to debug:

We can dispatch an action with `store.dispatch({type: ‘songs/addSong’})

We can see what state exists in store with:
`store.getState()`

Let’s try these manual calls at the end of our store file:

View our Starting State:

```jsx
const startingState = store.getState()
console.log(JSON.stringify(startingState))
```

Add a song to our State:

```jsx
store.dispatch({
  type: 'song/addSong',
  payload: 'Where is My Mind?',
})
```

View the updated State:

```jsx
const finalState = store.getState()
console.log(JSON.stringify(finalState))
```

Cool! Remember, we don’t need to update our State like this, we can use Redux Toolkit for that. But it’s nice to know these options are there in a pinch!

Things to keep in mind when working with Redux Store:

- State is usually stored in one big object
- Keys in that object are made when store is created
- Values are produced/changed over time by the reducers

So what’s a Slice? Slices create reducers and action types automatically.

- Defines initial state
- Combines ‘mini-reducers into one big one.
- Creates a set of action creator functions for us
- (Remember in the useReducer example we had to define all of these action types and a switch statement? We don’t have to do that here. Now we define our actions inside of `songSlice.reducers`.
- we can access any of our actions using this pattern: `name + ‘/‘ + functionName. So in our case`song/addSong`is the type we used in the`store.dispatch()` call above. Don’t worry, there are tools to create these action creators for us so we don’t have to write out these action objects and memorize the types ourselves.

This is easier to understand when we see it in action so let’s keep coding!

## React-Redux Provider

AKA: How we make our Redux store available to our React App.

Steps to connect React to Redux

1. Export the ‘store’ from the file it was created in
2. import it to our root `index.js`
3. Import ‘Provider’ from react-redux
4. Wrap our App in the Provider and pass it `store`

Now let’s wire up our addSong action to our Button inside SongList.

1. Add a reducer function (we have already don’t this with addSong)
2. Export that action creator at the bottom of our store file: `export const {addSong} = songsSlice.actions`
3. Import that function in the component we want to use it. We also need to import `useDispatch` from ‘react-redux’
4. Call useDispatch
5. Call the action creator function and dispatch it

```jsx
import {useDispatch} from 'react-redux'
import {addSong} from '../store'

…

export default function SongList() {
  const dispatch = useDispatch()

…

const handleSongAdd = (song) => {
    // Add song to list of songs
    dispatch(addSong(song))
  }

…
```

Great. One last thing, we need access to our store so we can render the added songs!

1. Find the component that needs state
2. import `useSelector` hook from ‘react-redux’
3. Call the hook, and pass in a selector function

```jsx
import {useDispatch, useSelector} from 'react-redux'
…

  const songPlaylist = useSelector((state) => {
    return state.songs
  })
```

Now when we click `[add song]` we should see new random songs listed out inside of our `SongList`!

Our Song List is almost done, we need to wire up our remove song button. Remember we need to include the name of the song to remove in our payload.

```jsx
removeSong(state, action) {
      // action.payload === the name of the song we want to remove
      // get the index of the song passed in via payload
      const index  = state.indexOf(action.payload)
      // call splice with that index to remove just the one song from our array
      state.splice(index, 1)
    },
```

Don’t forget to export it at the bottom!

```jsx
export const {addSong, removeSong} = songsSlice.actions
```

And now we can use it in SongList in our handleSongRemove function:

```jsx
const handleSongRemove = (song) => {
  // Remove song from list of songs
  dispatch(removeSong(song))
}
```
