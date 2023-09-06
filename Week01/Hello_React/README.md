# Hello React!

Today we will be creating a new blank React project with Webpack and Babel. Before we dive in, lets run through some helpful terminology.

## Node Setup

Before we begin, lets first check to make sure we have node installed.

In terminal enter:

```bash
node -v
```

If a version is returned, you're all set!

If not, go to https://nodejs.org/en/download and download the appropriate installer and install node on your machine.

# Create React Project

We will be using Create React to create a new empty project.

```bash
npx create-react-app hello-react
```

This will take a few seconds to spin up our new project. Once this is done, lets change directories into our new project folder:

```bash
cd /hello-react
```

To run our project dev server at any time run

```bash
npm start
```

Our brand new project will launch in the browser at `localhost:3000`.

To cancel/stop the dev server enter `control + c`

Lets take a look at the files in the project we just created. Most of these are for templating purposes so we can delete them and create our own starter app.js.

Files we will keep:

`index.html`: Our nearly empty HTML skeleton page where we load index.js and grab the `#root` div to load our React project

`index.js`: The js file that loads and executes when our app starts up

`package.json` and `package-lock.json`: A list of dependecies our app needs in order to run. These files will update as we install more dependencies via `npm`.

`node-modules`: A directory containing all of the dependencies we installed.

---

Lets delete everything else and create our own `index.js`

Inside index.js we will enter a few notes and a few lines of code to get our app up and running again!

First, we need to import React and ReactDOM libraries before we use them:

```js
import React from 'react'
import ReactDOM from 'react-dom/client
```

_note: ReactDOM is for loading elements in a web browser, our other option here for mobile would be ReactNative_

Now, we grab and store the root div element and tell React to take control of it:

```js
const el = document.getElementById('root')

const root = ReactDOM.createRoot(el)
```

Finally we create an app component and render/display it on the screen:

```js
function App() {
  return <h1>Hello World!</h1>
}

root.render(<App />)
```
