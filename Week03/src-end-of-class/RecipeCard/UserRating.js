import {useState} from 'react'
import {ReactComponent as Heart} from '@material-design-icons/svg/filled/favorite.svg'
import styles from './RecipeCard.module.css'

export default function UserRating() {
  // array destructuring, this is a nice way to access a piece of state and its setting
  // count is out piece of state
  // setCounter is our setter for count
  // useState(0) defines the initial count at 0, aka our default state for when the component loads
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
    return
  }

  return (
    <div className={styles.ratings_wrapper}>
      <button onClick={handleMinusClick}>[-]</button>
      {/* Mapping over an array witgh count num
      of slots and render a span with an HTML heart for each */}
      {[...Array(count)].map((heart, i) => {
        return (
          <span className={styles.heart} key={i}>
            <Heart />
          </span>
        )
      })}
      <button onClick={handlePlusClick}>[+]</button>
    </div>
  )
}
