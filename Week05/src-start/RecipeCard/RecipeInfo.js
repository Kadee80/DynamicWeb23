import React from 'react'
import styles from './RecipeCard.module.css'

export default function RecipeInfo(props) {
  const {title, description} = props
  return (
    <div className={styles.recipe_info}>
      <h2 className={styles.recipe_title}>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
