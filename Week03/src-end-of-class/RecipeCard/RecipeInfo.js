import styles from './RecipeCard.module.css'
export default function RecipeInfo(props) {
  const {title, description} = props
  return (
    <div className={styles.recipe_info}>
      <h1 className={styles.recipe_title}>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
