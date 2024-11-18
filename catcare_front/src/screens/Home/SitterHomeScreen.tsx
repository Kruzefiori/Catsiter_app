import styled from 'styled-components'
import { Button } from '@/components/Button/Button'
import { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { AuthContext } from '@/context'
import { toast } from 'react-toastify'
import { User } from '@/domain/models/user/User'

enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}
interface Booking {
  status: BookingStatus
  requesterId: number
  requestedId: number
  startDate: string
  endDate: string
  generalNotes: string | null
  id: number
  totalVisits: number
  createdAt: Date
  updatedAt: Date
}

function SitterHomeScreen() {
  const { getAuthTokenFromStorage, authState } = useContext(AuthContext)

  const [pendingBookings, setPendingBookings] = useState<Booking[]>([])
  const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([])
  const [catSitterProfile, setCatSitterProfile] = useState<User | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsResponse = await axios.get<Booking[]>(
        `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requested?userId=${
          authState.user.id
        }&status=PENDING`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthTokenFromStorage()}`
          }
        }
      )

      if (bookingsResponse.status < 200 || bookingsResponse.status >= 300) {
        toast.error('Não foi possível buscar os bookings.')
        return
      }

      setPendingBookings(bookingsResponse.data)

      const catSitterProfileResponse = await axios.get<User>(
        `${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/get-profile?userId=${authState.user.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthTokenFromStorage()}`
          }
        }
      )

      if (catSitterProfileResponse.status < 200 || catSitterProfileResponse.status >= 300) {
        toast.error('Não foi possível buscar o perfil do catsitter.')
        return
      }

      setCatSitterProfile(catSitterProfileResponse.data)
    }

    fetchBookings()
  }, [])

  const handleAcceptBooking = useCallback(async (bookingId: number) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/answer-booking`,
      {
        bookingId: bookingId,
        answerBooking: 'ACCEPTED'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthTokenFromStorage()}`
        }
      }
    )

    if (response.status < 200 || response.status >= 300) {
      toast.error('Não foi possível aceitar o booking.')
      return
    }

    setPendingBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
    setAcceptedBookings((prev) => [...prev, response.data])
  }, [])

  const handleRejectBooking = useCallback(async (bookingId: number) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/answer-booking`,
      {
        bookingId: bookingId,
        answerBooking: 'REJECTED'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthTokenFromStorage()}`
        }
      }
    )

    if (response.status < 200 || response.status >= 300) {
      toast.error('Não foi possível rejeitar o booking.')
      return
    }

    setPendingBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
  }, [])

  return (
    <SitterHomeContainer>
      <CardsList>
        {pendingBookings.map((booking) => (
          <Booking key={booking.id}>
            <Header>
              {/* TODO: fetch user name */}
              <Name>{booking.requesterId}</Name>
              <button>Mais opções</button>
            </Header>
            <Location>Localização abrev.</Location>
            <DateInfo>
              {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
            </DateInfo>
            {[...Array(booking.totalVisits)].map((_, index) => (
              <Visit key={index}>Visita {index + 1}</Visit>
            ))}
            <Notes>{booking.generalNotes}</Notes>
            <Footer>
              <Button variant="filled" size="sm" fullWidth onClick={() => handleAcceptBooking(booking.id)}>
                Aceitar
              </Button>
              <Button variant="filled" size="sm" fullWidth onClick={() => handleRejectBooking(booking.id)}>
                Recusar
              </Button>
            </Footer>
          </Booking>
        ))}
      </CardsList>
    </SitterHomeContainer>
  )
}

export { SitterHomeScreen }

const SitterHomeContainer = styled.div`
  padding: 8px 4px;
`

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Booking = styled.div`
  background-color: ${({ theme }) => theme.colors.neutralTertiary};
  border: 2px solid ${({ theme }) => theme.colors.neutralL2};
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px;
  border-radius: 8px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Name = styled.p``

const Notes = styled.p``
const DateInfo = styled.p``
const Location = styled.p``
const Visit = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL1};
  border-radius: 6px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Footer = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`
