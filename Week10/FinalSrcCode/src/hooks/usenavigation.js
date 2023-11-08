import {useContext} from 'react'
import NavigationContext from '../context/navigation'

export default function useNavigation() {
  return useContext(NavigationContext)
}
