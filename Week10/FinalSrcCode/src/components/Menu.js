import Link from './Link'

export default function Menu() {
  const links = [
    {label: 'home', path: '/'},
    {label: 'accordion', path: '/accordion'},
    {label: 'buttons', path: '/button'},
    {label: 'modal', path: '/modal'},
  ]

  // map through our links[] and render Link components
  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="mb-3"
        activeClassName="font-bold border-l-4 border-blue-500 pl-2"
      >
        {link.label}
      </Link>
    )
  })
  // return our rendered links inside a sticky div
  return (
    <div className="sticky top-0 overflow-y-scroll flex flex-col items-start">
      {renderedLinks}
    </div>
  )
}
