import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from './RouterPathsMapper'
import { LoginScreen } from '@/screens/Login'
import { useEffect } from 'react'
import { RegisterScreen } from '@/screens/Register'
import { HomeScreen } from '@/screens/Home'
import { isLogged } from '@/services/Authenticator'
import { OnboardingScreen } from '@/screens/Onboarding'
import { PageNotFoundScreen } from '@/screens/PageNotFound/PageNotFound'
import { CatOnboardingScreen } from '@/screens/CatOnboarding/CatOnboarding'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { SitterOnboardingScreen } from '@/screens/SitterOnboarding'

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
      <Route path={RouterPaths.LOGIN} element={<LoginScreen />} />
      <Route path={RouterPaths.REGISTER} element={<RegisterScreen />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path={RouterPaths.HOME} element={<HomeScreen />} />
        <Route path={RouterPaths.ONBOARDING} element={<OnboardingScreen />} />
        <Route path={RouterPaths.CAT_ONBOARDING} element={<CatOnboardingScreen />} />
        <Route path={RouterPaths.SITTER_ONBOARDING} element={<SitterOnboardingScreen />} />
      </Route>
      <Route path="*" element={<PageNotFoundScreen />} />
    </Routes>
  )
}

export { AppRouter }
