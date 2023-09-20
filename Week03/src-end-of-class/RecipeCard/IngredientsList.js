import React from 'react'
import styles from './RecipeCard.module.css'
export default function IngredientsList(props) {
  const {ingredients} = props

  return (
    <div className={styles.ingredients_list}>
      <h3 className={styles.list_title}>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index} className={styles.list_item}>
            <span className={styles.measure}>{ingredient.measure}</span>
            <span>{ingredient.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
