import React from 'react'
import RecipeCard from './RecipeCard'
import {RECIPE_LIST} from './RecipeCard/recipe-data'

function App() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {RECIPE_LIST.map((recipe, index) => (
        <RecipeCard recipe={recipe} />
      ))}
    </div>
  )
}

export default App
