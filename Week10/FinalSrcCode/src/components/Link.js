import useNavigation from '../hooks/usenavigation'
import cx from 'classnames'

export default function Link({to, children, className, activeClassName}) {
  const {navigate, currentPath} = useNavigation()

  const handleClick = (event) => {
    event.preventDefault()
    navigate(to)
  }

  const classes = cx(
    'text-blue-500',
    className,
    currentPath === to && activeClassName
  )

  return (
    <a href={to} onClick={handleClick} className={classes}>
      {children}
    </a>
  )
}
