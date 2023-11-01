import {useContext} from 'react'
// import cx from 'classNames'
import NavigationContext from '../context/navigation'

export default function Link({to, children}) {
  const {navigate} = useContext(NavigationContext)

  const handleClick = (event) => {
    event.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
