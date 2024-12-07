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
import { AuthContext } from '@/context/AuthContext'
import { BookingScreen } from '@/screens/Booking'
import { ProfileScreen } from '@/screens/ProfileScreen'

function AppRouter() {
  const appLocation = useLocation()
  const navigate = useNavigate()
  const { isLogged, authState } = useContext(AuthContext)

  useEffect(() => {
    const run = () => {
      if (!isLogged() && appLocation.pathname !== RouterPaths.LOGIN && appLocation.pathname !== RouterPaths.REGISTER) {
        navigate(RouterPaths.LOGIN)
        return
      } else if (
        isLogged() &&
        (appLocation.pathname === RouterPaths.LOGIN ||
          appLocation.pathname === RouterPaths.REGISTER ||
          appLocation.pathname === '/')
      ) {
        navigate(RouterPaths.HOME)
      }
    }

    run()

    // const intervalId = setInterval(run, 1000 * 60 * 5)
    const intervalId = setInterval(run, 1000 * 15)

    return () => clearInterval(intervalId)
  }, [appLocation.pathname])

  return (
    <Routes>
      <Route path={RouterPaths.LOGIN} element={<LoginScreen />} />
      <Route path={RouterPaths.REGISTER} element={<RegisterScreen />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path={RouterPaths.SITTER_ONBOARDING} element={<SitterOnboardingScreen />} />
        <Route path={RouterPaths.OWNER_ONBOARDING} element={<OwnerOnboardingScreen />} />
        <Route path={RouterPaths.ONBOARDING} element={<OnboardingScreen />} />
        <Route path={RouterPaths.HOME} element={<HomeScreenPresenter />} />
        <Route path={RouterPaths.CAT_REGISTER} element={<CatRegisterScreen />} />
        <Route path={`${RouterPaths.CREATE_BOOKING}/:catsitterId`} element={<BookingScreen />} />
        <Route path={RouterPaths.PROFILE} element={<ProfileScreen />} />
      </Route>
      <Route path="*" element={<PageNotFoundScreen />} />
    </Routes>
  )
}

export { AppRouter }
