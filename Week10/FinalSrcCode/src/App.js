import Route from './components/Route'
import Menu from './components/Menu'

import AccordionPage from './pages/AccordionPage'
import ButtonPage from './pages/ButtonPage'
import ModalPage from './pages/ModalPage'

export default function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Menu />
      <div className="col-span-5 relative">
        <Route path="/">
          <p>Home Page</p>
        </Route>
        <Route path="/button">
          <ButtonPage />
        </Route>
        <Route path="/accordion">
          <AccordionPage />
        </Route>
        <Route path="/modal">
          <ModalPage />
        </Route>
      </div>
    </div>
  )
}
