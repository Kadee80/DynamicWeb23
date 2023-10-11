import ImageItem from './ImageItem'
export default function ImageList({images}) {
  return (
    <div>
      {images.map((img, index) => {
        return <ImageItem image={img} key={img.id} />
      })}
    </div>
  )
}
