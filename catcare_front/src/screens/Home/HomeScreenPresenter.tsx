import { OwnerHomeScreen } from './OwnerHomeScreen'
import { SitterHomeScreen } from './SitterHomeScreen'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

function HomeScreenPresenter() {
  const { authState } = useContext(AuthContext)

  console.log(authState.user)

  if (!authState.user.isCatsitter) return <SitterHomeScreen />
  else return <OwnerHomeScreen />
}

export { HomeScreenPresenter }
