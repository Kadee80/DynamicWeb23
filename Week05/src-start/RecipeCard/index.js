import * as React from 'react'
import Card from './Card'
import RecipeInfo from './RecipeInfo'
import RecipeImg from './RecipeImg'
import IngredientsList from './IngredientsList'
import InstructionsList from './InstructionsList'
import UserRating from './UserRating'
import styles from './RecipeCard.module.css'

export default function RecipeCard(props) {
  const {recipe} = props
  return (
    <Card>
      <RecipeImg imgSrc={recipe.imgSrc} />
      <div class={styles.recipe_wrapper}>
        <RecipeInfo title={recipe.title} description={recipe.description} />
        <div class={styles.recipe_details}>
          <IngredientsList ingredients={recipe.ingredients} />
          <InstructionsList instructions={recipe.instructions} />
        </div>

        <UserRating />
      </div>
    </Card>
  )
}
