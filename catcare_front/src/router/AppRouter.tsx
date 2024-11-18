import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from './RouterPathsMapper'
import { LoginScreen } from '@/screens/Login'
import { useContext, useEffect } from 'react'
import { RegisterScreen } from '@/screens/Register'
import { HomeScreenPresenter } from '@/screens/Home'
import { OnboardingScreen } from '@/screens/Onboarding'
import { PageNotFoundScreen } from '@/screens/PageNotFound/PageNotFound'
import { CatRegisterScreen } from '@/screens/CatRegister/CatRegister'
import { DefaultLayout } from '@/layout/DefaultLayout'
import { SitterOnboardingScreen } from '@/screens/Onboarding/SitterOnboarding'
import { OwnerOnboardingScreen } from '@/screens/Onboarding/OwnerOnboarding'
import { RootScreen } from '@/screens/Root'
import { AuthContext } from '@/context/AuthContext'

function AppRouter() {
  const appLocation = useLocation()
  const navigate = useNavigate()
  const { isLogged } = useContext(AuthContext)

  useEffect(() => {
    const run = () => {
      if (!isLogged() && appLocation.pathname !== RouterPaths.LOGIN && appLocation.pathname !== RouterPaths.REGISTER)
        navigate(RouterPaths.LOGIN)
      else if (
        (isLogged() &&
          (appLocation.pathname === RouterPaths.LOGIN ||
            appLocation.pathname === RouterPaths.REGISTER ||
            appLocation.pathname === RouterPaths.ROOT)) ||
        appLocation.pathname === '/'
      )
        navigate(RouterPaths.ROOT)
    }

    run()

    const intervalId = setInterval(run, 1000 * 60 * 5)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Routes>
      <Route path={RouterPaths.ROOT} element={<RootScreen />} />
      <Route path={RouterPaths.LOGIN} element={<LoginScreen />} />
      <Route path={RouterPaths.REGISTER} element={<RegisterScreen />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path={RouterPaths.SITTER_ONBOARDING} element={<SitterOnboardingScreen />} />
        <Route path={RouterPaths.OWNER_ONBOARDING} element={<OwnerOnboardingScreen />} />
        <Route path={RouterPaths.ONBOARDING} element={<OnboardingScreen />} />
        <Route path={RouterPaths.HOME} element={<HomeScreenPresenter />} />
        <Route path={RouterPaths.CAT_REGISTER} element={<CatRegisterScreen />} />
      </Route>
      <Route path="*" element={<PageNotFoundScreen />} />
    </Routes>
  )
}

export { AppRouter }
