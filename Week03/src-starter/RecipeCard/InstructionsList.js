import React from 'react'

export default function InstructionsList(props) {
  const {instructions} = props
  return (
    <div>
      <h3>Instructions</h3>
      <ol>
        {instructions.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ol>
    </div>
  )
}
