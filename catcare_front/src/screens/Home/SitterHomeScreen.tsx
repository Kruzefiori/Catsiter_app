import { Button } from '@/components/Button/Button'
import { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { AuthContext } from '@/context'
import { toast } from 'react-toastify'
import { mockedUserBookings } from './utils'
import { SitterHomeContainer, ButtonsWrapper } from './SitterStyles'
import { Booking, BookingStatus } from '@/domain/models/Booking'
import { BookingsList } from '../BookingsList'

function SitterHomeScreen() {
  const { getAuthTokenFromStorage, authState } = useContext(AuthContext)

  const [pendingBookings, setPendingBookings] = useState<Booking[]>([])
  const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([])
  const [cardsToShow, setCardsToShow] = useState<'pending' | 'accepted'>('pending')

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const pendingBookingsResponse = await axios.get<Booking[]>(
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

        if (pendingBookingsResponse.status < 200 || pendingBookingsResponse.status >= 300) {
          toast.error('Erro ao buscar bookings pendentes')
          return
        }
        console.log('pending: ', pendingBookingsResponse.data)
        setPendingBookings(pendingBookingsResponse.data)
      } catch (error) {
        console.error('Erro ao buscar bookings pendentes', error)
      }
    }

    const fetchAcceptedBookings = async () => {
      try {
        const acceptedBookingsResponse = await axios.get<Booking[]>(
          `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requested?userId=${
            authState.user.id
          }&status=ACCEPTED`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getAuthTokenFromStorage()}`
            }
          }
        )

        if (acceptedBookingsResponse.status < 200 || acceptedBookingsResponse.status >= 300) {
          toast.error('Erro ao buscar bookings aceitos')
          return
        }

        console.log('accepted: ', acceptedBookingsResponse.data)
        setAcceptedBookings(acceptedBookingsResponse.data)
      } catch (error) {
        console.error('Erro ao buscar bookings aceitos', error)
      }
    }

    fetchPendingBookings()
    fetchAcceptedBookings()

    // Mocked data
    // const myPendingBookings: Booking[] = mockedUserBookings.filter((booking) => booking.status === 'PENDING')
    // setPendingBookings(myPendingBookings)

    // const myAcceptedBookings: Booking[] = mockedUserBookings.filter((booking) => booking.status === 'ACCEPTED')
    // setAcceptedBookings(myAcceptedBookings)
  }, [])

  const handleAcceptBooking = useCallback(
    async (bookingId: number) => {
      // const response = await axios.patch(
      //   `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/answer-booking`,
      //   {
      //     bookingId: bookingId,
      //     answerBooking: 'ACCEPTED'
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${getAuthTokenFromStorage()}`
      //     }
      //   }
      // )

      // if (response.status < 200 || response.status >= 300) {
      //   toast.error('Não foi possível aceitar o booking.')
      //   return
      // }

      const bookingToAccept = pendingBookings.find((booking) => booking.id === bookingId)
      setAcceptedBookings((prev) => [...prev, bookingToAccept])
      setPendingBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
      const mockedBookingToAccept = mockedUserBookings.find((booking) => booking.id === bookingId)
      mockedBookingToAccept && (mockedBookingToAccept.status = BookingStatus.ACCEPTED)
    },
    [pendingBookings]
  )

  const handleRejectBooking = useCallback(async (bookingId: number) => {
    // const response = await axios.patch(
    //   `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/answer-booking`,
    //   {
    //     bookingId: bookingId,
    //     answerBooking: 'REJECTED'
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${getAuthTokenFromStorage()}`
    //     }
    //   }
    // )

    // if (response.status < 200 || response.status >= 300) {
    //   toast.error('Não foi possível rejeitar o booking.')
    //   return
    // }

    setPendingBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
    const mockedBookingToReject = mockedUserBookings.find((booking) => booking.id === bookingId)
    mockedBookingToReject && (mockedBookingToReject.status = BookingStatus.REJECTED)
  }, [])

  return (
    <SitterHomeContainer>
      <h1>Suas reservas</h1>
      <ButtonsWrapper>
        <Button
          onClick={() => setCardsToShow('pending')}
          fullWidth
          size="sm"
          variant={cardsToShow === 'pending' ? 'filled' : 'outline'}
        >
          Pendentes
        </Button>
        <Button
          onClick={() => setCardsToShow('accepted')}
          fullWidth
          size="sm"
          variant={cardsToShow === 'accepted' ? 'filled' : 'outline'}
        >
          Aceitas
        </Button>
      </ButtonsWrapper>
      <BookingsList
        bookings={cardsToShow === 'pending' ? pendingBookings : acceptedBookings}
        onAcceptBooking={handleAcceptBooking}
        onRejectBooking={handleRejectBooking}
      />
    </SitterHomeContainer>
  )
}

export { SitterHomeScreen }
