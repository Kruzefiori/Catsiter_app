import { Button } from '@/components/Button/Button'
import { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { AuthContext } from '@/context'
import { toast } from 'react-toastify'
import { mockedUserBookings, requestersData } from './utils'
import {
  BookingCard,
  CardsList,
  DateInfo,
  Footer,
  Header,
  Address,
  Name,
  Notes,
  SitterHomeContainer,
  VisitWrapper,
  VisitSummary,
  IconButton,
  VisitItem,
  Info,
  Details
} from './SitterStyles'
import { Booking } from '@/domain/models/Booking'
import { ArrowDropDown } from '@mui/icons-material'

function SitterHomeScreen() {
  const { getAuthTokenFromStorage, authState } = useContext(AuthContext)

  const [pendingBookings, setPendingBookings] = useState<Booking[]>([])
  const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([])

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

    const myPendingBookings: Booking[] = mockedUserBookings.filter((booking) => booking.status === 'PENDING')
    setPendingBookings(myPendingBookings)

    const myAcceptedBookings: Booking[] = mockedUserBookings.filter((booking) => booking.status === 'ACCEPTED')
    setAcceptedBookings(myAcceptedBookings)
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
          <BookingCard key={booking.id}>
            <DateInfo>
              {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
            </DateInfo>
            <Header>
              <Name>
                <strong>Solicitante:</strong> {requestersData.find((user) => user.id === booking.requesterId)?.name}
              </Name>
            </Header>
            <Address>
              <strong>Endereço:</strong> {requestersData.find((user) => user.id === booking.requesterId)?.address}
            </Address>
            {[...booking.visits].map((visit, index) => (
              <VisitWrapper key={visit.visitDate?.toISOString() ?? index}>
                <VisitSummary expandIcon={<ArrowDropDown />}>{`Visita ${index + 1}`}</VisitSummary>
                <VisitItem>
                  <Info>
                    <strong>Data:</strong> {visit.visitDate?.toLocaleDateString()}
                  </Info>
                  <Info>
                    <strong>Observações:</strong>
                    <Details>{visit.notes || <i>Sem observações.</i>}</Details>
                  </Info>
                </VisitItem>
              </VisitWrapper>
            ))}
            <Notes>{booking.generalNotes}</Notes>
            <Footer>
              <Button
                variant="filled"
                color="#d32f2f"
                size="sm"
                fullWidth
                onClick={() => handleRejectBooking(booking.id)}
              >
                Recusar
              </Button>
              <Button
                variant="filled"
                color="#00a128"
                size="sm"
                fullWidth
                onClick={() => handleAcceptBooking(booking.id)}
              >
                Aceitar
              </Button>
            </Footer>
          </BookingCard>
        ))}
      </CardsList>
    </SitterHomeContainer>
  )
}

export { SitterHomeScreen }
