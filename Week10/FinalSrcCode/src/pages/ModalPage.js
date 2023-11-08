import {useState} from 'react'

import Button from '../components/Button'
import Modal from '../components/Modal'

export default function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const actionBar = (
    <div>
      <Button
        danger
        onClick={() => {
          console.log('clicked the danger button')
        }}
      >
        Delete
      </Button>
      <Button primary onClick={handleClose}>
        Accept and Close
      </Button>
    </div>
  )

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor ex
        id libero scelerisque, nec consectetur nulla congue. Cras facilisis
        vitae dui id scelerisque. Phasellus vel mattis quam. Aliquam
        pellentesque neque ex. Integer tellus ipsum, finibus id enim vitae,
        mattis vulputate massa. Donec sed orci at velit posuere ultrices
        tristique vel urna. Duis non fermentum arcu. Vestibulum malesuada diam
        eget egestas fringilla. Quisque mollis accumsan massa, vitae consequat
        tortor imperdiet sed. Curabitur tellus ipsum, condimentum id felis non,
        rhoncus dignissim neque. Mauris feugiat augue risus, vehicula eleifend
        sapien interdum eu. Nam ac volutpat felis. Proin laoreet nisl felis, vel
        vehicula augue pellentesque accumsan. Quisque ultrices molestie tempor.
        Donec ac aliquam ligula, nec fermentum leo. Fusce gravida leo ligula, ac
        rhoncus enim sagittis eget.
      </p>

      <Button outline success onClick={handleClick}>
        Open Modal
      </Button>
      {isModalOpen && (
        <Modal onClose={handleClose} actionBar={actionBar}>
          <p>Hey man, I'm a modal and i now render through a react portal!</p>
        </Modal>
      )}
    </div>
  )
}
