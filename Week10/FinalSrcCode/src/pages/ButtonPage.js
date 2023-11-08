import * as React from 'react'

import Button from '../components/Button'
import {MdFlutterDash} from 'react-icons/md'

export default function ButtonPage() {
  const handleClick = () => {
    console.log('click')
  }
  return (
    <div className="flex">
      <Button primary rounded outline onClick={handleClick} className="mb-5">
        <MdFlutterDash />
        Buy Now
      </Button>
      <Button success rounded>
        Sign Out
      </Button>
      <Button danger outline>
        Delete
      </Button>
    </div>
  )
}
