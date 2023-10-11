export default function ImageItem(props) {
  const {image} = props
  return (
    <div>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  )
}
