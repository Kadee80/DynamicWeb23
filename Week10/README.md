## Context Router

Last week we made a few components and pages to display them. We then started to create our own router using Context. Let’s finish up our `Route` component and implement it before moving on to our Style Guide.

Note: The code for where we left off at the end of last weeks class can be found in `Week09/` .

[Last Weeks End Of Class Code](https://github.com/Kadee80/DynamicWeb23/tree/master/Week09/EndOfClassFiles)

### Route Component

Cool. our routs are updating in our browser, but we aren’t changing the content on the screen. We will do this with a commonly used pattern using a Route component. Our Route component props will be `path` and `children` (the content/page to show).

```jsx
import {useContext} from 'react'
import NavigationContext from '../context/navigation'
export default function Route({path, children}) {
  const {currentPath} = useContext(NavigationContext)

  if (path === currentPath) {
    return {children}
  } else {
    return null
  }
}
```

Now in our app we must first import our Route component and the Pages from our `pages/` directory. We then add in 2 Route components, and wrap them around our page components.

```jsx
import Link from './components/Link'
import Route from './components/Route'
import AccordionPage from './pages/AccordionPage'
import ButtonPage from './pages/ButtonPage'

export default function App() {
  return (
    <div>
      <Link to="/accordion">Go to accordion</Link>
      <Link to="/button">Go to buttons</Link>
      <div>
        <Route path="/accordion">
          <AccordionPage />
        </Route>
        <Route path="/button">
          <ButtonPage />
        </Route>
      </div>
    </div>
  )
}
```

Now let’s add some styling, and make a `Menu` component together.

```jsx
import {useContext} from 'react'
import NavigationContext from '../context/navigation'

export default function Route({path, children}) {
  const {currentPath} = useContext(NavigationContext)

  if (path === currentPath) {
    return children
  }

  return null
}
```

### Fixemups: Custom Hook!

We have written the same lines of code a few times since we started adding programatic navigation and adding our `Link` and `Route` component to our project. We can create a custom hook to make our lives (and the lives of our fellow engineers on this project) easier.

```jsx
import {useContext} from 'react'
import NavigationContext from '../context/'

...

const {currentPath} = useContext(NavigationContext)
```

Create a folder called `hooks/` inside our `src/` folder and add a file named `use-navigation.js`.

```jsx
import {useContext} from 'react'
import NavigationContext from '../context/navigation'

function useNavigation() {
  return useContext(NavigationContext)
}

export default useNavigation
```

Now we can import and call `useNagivation()` instead of the repeated lines of code above.

Change those imports and usage in:

- Link
- Route

## Styleguidist

Installation:
https://react-styleguidist.js.org/docs/getting-started/

```bash
npm install --save-dev react-styleguidist
```

Since we are using create-react-app we can skip the configuration step!

Next, to start the server:

```bash
npx styleguidist server
```

Your style guide is now running at `http://localhost:6060/`

We should probably add this to our scripts in package.json:

```bash
"guide": "npx styleguidist server"
```

Cool. Look at all this fun stuff we got for free! Now instead of using our App.js and our pages/routes for component documentation, we can build another project that utilizes these components!

We now have a style guide for free, but the documentation is lacking. Let’s fix that.

### Props & Methods:

These sections all appear blank at the moment. By adding type checking with either `PropsTypes` `Flow` or `TypeScript` this documentation will also automatically generate. We took a look at PropTypes in our `Button` component in order to throw a warning message about using more than one button variation boolean. We have also briefly taken a look at type checking with `Flow`. Today we are going to revisit `Flow` for both type checking and documentation in our style guide.

First install Flow the `create-react-app` way:
https://create-react-app.dev/docs/adding-flow/

install

```bash
npm install --save flow-bin 
```

add to scripts

```bash
"flow": "flow”,
```

to use:

```bash
npm run flow
```

to configure:

```bash
npm run flow init
```

Add `// @flow` to the top of any file you would like to type check. Note: you may need to add the line `import * as React from ‘react` when adding `// @flow` to a file.

We now see a bunch of error highlighting under our props in `Button.js`. That’s because we have not defined our types via Flow! Let’s add them now.

```jsx
// @flow
import * as React from 'react'
import cx from 'classnames'
import {twMerge} from 'tailwind-merge'

export type ButtonProps = {
  /** Text and/or option Icon to display within the Button */
  children: React.Node,
  /** Optional Boolean to apply primary button background border and text color styles */
  primary?: boolean,
  /** Optional Boolean to apply secondary button background border and text color styles */
  secondary?: boolean,
  /** Optional Boolean to apply success button background border and text color styles */
  success?: boolean,
  /** Optional Boolean to apply warning button background border and text color styles */
  warning?: boolean,
  /** Optional Boolean to apply danger button background border and text color styles */
  danger?: boolean,
  /** Optional Boolean to apply outline button background border and text color styles */
  outline?: boolean,
  /** Optional Boolean to apply rounded button border radius styles */
  rounded?: boolean,
  /** Optional className for custom styles */
  className?: ?string,
  /** Optional Click event handler */
  onClick: any,
}

function Button(props: ButtonProps): React.MixedElement {
  const {
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    className,
  } = props
  const classes = twMerge(
    cx(className, 'flex items-center px-3 py-1.5 border', {
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      ///
      'rounded-full': rounded,
      'bg-white': outline,
      // add tailwind merge
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    })
  )

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
```

Now when we restart out Styleguidist server, and click the props and methods section we can see our props and an explanation of each from our docstrings!

Note: Button.js is a super special case because we are allowing for spreading in other props:

`{…otherProps}`

So if we added any special props when using our `Button` component, we will need to account for them with a Type annotation. Sadly, we loose our loose `otherProps` functionality. However, something like `onClick` is a pretty common event handler to use for a button, so why not add that to ButtonProps?

This will always be an ongoing conversation within the development team whenever these moments arise.

_NOTE: You can ignore or suppress errors using `// $FlowFixMe` or `// $FlowIgnore`._

---

### Example Usage (disabled by create-react-app safety measures)

Example usage is also possible using Styleguidist by creating a {ComponentName}.md.

Unfortunately, create react app implements a restriction that does not allow for seamless usage of markdown files in Stylguidist documentation. I am currently searching for a solution. This is a bit of a bummer, but let’s put a pin in this for now, and hopefully i can surprise you all with a solution before the end of the semester.

Possible Fix:
https://bobbyhadz.com/blog/react-you-attempted-to-import-which-falls-outside-project#using-craco-to-import-files-from-outside-the-src-directory

---

## Portals

Another common reusable component in a project’s style guide or component library is a modal. Modals are a great learning opportunity for us because a few interesting questions arise when building them.

- Where does the isOpen logic live?
- What is the event that opens the modal? Where does it live?
- How do we ensure the modal, and its overlay always cover the entire screen regardless of where the modal instance lives in our code?

First, lets cover our setup tasks: - make a`Modal.` empty/starter component - make a `ModalPage` - Add a route for `/modal` to show the ModalPage - Add a `Link` with the path to `/modal`

Back to the original questions. What event opens the modal? Where does the `isModalOpen` state live in our code?

We can use our new fancy `Button` component to open our `Modal` with an `onClick` handler. The piece of state for `isModalOpen` can live in our `ModalPage` since it is a parent of both the `Button` and the `Modal`. This also allows us to show our modal whenever we want, with whatever event we want, applied to any child component we want.

```jsx
import {useState} from 'react'
import Button from './components/Button'
import Modal from './components/Modal'

export default function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClick = () => {
    setIsModalOpen(true)
  }
  return (
    <div>
      <Button outline success onClick={handleClick}>
        Open Modal
      </Button>
      {isModalOpen && <Modal />}
    </div>
  )
}
```

Now, let’s shift to our modal. A modal has 2 main parts, an Overlay to cover all of the other existing content on the entire screen, and some sort of ModalWindow or ContentBox to display contents of the modal to the user that’s ideally centered in our screen.

```jsx
export default function Modal() {
  return (
    <>
      <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
      <div className="absolute inset-40 p-10 bg-white">
        Check out my modal content!
      </div>
    </>
  )
}
```

OK. It works! But that’s because we are implementing it in a simple page with nothing much going on. What if we were using it in a more complex page? Remember:

```css
position: absolute;
```

places the element at the top left corner of the closest parent with a position other than static (default).

Tailwind CSs’s rule `inset-0` applies the rules:

```css
top: 0;
left: 0;
bottom: 0;
right: 0;
```

which will full the parent element with a position other than static. If all parent elements are positioned static, our modal works just fine.

What if we had a positioned parent element on the page? Let’s add to the first div in our `ModalPage`

```
<div className=“relative”>
```

YUCK! But hey, that’s a real life Modal problem isn’t it?

Portals to the rescue! A Portal tells React to place an elements HTML elsewhere in a place of our choosing.

In `index.html` right before the closing `<body> ` tag add a div with an ID of modalContainer:

```html
…

    <div id="modalContainer"></div>
  </body>

```

Now we need to use a new method from `ReactDOM` called `createPortal(children, container)`

`createPortal` takes 2 arguments:

1. The element/component to render inside the Portal
2. The element to serve as the Portal.

```jsx
import ReactDOM from 'react-dom'

export default function Modal() {
  return ReactDOM.createPortal(
    <div>
      <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
      <div className="absolute inset-40 p-10 bg-white">
        Check out my modal content!
      </div>
    </div>,
    document.getElementById('modalContainer')
  )
}
```

Boom. Easy enough! If we find we need a reusable Portal component in the future of this project, we can create a reusable `Portal` component, that accepts a Modal, or any other component we want to inject as `props.children`.

Back to our Modal. We now need to add the close functionality. We need to define the handler in the parent/ModalPage component and pass it along to our Modal as a prop called `onClose`.

ModalPage:

```jsx
  const handleClose = () => {
    setIsModalOpen(false)
  }

…

{isModalOpen && <Modal onClose={handleClose} />}

```

Modal:

```jsx
<div
  onClick={onClose}
  className="absolute inset-0 bg-gray-300 opacity-50"
></div>
```

Now when a user clicks anywhere on the gray overlay, the modal will close. But we probably want to add a close button inside an actionBar in the Modal as well.

Note: We could make and style a close button within a header inside our modal too. We are using an `actionBar` from the parent right now so that we could add as many actions/buttons as we wish in the future, making this `Modal` component event that much more customizable! Maybe we have a step by step tutorial wizard, or a confirm/deny prompt? Now that is all possible.

```jsx
import {useState} from 'react'
import Button from './components/Button'
import Modal from './components/Modal'

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
      <Button primary onClick={handleClose}>
        Accept and Close
      </Button>
    </div>
  )

  return (
    <div>
      <Button outline success onClick={handleClick}>
        Open Modal
      </Button>
      {isModalOpen && (
        <Modal onClose={handleClose} actionBar={actionBar}>
          <p>Hey I'm some modal content!</p>
        </Modal>
      )}
    </div>
  )
}
```

Don’t forget to receive the new props in Modal. Some new Tailwind sales are also applied here:

```jsx
import ReactDOM from 'react-dom'

export default function Modal(props) {
  const {children, actionBar, onClose} = props
  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-300 opacity-50"
      ></div>
      <div className="absolute inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">{children}</div>
        <div className="flex justify-end">{actionBar}</div>
      </div>
    </div>,
    document.getElementById('modalContainer')
  )
}
```

One last thing. What happens to our Modal and its overlay if we have enough content on our page, for the window to need to scroll? Let’s simulate that with some `lipsum` and then fix it by disabling scrolling when a modal is open.

Enter `useEffect` yet again. In this case, we are going to apply a styling rule `overflow:hidden` when the modal is open. Don’t forget to at the top.

```jsx
import {useEffect} from 'react'
```

```jsx
useEffect(() => {
  // disable scrolling when the modal is open
  document.body.classList.add('overflow.hidden')

  // remove the overflow-hidden style when the modal closes
  return () => {
    document.body.classList.remove('overflow-hidden')
  }
}, [])
```

Great! But what if our button and modal code is somewhere on the page we had to scroll to get to? Absolute positioning is always going to place it at the top of our document. This is unintended/not ideal behavior. We can easily fix this by changing our `absolute` classes to `fixed`.

```jsx:
<div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-50"
      ></div>
      <div className="fixed inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">{children}</div>
        <div className="flex justify-end">{actionBar}</div>
      </div>
    </div>
```
