import { OwnerHomeScreen } from './OwnerHomeScreen'
import { SitterHomeScreen } from './SitterHomeScreen'
import { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'

function HomeScreenPresenter() {
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!authState.user.onBoardingDone) {
      navigate(RouterPaths.ONBOARDING)
      return
    }
  }, [authState.user.onBoardingDone])

  if (authState.user.isCatsitter) return <SitterHomeScreen />
  else return <OwnerHomeScreen />
}

export { HomeScreenPresenter }
