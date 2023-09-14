import React from 'react'
import {RECIPE} from './recipe-data'
import RecipeInfo from './RecipeInfo'
import RecipeImg from './RecipeImg'
import IngredientsList from './IngredientsList'
import InstructionsList from './InstructionsList'
import Card from './Card'
import './styles.css'

// HW: Apply CSS styling, dont forget to import the style sheet in the other component files!
// Figma designs here: https://www.figma.com/file/oPToKD0BEwCUQFt3OjCDw6/RecipeCardStarter?node-id=2%3A134&mode=dev
// Or if youre feeling fancy, design your own!
export default function RecipeCard() {
  return (
    <Card>
      <RecipeImg imgSrc={RECIPE.imgSrc} />
      <RecipeInfo title={RECIPE.title} description={RECIPE.description} />
      <IngredientsList ingredients={RECIPE.ingredients} />
      <InstructionsList instructions={RECIPE.instructions} />
    </Card>
  )
}
