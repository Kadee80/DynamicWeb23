# Art Collection App Continued

We left off having wired up our name and cost inputs inside of our `ArtForm` component. Pretty anticlimactic and it seemed like a lot of work to wire those two inputs up, but it will all be worth it when we get into more complicated redux projects!

Just to make sure we are all on exactly the same page to start today. Please download the `art-start` zip file from this weeks repo.

Once you have downloaded and unzipped install our node packages:

```bash
npm install
```

And start your server:

```
npm start
```

## Wiring up `onSubmit`

We touched upon this at the end of last class, but let’s review before moving on.

Our form will need an `onSubmit` handler called `handleSubmit`. Here we are looking use the values from our two inputs and generate a new art item to add to `art` in our `artSlice`. For this project, we wrote out all of our actions based on certain assumptions about what we would be receiving from our `action.payload`. This is important to remember for 2 reasons: 1- an individual slice cannot read or change another slice’s state. 2- We have separate slices managing our creation form and our art collection.

While we are wiring up our onSubmit handler, let’s go ahead and throw in a quick button at the end of our form as well.

```jsx
  const handleSubmit = (event) => {
    // we dont want to reload the page
    event.preventDefault()
    dispatch(addArt({name: name, price: price}))
  }

...

<form onSubmit={handleSubmit}>

...

<div className="flex flex-col justify-end ml-3">
            <button className="px-3 py-1 rounded bg-slate-500 text-white">
              Submit
            </button>
          </div>
...

```

Fantastic. no errors but we still can’t see anything new. Next up is displaying our `art` inside of the `ArtList` component.

## Displaying our Art in ArtList

First we will want to iterated over our `art` and diplay each item. First we need to grab them out of our redux store.

```jsx
import {useSelector} from 'react-redux'

export default function ArtList() {
  const art = useSelector((state) => {
    // a little icky here becuase we named our slice artSlice
    // and the field we are accessing is also called art!
    return state.art.art
  })

  console.log(art)

  return <div>Art List</div>
}
```

If we fill out and submit our form, we will now see an item inside our art field in state! Maybe we want to change one of the properties because writing `art.art` is a little icky and it might be confusing to another engineer. Let’s call the array of art inside state `data`.

Don’t forge to update our references to the array formerly named `art`!

artSlice:

```jsx
import {createSlice, nanoid} from '@reduxjs/toolkit'

const artSlice = createSlice({
  name: 'art',
  initialState: {
    searchTerm: '',
    data: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    addArt(state, action) {
      // we need to update state.art
      // we need to get our values here from action.payload NOT formSlice.state
      state.data.push({
        name: action.payload.name,
        price: action.payload.price,
        id: nanoid(),
      })
    },
    removeArt(state, action) {
      // assume action.payload === the id of the art item we want to remove
      // use a filter function to remove the one art item with that matched id
      const updated = state.data.filter((item) => {
        return item.id !== action.payload
      })
      // assign the updated art as the new art piece of state
      state.data = updated
    },
  },
})

// dont forget the exports!
export const {changeSearchTerm, addArt, removeArt} = artSlice.actions
export const artReducer = artSlice.reducer
```

ArtList:

```jsx
import {useSelector} from 'react-redux'

export default function ArtList() {
  const artList = useSelector((state) => {
    return state.art.data
  })

  const renderedArt = artList.map((art) => {
    return (
      <div
        key={art.id}
        className="border rounded flex flex-row justify-between items-center"
      >
        <p>
          {art.name} - ${art.price}
        </p>
        <button className="rounded bg-red-500 p-2 text-white">Delete</button>
      </div>
    )
  })

  return <div>{renderedArt}</div>
}
```

Now we need to import `useDispatch`, the appropriate action creator and wire up our delete button. Remember, `removeArt` is expecting an ID as payload!

```jsx
const handleArtDelete = (art) => {
  dispatch(removeArt(art.id))
}
```

```jsx
<button
  className="rounded bg-red-500 p-2 text-white"
  onClick={() => handleArtDelete(art)}
>
  Delete
</button>
```

Fantastic! We are now working with multiple form inputs and managing multiple slices. Dreadful styling aside, this app is starting to come together. We have a few more tasks to complete, so let’s keep going!

## Form Reset onSubmit

There’s one last tiny issue with our `ArtForm` and that is that it does not reset the form fields on submit. Those fields are tied to our `formSlice` and need to be reset once we have used the values to add a new art item to our collection.

We could add in a second dispatch, to `changeName` and `changePrice` right? We discussed this idea in our previous project, and decided that we can do better than a double dispatch. This is another example of when `extraReducers` can come in handy.

The action type `art/addArt` already exists. Let’s tell our `formSlice` to watch for this action type and clear out the form state when encountered.

```jsx
import {addArt} from './artSlice'

…

  extraReducers(builder) {
    builder.addCase(addArt, (state, action) => {
      // we dont care about the action here
      state.name = ''
      state.price = 0
    })
  },
```

Go ahead and add a new piece of art to your collection and the form should reset once your art is added!

## Adding our ArtSeach

We are now going to add the functionality to search and filter our art collection. Filtering does not delete items from our `ArtList` or `state.art.data`. It simply hides any items that do not match the search criteria.

First things first, we need to add an input to receive our `searchTerm` from our store and wire it up. Since we wrote out all of our action creators at the beginning, we already have `changeSearchTerm` ready to rock.

Inside `ArtSearch`, let’s make the JSX to wire up.

```jsx
export default function ArtSearch() {
  return (
    <div>
      <div className="flex flex-row justify-between px-3">
        <h3 className="text-xl">My Art Collection</h3>
        <div>
          <label>Search:</label>{' '}
          <input
            className="border border-2 rounded border-slate-500"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>
    </div>
  )
}
```

At this point our `value` and our `onChange` elements are going to throw some errors. Let’s pick off `handleSearchTermChange` first. Remember we will need ti import our `useDisptach` hook and the appropriate action creator at the very top of our file.
We will continue to get errors until we wire up our input to our `searchTerm` state so let’s also import `useSelector` and pass in the appropriate selector function so we can bind out input to our store state.

```jsx
import {useDispatch, useSelector} from 'react-redux'
import {changeSearchTerm} from '../store'

export default function ArtSearch() {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => {
    return state.art.searchTerm
  })
  const handleSearchTermChange = (event) => {
    dispatch(changeSearchTerm(event.target.value))
  }

  return (
    <div>
      <div className="flex flex-row justify-between px-3">
        <h3 className="text-xl">My Art Collection</h3>
        <div>
          <label>Search:</label>{' '}
          <input
            className="border border-2 rounded border-slate-500"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>
    </div>
  )
}
```

Once again, a bunch of wiring that doesn’t look like it changed a thing yet! But now we are ready to look into some cool new stuff with `derived state`.

## Filtering our Art Collection

Next up is filtering our ArtList and rendering only art items whose `name` contains `searchTerm`. We aren’t creating a new piece of state, just a new value.

`state.art.data`+ `state.art.searchTerm` = `filteredList`

We are going to put all of this logic inside our `useSelector` function inside ArtList.

We will use a bit of destructing to make all of this easier to read and reason with:

```jsx
const artList = useSelector(({art: {data, searchTerm}}) => {
  //
})
```

Now using our filter function, we are only going to return art that matches the search term.

```jsx
return data.filter((art) =>
  art.name.toLowerCase().includes(searchTerm.toLowerCase())
)
```

That’s it! Let’s test it out by adding a few pieces of art and checking against a few search terms. If we keep the search box empty, all of our art will be visible!

## Derived State: Total Value

So now, instead of just showing only art that matches our searchTerm, we need to calculate the total value of everything visible in the list. The logic is going to be similar to what we just did with our filter function above.

Inside our ArtValue component:

```jsx
export default function ArtValue() {
  return (
    <div className="flex flex-row flex-end">
      <h3 className="text-lg">Total Price: ${totalPrice}</h3>
    </div>
  )
}
```

Just a bunch of jsx but we have a new value here called `{totalPrice}` we need to compute. We will need the list of art, aka `data`, the `searchTerm` and then instead of returning all of the art items that match, we need to total up the price of the art items.

```jsx
import {useSelector} from 'react-redux'
…

  const totalPrice = useSelector(({art: {data, searchTerm}}) => {
    // Looks identical to our filter before, maybe a change for code reuse?
    const filteredArt = data.filter((art) => {
      return art.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    let price = 0
    for (let art of filteredArt) {
      price += art.price
    }
    return price
  })
```

That works just fine, but we can clean this up a little differently using a reduce function:

````jsx
    return filteredArt.reduce((acc, art) => {
      return acc + art.price
    }, 0)```

Actually, we can make this even cleaner by chaining it all together and removing a few curly braces:

```jsx
  const totalPrice = useSelector(({art: {data, searchTerm}}) => {
        return data
          .filter((art) =>
            art.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .reduce((acc, art) => acc + art.price, 0)
  }
````

## Highlight Partial Matches

Now what our app is at MVP completion, we can add in our “nice to have” feature:

When adding a new a piece of art, if the name partially matches an existing piece of art, bold the existing art item in the art list.

- Instead of checking against our `searchTerm` input, we are checking against our `name` input.
- Instead of hiding/showing an item in the list on match, we will apply a conditional style.

We already have a nice selector function working within our ArtList. This new feature is simply a style change and we should avoid adding data features for this purpose.

Instead, we are going to decided which ones are bold/highlihgted when it’s rendered.

First we need to update our `useSelector` function to return not just our `state.art.data` but also our `state.form.name`

```jsx
const {artList, name} = useSelector(({form, art: {data, searchTerm}}) => {
  const filteredArt = data.filter((art) =>
    art.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return {
    artList: filteredArt,
    name: form.name,
  }
})
```

Now, inside our `renderedArt` mapping function, we can check for matches, and apply a style to the text conditionally.

```jsx
const bold = name && art.name.toLowerCase().includes(name.toLowerCase())

…

<p className={`${bold && 'font-bold'}`}>
          {art.name} - ${art.price}
        </p>
```
