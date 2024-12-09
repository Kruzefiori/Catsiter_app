import { OwnerHomeScreen } from './OwnerHomeScreen'
import { SitterHomeScreen } from './SitterHomeScreen'
import { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'

function HomeScreenPresenter() {
  const { authState } = useContext(AuthContext)

  if (authState.user.type === 'SITTER') return <SitterHomeScreen />
  else return <OwnerHomeScreen />
}

export { HomeScreenPresenter }
