# More Redux Toolkit!

Today, we are going to set up a slightly more complicated project using redux toolkit. We are going to create an app that allows a user to keep track of their art collection.

MVP:

Need to haves:

- A user can add a new piece of art with a name and dollar value via an ArtForm
- onSubmit, this new piece of artwork will be added to the user’s collection and displayed in an ArtList. The ArtworkForm will clear out when a new artwork is created.
- The app will also display the total value of their art work collection.
- A user will be abled to delete individual pieces of art from their collection with delete buttons inside the ArtList.
- A TotalValue component will display the total dollar amount their collection is worth.
- If an ArtItem is deleted, the ArtValue should update to reflect the new $ amount.
- The ArtList will be searchable. When a user enters a search term, the ArtList should temporarily hide all ArtItems that do not match the search term.
- When the ArtList has been searched/filtered, the ArtValue should update to reflect the $ amount of only the visible ArtItems

Nice to Have:

- When there is a partial match between a new Artwork being added, and an existing Artwork in the users existing collection, the existing artwork will be highlighted and bold inside the ArtworkList.

Great. Lets get quickly add our Components so we can begin wiring them up to our redux store.

List of components:

- ArtForm
- ArtSearch
- ArtList
- ArtValue

These components will dispatch action objects using our `useDisptach` hook to update state inside our redux store. They will fetch state using our useSelector hook to render on the screen. All 4 of our components will be displayed via our `App` component.

Inside our Week12 directory, there is a starter app with the following extra libraries installed:

```bash
npm install @reduxjs/toolkit react-redux classnames tailwindcss
```

Today you can simply run

```bash
npm install
```

to get all of the node modules needed.

Once you have installed all needed libraries, we can open up our project in VS Code and view a few starter files as well as o few starter classes.

————————

## Redux Store Design

Instead of jumping in to JSX first this time. We are going to design our store first! This flow is similar to what we have done in the past:

- What state exists in our app?
- How does it change over time
- How can we group common pieces of state?
- Create slices accordingly.

Pieces of State:

ArtForm:

- name (artist, title): string
- price: number

ArtSearch:

- searchTerm: string

ArtList:
art: Array of {id, name, price}

These all seem pretty straight forward, but we also have to compute at total price based on which ArtItems are currently displayed in our ArtList, or which ArtItems match the current searchTerm. These are pieces of derived state or values we can calculate based on what we have in our existing state!

- totalPrice: calculate based on visible ArtItems in art
- matchedArt: searchTerm and art

How state changes over time:

- changeName
- changePrice
- changeTerm
- addArt
- removeArt

These are our reducer function!

How can we group these?

We can think about this as state related to adding a new ArtItem, and state related to deploying the list of ArtItems. We could split them even further but today we will stick to 2 slices. Once for Adding and once for displaying.

formSlice:

- name
- price
- changeName
- changePrice

artSlice:

- searchTerm
- art
- changeTerm
- addArt
- removeArt

Now let’s make these slices! We will start by making a folder called `store/` and a folder within that folder names `slices/`, and add 2 files; `formSlice.js` and `artSlice.js`. You can call them whatever you want. Just keep it consistent!

Let’s start with our formSlice. This should all look familiar, but one difference right off the bat is our `initialState`. We need to keep track of our name and price here.

```jsx
import {createSlice} from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    price: 0,
  },
  reducers: {
    changeName(state, action) {},
    changeCost(state, action) {},
  },
})
```

For our reducers, we can make the assumption that there will be an action.payload containing what it is we want to change the name or cost to from our form inputs!

```jsx
changeName(state, action) {
      state.name = action.payload
    },
    changePrice(state, action) {
      state.cost = action.payload
    },

```

That’s it! Just a few exports for our actions and reducerat the bottom:

```jsx
export const {changeName, changePrice} = formSlice.actions
export const formReducer = formSlice.reducer
```

Next up is our artSlice. Once again, we will want our initial state to be an object with our two pieces of state, and we can assume we will be receiving some payloads for changing, adding, or deleting. `changeTerm` is straightforward, but when we get to `addArt` we are going to need access to state inside our `formSlice`! One slice has absolutely no ability to look into another slice’s state. We need to rely once again on our `action.payload` to receive the values we need here!

An example payload might look something like:

```jsx
{ name: 'Van Gough, Starry Night', price: 500 }
```

We need to make sure we provide a payload it needs to resemble the format above! What about these unique ids we mentioned before? We need to randomly generate one on the flu here in our reducer. We are going to use the built in solution from redux toolkit. Don’t forget to import it at the top!

Next up is `removeArt`. once again we need to rely on our action.layload to provide the ID of the artItem we would like to remove. To remove the individual art item, we can use the filter function and assign the newly filtered array as our new state.

```jsx import {createSlice, nanoid} from '@reduxjs/toolkit'

const artSlice = createSlice({
  name: 'art',
  initialState: {
    searchTerm: '',
    art: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    addArt(state, action) {
      // we need up update state.cars
      // we need to get our values from our payload, NOT the formSlice state!
      // assume action.payload === { name: 'Van Gough, Starry Night', price: 500 }
      state.cars.push({
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(),
      })
    },
    removeArt(state, action) {
      // assume action.payload === the id of the artItem we want to remove
      // use filter function to remove the one with the matched id
      const updated = state.art.filter((item) => {
        return item.id !== action.payload
      })
      // assign updated as the new art piece of state
      state.art = updated
    },
  },
})

// dont forget the exports!
export const {changeSearchTerm, addArt, removeArt} = artSlice.actions
export const artReducer = artSlice.reducer

```

Wow, pretty fast, the key is to not forget about all of these assumed payloads!

Next up is our `store`. Let’s add an `index.js` inside our `store/` folder and get to work!

```jsx
import {configureStore} from '@reduxjs/toolkit'
import {
  artReducer,
  addArt,
  removeArt,
  changeSearchTerm,
} from './slices/artSlice'
import {formReducer, changeName, changePrice} from './slices/formSlice'

// configure store

const store = configureStore({
  reducer: {
    art: artReducer,
    form: formReducer,
  },
})

// export our store and all of the other imported action creators.
// we are exporting them all here to avoid circular dependencies with imports!
export {store, changeName, changePrice, addArt, removeArt, changeSearchTerm}
```

Last up is providing our App with access to our store and action creators etc inside our main `index.js` in our project.

```jsx
import React from 'react'
// we only need the one import from ReactDOM
import {createRoot} from 'react-dom/client'
// import Provider and store to wrap our app component
import {Provider} from 'react-redux'
import {store} from './store'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

Nothing should look different in our App at this time. Take a moment to make sure there are no errors either!

### Writing up our name input

Today we will conclude by wiring up a single form input (name) to our redux store. Go ahead and open up `ArtForm`. We won’t worry about styling just yet.

To Change State:

- import the appropriate action creator, along with `useDipatch`
- call`useDispatch` to gain access to the dispatch function from redux
- call the action creator and dispatch it!

Accessing State:

- import `useSelector` hook
- call the hook and pass in a selector function
- use that piece of stat in our component!
