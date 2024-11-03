import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from './RouterPathsMapper'
import { LoginScreen } from '@/screens/Login'
import { useEffect } from 'react'
import { RegisterScreen } from '@/screens/Register'
import { HomeScreen } from '@/screens/Home'
import { isLogged } from '@/services/Authenticator'
import { OnboardingScreen } from '@/screens/Onboarding'
import { PageNotFoundScreen } from '@/screens/PageNotFound/PageNotFound'

function AppRouter() {
  const appLocation = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged() && appLocation.pathname !== RouterPaths.LOGIN && appLocation.pathname !== RouterPaths.REGISTER)
      navigate(RouterPaths.LOGIN)
    else if (
      isLogged() &&
      (appLocation.pathname === RouterPaths.LOGIN ||
        appLocation.pathname === RouterPaths.REGISTER ||
        appLocation.pathname === '/')
    )
      navigate(RouterPaths.HOME)
  }, [appLocation])

  return (
    <Routes>
      <Route path="/" element={null} />
      <Route path={RouterPaths.LOGIN} element={<LoginScreen />} />
      <Route path={RouterPaths.REGISTER} element={<RegisterScreen />} />
      <Route path={RouterPaths.HOME} element={<HomeScreen />} />
      <Route path={RouterPaths.ONBOARDING} element={<OnboardingScreen />} />
      <Route path="*" element={<PageNotFoundScreen />} />
    </Routes>
  )
}

export { AppRouter }
