import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from './RouterPathsMapper'
import { LoginScreen } from '@/screens/Login'
import { useEffect } from 'react'
import { RegisterScreen } from '@/screens/Register'
import { HomeScreen } from '@/screens/Home'
import { isLogged } from '@/services/Authenticator'
import { OnboardingScreen } from '@/screens/Onboarding'
import { PageNotFoundScreen } from '@/screens/PageNotFound/PageNotFound'
import { CatRegisterScreen } from '@/screens/CatRegister/CatRegister'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { SitterOnboardingScreen } from '@/screens/SitterOnboarding'
import { OwnerOnboardingScreen } from '@/screens/OwnerOnboarding'

function AppRouter() {
  const appLocation = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const run = () => {
      if (!isLogged() && appLocation.pathname !== RouterPaths.LOGIN && appLocation.pathname !== RouterPaths.REGISTER)
        navigate(RouterPaths.LOGIN)
      else if (
        isLogged() &&
        (appLocation.pathname === RouterPaths.LOGIN ||
          appLocation.pathname === RouterPaths.REGISTER ||
          appLocation.pathname === '/')
      )
        navigate(RouterPaths.ONBOARDING)
    }

    run()

    const intervalId = setInterval(run, 1000 * 60 * 5)

    return () => clearInterval(intervalId)
  }, [appLocation, navigate])

  return (
    <Routes>
      <Route path={RouterPaths.LOGIN} element={<LoginScreen />} />
      <Route path={RouterPaths.REGISTER} element={<RegisterScreen />} />
      <Route path={RouterPaths.ONBOARDING} element={<OnboardingScreen />} />
      <Route path={RouterPaths.SITTER_ONBOARDING} element={<SitterOnboardingScreen />} />
      <Route path={RouterPaths.OWNER_ONBOARDING} element={<OwnerOnboardingScreen />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path={RouterPaths.HOME} element={<HomeScreen />} />
        <Route path={RouterPaths.CAT_REGISTER} element={<CatRegisterScreen />} />
      </Route>
      <Route path="*" element={<PageNotFoundScreen />} />
    </Routes>
  )
}

export { AppRouter }
