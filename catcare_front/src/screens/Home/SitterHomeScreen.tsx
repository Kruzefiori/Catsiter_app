import { Button } from '@/components/Button/Button'
import { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { AuthContext } from '@/context'
import { toast } from 'react-toastify'
import { SitterHomeContainer, ButtonsWrapper } from './SitterStyles'
import { Booking, BookingStatus } from '@/domain/models/Booking'
import { BookingsList, Requester } from '../BookingsList'

function SitterHomeScreen() {
  const { getAuthTokenFromStorage, authState } = useContext(AuthContext)

  const [pendingBookings, setPendingBookings] = useState<Booking[]>([])
  const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>([])
  const [requesters, setRequesters] = useState<Requester[]>([])
  const [cardsToShow, setCardsToShow] = useState<'pending' | 'accepted'>('pending')

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const pendingBookingsResponse = await axios.get<Booking[]>(
          `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requested?userId=${
            authState.user.catSitterId
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
        console.log('pending bookings', pendingBookingsResponse.data)
        const parsedPendingBookings = pendingBookingsResponse.data.map((booking) => {
          const startDate = new Date(booking.startDate)
          const endDate = new Date(booking.endDate)

          const parsedVisits = booking.visits.map((visit) => {
            const visitDate = new Date(visit.visitDate)
            return {
              ...visit,
              visitDate
            }
          })

          return {
            ...booking,
            startDate,
            endDate,
            visits: parsedVisits
          }
        })
        setPendingBookings(parsedPendingBookings)

        // get requesters
        const requestersIds = parsedPendingBookings.map((booking) => booking.requesterId)
        console.log('requestersIds', requestersIds)
        requestersIds.forEach(async (requesterId) => {
          const requesterResponse = await axios.get<Requester>(
            `${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/ownerById?ownerId=${requesterId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthTokenFromStorage()}`
              }
            }
          )

          if (requesterResponse.status < 200 || requesterResponse.status >= 300) {
            toast.error('Erro ao buscar solicitantes')
            return
          }

          setRequesters((prev) => [...prev, requesterResponse.data])
        })
      } catch (error) {
        console.error('Erro ao buscar bookings pendentes', error)
      }
    }

    const fetchAcceptedBookings = async () => {
      try {
        const acceptedBookingsResponse = await axios.get<Booking[]>(
          `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requested?userId=${
            authState.user.catSitterId
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

        console.log('accepted bookings', acceptedBookingsResponse.data)
        // parse dates
        const parsedAcceptedBookings = acceptedBookingsResponse.data.map((booking) => {
          const startDate = new Date(booking.startDate)
          const endDate = new Date(booking.endDate)

          const parsedVisits = booking.visits.map((visit) => {
            const visitDate = new Date(visit.visitDate)
            return {
              ...visit,
              visitDate
            }
          })

          return {
            ...booking,
            startDate,
            endDate,
            visits: parsedVisits
          }
        })
        setAcceptedBookings(parsedAcceptedBookings)

        // get requesters
        const requestersIds = parsedAcceptedBookings.map((booking) => booking.requesterId)
        console.log('requestersIds', requestersIds)
        requestersIds.forEach(async (requesterId) => {
          const requesterResponse = await axios.get<Requester>(
            `${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/ownerById?ownerId=${requesterId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthTokenFromStorage()}`
              }
            }
          )

          if (requesterResponse.status < 200 || requesterResponse.status >= 300) {
            toast.error('Erro ao buscar solicitantes')
            return
          }

          setRequesters((prev) => [...prev, requesterResponse.data])
        })
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
    },
    [pendingBookings]
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
        requesters={requesters}
        bookings={cardsToShow === 'pending' ? pendingBookings : acceptedBookings}
        onAcceptBooking={handleAcceptBooking}
        onRejectBooking={handleRejectBooking}
      />
    </SitterHomeContainer>
  )
}

export { SitterHomeScreen }
