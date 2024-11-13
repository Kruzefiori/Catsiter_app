import { Button } from '@/components/Button/Button'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { resetAuthToken, setUserData } from '@/services/Authenticator'
import { useEffect, useMemo, useState } from 'react'
import { AuthState, AuthStateProps } from '@/states/AuthState'
import { useBehaviorSubject } from '@/hooks/useBehaviorSubject'
import userPlaceholderImg from '@assets/user-placeholder.png'

function DefaultLayout() {
  const navigate = useNavigate()

  const authState = useBehaviorSubject<AuthStateProps>(AuthState)

  const user = useMemo(() => authState?.user, [authState])
  console.log(user)

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
          <Button size="sm" variant="filled" onClick={handleLogout}>
            SAIR
          </Button>
        </AccountWrapper>
        <Nav>
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
        </Nav>
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
