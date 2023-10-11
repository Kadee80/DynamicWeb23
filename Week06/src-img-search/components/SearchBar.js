import {useState} from 'react'

export default function SearchBar(props) {
  const {onSubmit} = props
  // array destructuring
  const [term, setTerm] = useState('')

  const handleChange = (event) => {
    setTerm(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    onSubmit(term)
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input onChange={handleChange} value={term} />
      </form>
    </div>
  )
}
