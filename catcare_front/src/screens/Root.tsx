import { RouterPaths } from '@/router/RouterPathsMapper'
import axios from 'axios'
import { User } from '@/domain/models/user/User'
import { toast } from 'react-toastify'

import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'

function RootScreen() {
  const navigate = useNavigate()
  const { authState, setUserData } = useContext(AuthContext)

  const [isFetched, setIsFetched] = useState(false)

  console.log('ROOT')

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
        return
      } else {
        setUserData(response.data)
        if (response.data.onBoardingDone) navigate(RouterPaths.HOME)
        else navigate(RouterPaths.ONBOARDING)
      }
    }

    if (!isFetched) {
      console.log('isFetched', isFetched)
      run()
      setIsFetched(true)
    }
  }, [])
  return <></>
}

export { RootScreen }
