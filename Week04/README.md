# Memory Game: useState, useEffect and classnames

Today we are going to create a memory game where a user shuffles and deals cards, and then flips them to reveal an image. If the images match, the cards stay flipped. We will also keep track of how many turns the user took to match all of the cards on the board.

We have a starter source folder in the Week04 directory with some initial cleanup, image imports, and some starter components with CSS applied. Let's get started by reacting a new project, deleting the `src/` folder and copying the `src/` folder from `Week04/`. Once you have completed that `cd` into your new project directory and start your dev server

```bash
npm start
```

You will see our boilerplate `index.js`, a simple `App.js` that imports our `<Grid />` component and a stylesheet that handles our card flipping along with a grid layout for our cards we will generate. For now, the cards rendered inside grid are static, and the cards flip on `:hover`.

This Card Flip CSS was borrowed and modified from the W3Schools tutorial on making a Card Flip, and can be [reviewed here](https://www.w3schools.com/howto/howto_css_flip_card.asp). We are also using [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) to create our grid container CSS.

Note that on the bottom of `Grid.js` we have a `Card` component. For todays class we will keep this as a combined file, but when we complete our exercise we shoud probably break this out into its own file!

### In Class Exercise 1: Shuffle and deal the cards

After our imports, which includes some image sources, you will see an array named `cardImages` which is commented out. For now we are statically rendering all of our cards. Lets go ahead and comment out that line and write a function to double our array of images (so we have duplicates to match), shuffle the items in our array, and assign them to state.

Our starter image array:

```jsx
const cardImages = [{src: Bilbo}, {src: Cameron}, {src: Nikki}, {src: Pollux}]
```

Now, on the first line of our `Grid` component (appx line 11) lets set up our local State for our Cards array, and a setter up update it.

```jsx
const [cards, setCards] = useState([])
```

Now let's declare a function we will call when we click our button to shuffle and display the cards, back side up so the images are hidden.

```jsx
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

  // use our setter to add our shuffled cards array to cards state
  setCards(shuffledCards)
}

console.log(cards)

...
<button onClick={shuffleCards}>New Game</button>
```

Great! Now when a user clicks our `New Game` button we will double our image array, shuffle it using `Array.sort()` and then add a new unique `id` field to each card object using `Math.random`. `setCards()` will assign our new updated doubled, and shuffled array of cards to `cards` State.

We should also keep track of how many turns a user takes trying to match the cards. The goal is to match them all with the lowest amount of turns possible.

```jsx
const [turns, setTurns] = useState(0)
```

Now that we are keeping track of our turns, lets set them to 0 at the end of our `shuffleCards` function, so that each time a new game is started with our button click, the turns reset to 0.

```jsx
const shuffleCards = () => {
  ...
  // use our setter to add our shuffled cards array to cards state
  setCards(shuffledCards)
  // reset our turn count for a new game
  setTurns(0)
}

```

Before we go ahead and map through our array of shuffled cards to render our `<Card />` components, lets take a pause to look at an external library called `classnames`. Lets go ahead and install it into our project. Documentation for the classnames library can be [found here](https://www.npmjs.com/package/classnames).

control +c to stop our server, then install classnames:

```bash
npm install classnames
```

to import in a file:

```jsx
import cx from 'classnames'
```

before we make use of classnames (note we imported it as `cx` so we dont confuse it with `className` in our JSX). Lets add a bit of state inside our `Card` component to keep track of which items we have clicked. Now our secondary class of `.active` is only applied if `isActive` has been set to true with a click.

```jsx
const [isActive, setIsActive] = useState(false)

  const handleClick = (event) => {
    // 👇️ toggle isActive state on click
    setIsActive((current) => !current)
  }

  ...

  <div
        className={cx(styles.flip_card_inner, {[styles.active]: isActive})}
        onClick={handleClick}
      >

  ...
```

We will also need to update our CSS to flip the card when the `.active` class is applied instead of on `:hover`

```css
.active.flip_card_inner {
  transform: rotateY(180deg);
}
```

OK that was cool, but our .active class will be updated, and how it is applied now is temporary, but this is a good point to pause and make sure our cards are rendering, and our `.active` class is applied when we click a card.

Since we have this nifty array of cards, lets take a moment to map through them and render them based on our newly shuffled array of cards.

inside our `Grid` component:

```jsx
return (
  <>
    <button onClick={shuffleCards}>New Game</button>
    <div className={styles.container}>
      <div className={styles.grid}>
        {cards.map((card) => (
          <Card key={card.id} img={card.src} />
        ))}
      </div>
    </div>
    <div>Turns: {turns}</div>
  </>
)
```

### In Class Exercise 2: Keeping track of our choices, Comparing flipped cards, and updating turns.

Now that we have have dealt our shuffled deck of cards, let's add some more state to keep track of our choices inside our game. Lets add a few more items to our State inside our Grid component

```jsx
// Keep track of our choices
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
```

Now lets add a function to set our choiceOne and choiceTwo:

```
const handleChoice = (card) => {
    console.log(card)
    // check if we have a choice one
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
```

But what happens when we have a `choiceOne` and `choiceTwo`? We need to compare them and then reset our choices but NOT HERE! If we do that here it will fire possibly before the state has even updated.We need to use `useEffect`!
More on that in just a minute.

Notice our `handleChoice` function takes a card argument. Lets update our card component to take in an entire card object as a prop so we can use our `handleChoice` function when we click an indivudal card. We pass our `handleChoice` function in as a prop to our Card components when they render.

Grid Component:

```jsx
{
  cards.map((card) => (
    // NEW update to take entire card not just img!
    // NEW add flipped prop for styling purposes, hmmm what is this card.matched?
    flipped={card === choiceOne || card === choiceTwo || card.matched}
  ))
}
```

Card Component:

```jsx
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
```

You'll notice above theres a `flipped` prop added to our card component. It makes sense to flip them if they are one of our two choices, so what is this `matched` property inside our card object? Let's add this property to our starter image array, and create a function to check if the two flipped cards match.

First, Add matched property to our cardImages starter array, default them all to false, but we can update this to true if a user matches `choiceOne` and `choiceTwo`

```
// Add a matched property to set to true once they have been matched!
const cardImages = [
  {src: Bilbo, matched: false},
  {src: Cameron, matched: false},
  {src: Nikki, matched: false},
  {src: Pollux, matched: false},
]
```

Now we need to compare our choices. When using ` useEffect`` we pass in a function, and a depdendecy array as the second argument  `useEffect(() => {}, [])`

`useEffect` fires when the component first mounts, and whenever a dependency changes, In this case we need to keep and eye on `choiceOne` and `choiceTwo`

```jsx
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
```
