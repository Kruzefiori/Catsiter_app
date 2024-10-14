import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { RouterPaths } from './RouterPathsMapper'
import { LoginScreen } from '@/screens/Login'
import { useEffect } from 'react'
import { RegisterScreen } from '@/screens/Register'
import { HomeScreen } from '@/screens/Home'

function AppRouter() {
  const appLocation = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const isLogged = false // TODO: adicionar verificação de login
    if (!isLogged && appLocation.pathname !== RouterPaths.LOGIN && appLocation.pathname !== RouterPaths.REGISTER)
      navigate(RouterPaths.LOGIN)
    else if (isLogged && (appLocation.pathname === RouterPaths.LOGIN || appLocation.pathname === '/'))
      navigate(RouterPaths.HOME)
  }, [appLocation])

  return (
    <Routes>
      <Route path={RouterPaths.LOGIN} element={<LoginScreen />} />
      <Route path={RouterPaths.REGISTER} element={<RegisterScreen />} />
      <Route path={RouterPaths.HOME} element={<HomeScreen />} />
    </Routes>
  )
}

export { AppRouter }
