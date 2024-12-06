import { Button } from '@/components/Button/Button'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { toast } from 'react-toastify'

import { useContext, useEffect, useMemo, useState } from 'react'

import userPlaceholderImg from '@assets/user-placeholder.png'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { User } from '@/domain/models/User'
import { getStateColor } from '@/utils/getStateColor'

function DefaultLayout() {
  const navigate = useNavigate()
  const appLocation = useLocation()
  const { authState, setUser, resetAuthToken, resetUserData, getAuthTokenFromStorage } = useContext(AuthContext)

  const [isFetched, setIsFetched] = useState(false)

  const user = useMemo(() => authState?.user, [authState])

  useEffect(() => {
    const run = async () => {
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
        setUser(response.data)
      }
    }

    if (!isFetched) {
      run()
      setIsFetched(true)
    }
  }, [])

  const handleLogout = () => {
    toast.info('Saindo da sua conta')
    resetAuthToken()
    resetUserData()
    navigate(RouterPaths.LOGIN)
  }

  return (
    <LayoutContainer>
      <Header>
        <AccountWrapper>
          <img src={userPlaceholderImg} alt="" />
          <UserDescription>{user?.name}</UserDescription>
          <Button size="sm" variant="light-filled" fullWidth onClick={handleLogout}>
            SAIR
          </Button>
        </AccountWrapper>
        <Nav>
          <ul>
            <LinkButton active={appLocation.pathname === RouterPaths.HOME}>
              <Link to={RouterPaths.HOME}>Página inicial</Link>
            </LinkButton>
            <LinkButton active={appLocation.pathname === RouterPaths.CAT_REGISTER}>
              <Link to={RouterPaths.CAT_REGISTER}>Cadastrar de gatos</Link>
            </LinkButton>
          </ul>
        </Nav>
      </Header>
      <main>
        <Outlet />
      </main>
    </LayoutContainer>
  )
}

export { DefaultLayout }

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  width: 100%;

  & main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralL3};
`

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
  }
`

interface LinkButtonProps {
  active?: boolean
}

const LinkButton = styled.li<LinkButtonProps>`
  width: fit-content;
  height: 30px;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ active, theme }) => (active ? theme.colors.secondary : theme.colors.neutralTertiary)};
  a {
    color: ${({ theme, active }) => (active ? theme.colors.neutralL5 : theme.colors.secondary)};
    ${({ theme }) => theme.fonts.labelSM}
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  }

  &:hover {
    ${({ theme, active }) =>
      !active
        ? css`
            background-color: ${getStateColor(theme.colors.neutralL2, 'hover')};
          `
        : ''}
  }
  &:active {
    ${({ theme, active }) =>
      !active
        ? css`
            background-color: ${getStateColor(theme.colors.neutralL2, 'pressed')};
          `
        : ''}
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
