import { RouterPaths } from '@/router/RouterPathsMapper'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { toast } from 'react-toastify'

import { useContext, useEffect, useMemo, useState } from 'react'

import userPlaceholderImg from '@assets/user-placeholder.png'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { User } from '@/domain/models/User'
import { getStateColor } from '@/utils/getStateColor'
import { CalendarToday, ExitToApp, Home } from '@mui/icons-material'
import { CalendarColor, CalendarEvent, CalendarPopup } from '@/components/CalendarPopup'
import { mockedUserBookings } from '@/screens/Home/utils'

function DefaultLayout() {
  const navigate = useNavigate()
  const appLocation = useLocation()
  const { authState, setUser, resetAuthToken, resetUserData, getAuthTokenFromStorage } = useContext(AuthContext)

  const [isFetched, setIsFetched] = useState(false)
  const [showAgenda, setShowAgenda] = useState(false)

  const user = useMemo(() => authState?.user, [authState])
  const sitterAgenda = useMemo(() => {
    const events: CalendarEvent[] = []
    mockedUserBookings.forEach((booking) => {
      booking.visits.forEach((visit) => {
        events.push({
          id: visit.id,
          title: 'Ocupado',
          start: new Date(visit.visitDate),
          end: new Date(new Date(visit.visitDate).getTime() + visit.durationInMinutes * 60000),
          color: CalendarColor.LIGHT_BLUE
        })
      })
    })

    return events
  }, [])

  useEffect(() => {
    const run = async () => {
      const response = await axios.get<User>(`${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/user`, {
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

  useEffect(() => {
    // const fetchBookings = async () => {
    //   const bookingsResponse = await axios.get<Booking[]>(
    //     `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requested?userId=${
    //       authState.user.id
    //     }&status=PENDING`,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${getAuthTokenFromStorage()}`
    //       }
    //     }
    //   )
    //   if (bookingsResponse.status < 200 || bookingsResponse.status >= 300) {
    //     toast.error('Não foi possível buscar os bookings.')
    //     return
    //   }
    //   setPendingBookings(bookingsResponse.data)
    // }
    // fetchBookings()
  }, [])

  const handleLogout = () => {
    toast.info('Você saiu da sua conta.')
    resetAuthToken()
    resetUserData()
    navigate(RouterPaths.LOGIN)
  }

  return (
    <LayoutContainer>
      <Header>
        <AccountWrapper>
          <img src={userPlaceholderImg} alt="" title="Ver perfil" onClick={() => navigate(RouterPaths.PROFILE)} />
          <UserDescription>{user?.name}</UserDescription>
        </AccountWrapper>
        <HeaderActions>
          {appLocation.pathname !== RouterPaths.HOME && (
            <IconButton onClick={() => navigate(RouterPaths.HOME)} title="Página inicial">
              <Home color="action" />
            </IconButton>
          )}
          {authState?.user?.isCatsitter && (
            <IconButton onClick={() => setShowAgenda(true)} title="Agenda">
              <CalendarToday color="action" />
            </IconButton>
          )}
          <IconButton onClick={handleLogout} title="Sair">
            <ExitToApp color="action" />
          </IconButton>
        </HeaderActions>
      </Header>
      <main>
        {showAgenda && <CalendarPopup events={sitterAgenda} onClose={() => setShowAgenda(false)} />}
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
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralL3};
`

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    justify-content: space-between;
  }
`

interface NavButtonProps {
  active?: boolean
}

const NavButton = styled.li<NavButtonProps>`
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
  flex: 1;

  & img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;
  }

  & button {
    width: 70px;
    justify-self: flex-end;
  }
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const UserDescription = styled.p`
  ${({ theme }) => theme.fonts.infoLG}
  color: ${({ theme }) => theme.colors.secondary};
  flex: 1;
  text-align: start;
`
