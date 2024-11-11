import { RouterPaths } from '@/router/RouterPathsMapper'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'

function DefaultLayout() {
  return (
    <div>
      <header>
        <Nav>
          <ul>
            <li>
              <Link to={RouterPaths.HOME}>Página inicial</Link>
            </li>
            <li>
              <Link to={RouterPaths.ONBOARDING}>Onboarding</Link>
            </li>
            <li>
              <Link to={RouterPaths.CAT_ONBOARDING}>Cadastro de gatos</Link>
            </li>
          </ul>
        </Nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export { DefaultLayout }

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    justify-content: space-around;
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
