// Import our React libraries
import React from 'react'
import ReactDOM from 'react-dom/client'

// Import our main App component
import App from './App'

// Grab our root element from index.html (in public)
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render our React project within the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
