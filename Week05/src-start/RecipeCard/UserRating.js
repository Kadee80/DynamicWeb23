import {useState} from 'react'
import {ReactComponent as Heart} from '@material-design-icons/svg/filled/favorite.svg'

import styles from './RecipeCard.module.css'
export default function UserRating() {
  // array destructuring, this is a nice way to access a piece of state and its setter
  // count is our piece of state
  // setCount is our setter for count
  // useState(0) defines the initial count at 0, aka our default state when the component loads
  const [count, setCount] = useState(0)
  const handlePlusClick = () => {
    if (count < 5) {
      setCount(count + 1)
    }
    return
  }
  const handleMinusClick = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }
  return (
    <div className={styles.ratings_wrapper}>
      <button onClick={handleMinusClick}>[-]</button>
      <div>
        {/* Mapping over an array with count num slots and 
        render a span with a heart for each */}
        {[...Array(count)].map((star, i) => {
          return (
            <span className={styles.heart} key={i}>
              <Heart />
            </span>
          )
        })}
      </div>
      <button onClick={handlePlusClick}>[+]</button>
    </div>
  )
}
