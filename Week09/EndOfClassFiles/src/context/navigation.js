import {createContext, useState, useEffect} from 'react'

const NavigationContext = createContext()

function NavigationProvider({children}) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handler = () => {
      // place the current path in State
      setCurrentPath(window.location.pathname)
    }
    // watch for user interactions with our routes, call our handler and set the currentPath in state to whatever was returned from popstate
    window.addEventListener('popstate', handler)
    // use effect can return a cleanup function (or any function) and this will fire first next time useEffect is fired
    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [])

  const navigate = (to) => {
    window.history.pushState({}, '', to)
    setCurrentPath(to)
  }

  return (
    <NavigationContext.Provider value={{currentPath, navigate}}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationContext
export {NavigationProvider}
