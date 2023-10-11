import {useState} from 'react'
import searchImages from './api'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'

export default function App() {
  const [images, setImages] = useState([])

  const handleSubmit = async (term) => {
    // console.log('do a search with: ', term)
    const result = await searchImages(term)
    setImages(result)
  }
  return (
    <>
      {images.length}
      <SearchBar onSubmit={handleSubmit} />
      <ImageList images={images} />
    </>
  )
}
