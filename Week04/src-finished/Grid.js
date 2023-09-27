import {useState, useEffect} from 'react'
import cx from 'classnames'
import styles from './UI.module.css'
import CardPattern from './assets/moroccan-flower-dark.png'
import Bilbo from './assets/bilbo-baggins.png'
import Cameron from './assets/cameron-poe.png'
import Nikki from './assets/nikki-cage.png'
import Pollux from './assets/pollux-troy.png'
// Add a matched property to set to true once they have been matched!
const cardImages = [
  {src: Bilbo, matched: false},
  {src: Cameron, matched: false},
  {src: Nikki, matched: false},
  {src: Pollux, matched: false},
]

export default function Grid(props) {
  // create some state and setter to store our shuffled cards
  const [cards, setCards] = useState([])
  // keep track of our turns
  const [turns, setTurns] = useState(0)

  // Keep track of our choices
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // Create our shuffle function to double our array, shuffle it, and then store it in State
  const shuffleCards = () => {
    // spread all of our card images 2x so we have duplicated to match!
    const shuffledCards = [...cardImages, ...cardImages]
      // add the sort function whgich fires a function for each item in our new array
      // when number is negative, leave the item where it is
      // when positive, swap it with another item to shuffle
      .sort(() => Math.random() - 0.5)
      // now we map to add another function to add an ID to each item in our new array
      // first we spread the current properties, then we add an ID
      .map((card) => ({...card, id: Math.random()}))

    // 3)
    // use our setter to add our shuffled cards array to cards state
    setCards(shuffledCards)
    // reset our turn count for a new game
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    // check if we have a choice one
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    // but what happened when we have a choiceOne and choiceTwo?
    // we need to compare them and reset them NOT HERE!
    // If we do that here it will fire possibly before the state has even updated
    // We need to use useEffect
  }

  // compare our two cards
  // with use effect we pass in a function, and a depdendecy array as the second argument
  // useEffect(() => {}, [])
  // useEffect fires when the component first mounts, and whenever a dependency changes
  // we need to keep and eye on choiceOne and choiceTwo
  useEffect(() => {
    // this is where we compare!
    // first lets make sure we have both choices
    if (choiceOne && choiceTwo) {
      // if they both exist we can compare src values to see if they match!
      if (choiceOne.src === choiceTwo.src) {
        // we have an array of all of our shuffled cards inside cards
        // we will map the matched cards to a new array
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              console.log('those cards match')
              // spread out card properties and set matched to true
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        // now lets reset our turn with the function below
        resetTurn()
      } else {
        console.log('those cards do not match')
        // NEW EEK when they dont match the flipped class gets removed almost instantly
        // lets add a 1 second timeout using setTimeout
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(choiceOne, choiceTwo)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }

  return (
    <>
      <button onClick={shuffleCards}>New Game</button>
      <div>Turns: {turns}</div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {cards.map((card) => (
            // update to take entire card not just img!
            // add flipped prop
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
      </div>
    </>
  )
}

function Card(props) {
  const {card, handleChoice, flipped} = props

  const handleClick = (event) => {
    handleChoice(card)
  }

  return (
    <div className={styles.flip_card}>
      <div
        className={cx(styles.flip_card_inner, {[styles.flipped]: flipped})}
        onClick={handleClick}
      >
        <div className={styles.flip_card_front}>
          <img src={CardPattern} alt="card back" />
        </div>
        <div className={styles.flip_card_back}>
          <img src={card.src} alt="card front" />
        </div>
      </div>
    </div>
  )
}
