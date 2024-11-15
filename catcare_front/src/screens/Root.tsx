import { AuthContext } from '@/context'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RootScreen() {
  const navigate = useNavigate()
  const { authState } = useContext(AuthContext)

  // if (user.onBoardingDone) navigate(RouterPaths.HOME)
  //   else navigate(RouterPaths.ONBOARDING)

  useEffect(() => {
    if (authState.user?.onBoardingDone) {
      navigate(RouterPaths.HOME)
    } else {
      navigate(RouterPaths.ONBOARDING)
    }
  }, [authState.user?.onBoardingDone])

  return <></>
}

export { RootScreen }
