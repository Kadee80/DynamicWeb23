import useNavigation from '../hooks/usenavigation'

export default function Route({path, children}) {
  const {currentPath} = useNavigation()

  if (path === currentPath) {
    return children
  }
  return null
}
