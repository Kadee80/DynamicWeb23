import styles from './UI.module.css'
import CardPattern from './assets/moroccan-flower-dark.png'
import Bilbo from './assets/bilbo-baggins.png'
import Cameron from './assets/cameron-poe.png'
import Nikki from './assets/nikki-cage.png'
import Pollux from './assets/pollux-troy.png'

// const cardImages = [{src: Bilbo}, {src: Cameron}, {src: Nikki}, {src: Pollux}]

export default function Grid(props) {
  return (
    <>
      <button>New Game</button>
      <div className={styles.container}>
        <div className={styles.grid}>
          <Card img={Bilbo} />
          <Card img={Cameron} />
          <Card img={Nikki} />
          <Card img={Pollux} />
        </div>
      </div>
    </>
  )
}

function Card(props) {
  return (
    <div className={styles.flip_card}>
      <div className={styles.flip_card_inner}>
        <div className={styles.flip_card_front}>
          <img src={CardPattern} alt="card back" />
        </div>
        <div className={styles.flip_card_back}>
          <img src={props.img} alt="card front" />
        </div>
      </div>
    </div>
  )
}
