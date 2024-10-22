import { Button } from '@/components/Button/Button'
import { User } from '@/domain/models/user/User'
import { useBehaviorSubject } from '@/hooks/useBehaviorSubject'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { resetAuthToken, setUserData } from '@/services/Authenticator'
import { AuthState } from '@/states/AuthState'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function HomeScreen() {
  const navigate = useNavigate()
  const appLocation = useLocation()

  const [isFetched, setIsFetched] = useState(false)
  const authState = useBehaviorSubject(AuthState)

  const user = useMemo(() => authState.user ?? { name: '', email: '' }, [authState])

  useEffect(() => {
    const run = async () => {
      const response = await axios.get<User>(`${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authState.token}`
        }
      })

      if (response.status < 200 || response.status >= 300) {
        toast.error('Ocorreu um erro ao tentar baixar seus dados.')
        setIsFetched(true)
        return
      } else {
        setUserData(response.data)
        setIsFetched(true)
      }
    }

    if (!isFetched && !appLocation.state.isGoogleUser) run()
  }, [authState])

  const handleLogout = () => {
    toast.info('Saindo da sua conta')
    resetAuthToken()
    navigate(RouterPaths.LOGIN)
  }

  return (
    <div>
      <h1>Bem vindo à tela inicial do Catcare!</h1>
      <p>email: {user.email}</p>
      <p>name: {user.name}</p>
      <img src={user.picture} alt="" />

      <Button variant="filled" onClick={handleLogout}>
        SAIR
      </Button>
    </div>
  )
}

export { HomeScreen }
