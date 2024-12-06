import { Button } from '@/components/Button/Button'
import { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { AuthContext } from '@/context'
import { toast } from 'react-toastify'
import { mockedUserBookings } from './utils'
import { SitterHomeContainer, ButtonsWrapper } from './SitterStyles'
import { Booking } from '@/domain/models/Booking'
import { BookingsList } from '../BookingsList'

function SitterHomeScreen() {
  const { getAuthTokenFromStorage, authState } = useContext(AuthContext)

  const [pendingBookings, setPendingBookings] = useState<Booking[]>([])
  const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([])
  const [cardsToShow, setCardsToShow] = useState<'pending' | 'accepted'>('pending')

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

  const handleAcceptBooking = useCallback(
    async (bookingId: number) => {
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

      const bookingToAccept = pendingBookings.find((booking) => booking.id === bookingId)
      setAcceptedBookings((prev) => [...prev, bookingToAccept])
      setPendingBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
    },
    [pendingBookings, acceptedBookings]
  )

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
      <ButtonsWrapper>
        <Button
          onClick={() => setCardsToShow('pending')}
          fullWidth
          size="md"
          variant={cardsToShow === 'pending' ? 'filled' : 'outline'}
        >
          Pendentes
        </Button>
        <Button
          onClick={() => setCardsToShow('accepted')}
          fullWidth
          size="md"
          variant={cardsToShow === 'accepted' ? 'filled' : 'outline'}
        >
          Aceitos
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
