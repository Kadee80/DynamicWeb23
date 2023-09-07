// Import React and ReactDOM for use
// ReactDOM is for loading elements in a web browser
// our other option here for mobile would be ReactNative
import React from 'react'
import ReactDOM from 'react-dom/client'

// grab and store the root div element
// and tell React to take control of it
const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)

// Create an app component and render/display it on the screen
function App() {
  // we can do any javascript and render or use these variables in our JSX
  const message = 'Hello World'
  // vars that return strings or numbers will render inside our JSX using {}
  const name = 'Katie'
  const numChickens = 7
  // we can use boolean logic to conditionally render something,
  // but we cannot directly render a boolean value
  const isHeads = true
  // arrays will not print as expected without a map function
  const myArr = ['cat', 'chicken', 'rooster']
  // trying to print and entire object will throw an error
  const myObj = {name: 'katie', age: 38}
  return (
    // Adjacent jsk elements m,ust be wrapped in an enclosing tag,
    // this could be any html element or an empty <> </> tag
    <>
      <h1>{message}</h1>
      <p>My name is: {name}.</p>
      <p>I own {numChickens} chickens. </p>
      {/* boolean value will not print on screen */}
      <h3>Coin flip: {isHeads}</h3>
      {/* but we can conditionally print something based on its value */}
      <p>{isHeads ? 'heads' : 'tails'}</p>
      <h3> Arrays print wonky: {myArr} </h3>
      <h3>Trying to print an object will throw an error!</h3>
      {/* uncomment below to see object print error */}
      {/* <p>{myObj}</p> */}
      {/* We can also print expressions directly inside our component  */}
      <h3>The time is {new Date().toLocaleTimeString()}</h3>
    </>
  )
}

root.render(<App />)
