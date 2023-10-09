## API Requests

Today we will be populating a list of images using the free version [Unsplash image api](https://unsplash.com/developers). React is only responsible for rendering and updating content on our screen when something changes based on user input. This is a great, because we can make an API request just like we would in a regular website using JavaScript. Luckily for us, the [Axios](https://www.npmjs.com/package/axios) client exists as a node package and can easily be installed in our project using Node Package Manager.

Let's start with a brand new `create-react-app` project

```bash
npx create-react-app image-search
```

As usual, clear out all of the files in the `src/` folder and create our boilerplate `index.js` and `App.js` files

index.js:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

App.js

```jsx
export default function App() {
  return <div>App</div>
}
```

### Unsplash Image API

First, let's take a look at the Unsplash API. In your browser navigate to: `https://unsplash.com/developers` and sign up for a free account. You will recieve an email to activate your account.

Now that we have a developer account with Unsplash, lets create a new project. Once create an account you will be redirected to your apps page. You can also access it at [anytime here](https://unsplash.com/oauth/applications). Go ahead and and create a new application. Name it `React Image Search` and give it a useful description like `A simple React project that searches for and displays images by search term`. Make sure you do not just type nonsense here! From time to time these apps are monitored and cleared out if they do not look legitimate. Once you have created a new app inside your developer dashboard, scroll down and you can view your API Keys. We will be using this in a few steps, but for now keep this window open for easy access.

Notes on you API Keys:
1- Never share your API key! This also means do not publish your API key in a project on GitHub! For example: I will by using `YOUR_API_KEY_HERE_DO_NOT_PUBLISH` as a placeholder in class notes. I suggest you do the same.
2- This is a free API we are using, so we are limited to 50 hits per hour. Keep that in mind while we build our project. You may accidentally hit your limit and be restricted for the rest of the hour! An easy way to make sure we do not hit our limit is never calling an API request on a component re-render and making use of the networks tab in Google Developer Tools.

Next, lets take a look at [the docs](https://unsplash.com/documentation) in a new tab. There are 3 sections we should take note of:

- [location](https://unsplash.com/documentation#location)
- [public authentication](https://unsplash.com/documentation#public-authentication)
- [search photos](https://unsplash.com/documentation#search-photos)

### Axios

In order to make use of Axios we must first install it in our project.

```bash
npm install axios
```

This will install Axios in your project and update your package.json.

Now create a new file in the root of your `src/` folder called `api.js`. To use Axios, we must first import it at the start of our file:

```js
import axios from 'axios'
```

Using Axios is pretty straightforward after that:

```js
axios.get('<API URL LOCATION>', {
    headers: {
      MAYBE SOME AUTHENTICATION HERE
    },
    params: {
      SOME SEARCH PARAMETERS HERE
    },
  })
```

Now we will take a moment to write a function that hits the Unsplash API, adds authentication with our API Key we generated, and adds a search parameter which we will hardcode for now.

```js
const searchImages = () => {
  const response = axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: 'Client-ID YOUR_API_KEY_HERE_DO_NOT_PUBLISH',
    },
    params: {query: 'butterflies'},
  })
  console.log(response.data.results)
  return response.data.results
}

export default searchImages
```

Hmmm... But Javascript wants to execute each line of code as quickly as possible. Our `console.log` and `return` lines will execute before we get our results back from the API. We need to label this function as asychronous, and tell JS to wait for a result to be returned before moving on. We do this with the keywords `async` and `await`. Now, JS will wait for response to be populated before executing any following code within the function.

```js
const searchImages = async () => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: 'Client-ID YOUR_API_KEY_HERE_DO_NOT_PUBLISH',
    },
    params: {query: 'butterflies'},
  })
  console.log(response)
  // all we care about is the data.results array within our response, so let's only return that!
  return response.data.results
}
```

Now we can use our `searchImages` function in our `App.js` file to view our results before moving on.

```jsx
import searchImages from './api'

...

const images = searchImages()
console.log(images)
```

We can view the results in our console, but we can also get rid of these `console.log`s and view the response in the `Networks` tab of our developer tools.

Before moving on, let's remove our usage of `searchImages()` inside `App.js` so we dont hit our hourly limit and switch gears and build out our React components.

## Binding Form Elements in React

The app we are going to build is going to need a few components:

- SearchBar (Child of App)
- ImageList (Child of App)
- ImageItem (Children of ImageList)

Go ahead and create a `components/` folder inside `src/` and add these three component files.

Our SearchBar is going t be responsible for recieving user input and passing the search term to its parent App component. The ImageList will recieve the images returned from our search and render individual ImageItems for each result.

### Handling a form input in React

When using input elements in React we must follow the following pattern:

- create a new piece of state
- create an event handler to watch for onChange
- when onChange fires get the input value
- update your piece of state with the new input value
- pass the piece of state into the input as the value prop

Why must we follow this pattern? What is it doing?

1- A user types in our input
2- The browser updates the text input (normal browser behavior)
3- The browsers also triggers a `onChange` event (normal browser behavior)
4- Now we must read the value from the input and update our state
5- State updates via its setter function
6- Since State is updated the component will re-render with the new value (updated term in state) so we can see the new term the user typed
7- Now our input is bound to our piece of state using React’s state system! This is seems tedious but will allow greater functionality like validation and error handling in the future. Libraries like `Formik` do all of this behind the scenes for us.

```jsx
import {useState} from 'react'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'
import searchImages from './api'

export default function App() {
  const handleSubmit = async (term) => {
    console.log('do a search with: ', term)
  }
  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
    </div>
  )
}
```

```jsx
import {useState} from 'react'

export default function SearchBar(props) {
  const {onSubmit} = props
  const [term, setTerm] = useState('')
  const handleFormSubmit = (event) => {
    // disable form input collection (built in to html)
    event.preventDefault()
    onSubmit(term)
  }

  const handleChange = (event) => {
    setTerm(event.target.value)
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input onChange={handleChange} value={term} />
      </form>
    </div>
  )
}
```

Now that our `SearchBar` is passing a term back up to its parent component `App`, we can store these images in state so that App and its children components will rerender whenever our `images` results update in State. This will also make `images` available to be passed down as a prop into our `ImageList` component

```jsx
import {useState} from 'react'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'
import searchImages from './api'

export default function App() {
  // since we want to update the content on the screen,
  // we are going to want to update state to trigger a rerender!
  const [images, setImages] = useState([])

  const handleSubmit = async (term) => {
    // console.log('do a search with: ', term)
    const result = await searchImages(term)
    // console.log(result)
    setImages(result)
  }
  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images} />
    </div>
  )
}
```

### In Class Exercise: Rendering our ImageItems via ImageList

Now that we have passed our image search results as a prop called `images` to our image list, take a moment to render out individual `ImageItems` using `images.map()`
