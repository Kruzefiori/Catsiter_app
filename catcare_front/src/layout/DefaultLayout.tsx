import { Button } from '@/components/Button/Button'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { useContext, useEffect, useMemo, useState } from 'react'

import userPlaceholderImg from '@assets/user-placeholder.png'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { User } from '@/domain/models/User'

function DefaultLayout() {
  const navigate = useNavigate()
  const { authState, setUserData, resetAuthToken, getAuthTokenFromStorage } = useContext(AuthContext)

  const [isFetched, setIsFetched] = useState(false)

  const user = useMemo(() => authState?.user, [authState])

  useEffect(() => {
    const run = async () => {
      console.log('get user data')
      const response = await axios.get<User>(`${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthTokenFromStorage()}`
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

  const handleLogout = () => {
    toast.info('Saindo da sua conta')
    resetAuthToken()
    navigate(RouterPaths.LOGIN)
  }

  return (
    <div>
      <Header>
        <AccountWrapper>
          <img src={userPlaceholderImg} alt="" />
          <UserDescription>{user?.name}</UserDescription>
          <Button size="sm" variant="filled" fullWidth onClick={handleLogout}>
            SAIR
          </Button>
        </AccountWrapper>
        {/* <Nav>
          <ul>
            <li>
              <Link to={RouterPaths.HOME}>Página inicial</Link>
            </li>
            <li>
              <Link to={RouterPaths.ONBOARDING}>Onboarding</Link>
            </li>
            <li>
              <Link to={RouterPaths.CAT_REGISTER}>Cadastro de gatos</Link>
            </li>
          </ul>
        </Nav> */}
      </Header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export { DefaultLayout }

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
  }

  li {
    width: fit-content;
    height: 30px;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.secondary};
    a {
      color: ${({ theme }) => theme.colors.neutralL5};
      ${({ theme }) => theme.fonts.textMD}
      text-decoration: none;
      text-align: center;
      vertical-align: middle;
    }
  }
`

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  & img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }

  & button {
    width: 70px;
    justify-self: flex-end;
  }
`

const UserDescription = styled.p`
  ${({ theme }) => theme.fonts.infoLG}
  color: ${({ theme }) => theme.colors.secondary};
  flex: 1;
  text-align: start;
`
