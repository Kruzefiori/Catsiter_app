import Star from '@assets/star.svg?react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CatSitter, CatSitterResponse } from '@/domain/models/CatSitter'
import { Booking } from '@/domain/models/Booking'
import { Button } from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { CalendarMonth } from '@mui/icons-material'
import { CalendarPopup, CalendarEvent, CalendarColor } from '@/components/CalendarPopup'
import {
  Address,
  CardsList,
  Footer,
  Header,
  IconButton,
  InfoWrapper,
  Name,
  OwnerHomeContainer,
  Price,
  Rating,
  SitterCard,
  Description
} from './OwnerStyles'

function OwnerHomeScreen() {
  const navigate = useNavigate()
  const { getAuthTokenFromStorage, authState } = useContext(AuthContext)

  const [catSitters, setCatSitters] = useState<CatSitter[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [eventsToShow, setEventsToShow] = useState<CalendarEvent[]>([])

  useEffect(() => {
    const fetchCatSitters = async () => {
      try {
        const response = await axios.get<CatSitterResponse[]>(
          `${import.meta.env.VITE_CATCARE_SERVER_URL}/profile/catsitters`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getAuthTokenFromStorage()}`
            }
          }
        )

        if (response.status < 200 || response.status >= 300) {
          toast.error('Não foi possível buscar os catsitters.')
          throw new Error('Não foi possível buscar os catsitters.')
        }
        const parsedCatsitters: CatSitter[] = response.data
          .map((catsitter) => ({
            ...catsitter,
            bookings: catsitter.requestsReceived
          }))
          .map((catsitter) => {
            const events: CalendarEvent[] = []
            catsitter.bookings?.length > 0 &&
              catsitter.bookings.forEach((booking) => {
                booking.visits?.length > 0 &&
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

            return { ...catsitter, events }
          })

        setCatSitters(parsedCatsitters)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCatSitters()

    return () => {
      setCatSitters([])
    }
  }, [])

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     const pendingBookingsResponse = await axios.get<Booking[]>(
  //       `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requester?userId=${
  //         authState.user.id
  //       }&status=PENDING`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${getAuthTokenFromStorage()}`
  //         }
  //       }
  //     )

  //     if (pendingBookingsResponse.status < 200 || pendingBookingsResponse.status >= 300) {
  //       toast.error('Não foi possível buscar os bookings.')
  //       return
  //     }

  //     const acceptedBookingsResponse = await axios.get<Booking[]>(
  //       `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requester?userId=${
  //         authState.user.id
  //       }&status=ACCEPTED`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${getAuthTokenFromStorage()}`
  //         }
  //       }
  //     )

  //     if (acceptedBookingsResponse.status < 200 || acceptedBookingsResponse.status >= 300) {
  //       toast.error('Não foi possível buscar os bookings.')
  //       return
  //     }

  //     const rejectedBookingsResponse = await axios.get<Booking[]>(
  //       `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requester?userId=${
  //         authState.user.id
  //       }&status=REJECTED`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${getAuthTokenFromStorage()}`
  //         }
  //       }
  //     )

  //     if (rejectedBookingsResponse.status < 200 || rejectedBookingsResponse.status >= 300) {
  //       toast.error('Não foi possível buscar os bookings.')
  //       return
  //     }

  //     setBookings([...pendingBookingsResponse.data, ...acceptedBookingsResponse.data, ...rejectedBookingsResponse.data])
  //   }

  //   fetchBookings()
  // }, [])

  const handleShowCalendar = (catsitterId: number) => {
    const catsitter = catSitters.find((catsitter) => catsitter.id === catsitterId)
    if (!catsitter) {
      return toast.error('Houve um erro ao buscar os eventos.')
    }

    if (catsitter.events.length === 0 && catsitter.bookings.length > 0) {
      toast.error('Não foi possível mostrar a disponibilidade desse catsitter.')
      return
    }
    if (catsitter.bookings.length === 0) {
      toast.info('Este catsitter está com a agenda aberta.')
      return
    }
    setEventsToShow(catsitter.events)
  }

  return (
    <OwnerHomeContainer>
      <CardsList>
        {catSitters.map((catsitter, catsitterIndex) => (
          <SitterCard key={catsitter.id}>
            <Header>
              <InfoWrapper>
                <Name>{catsitter.name}</Name>
                <Address>{catsitter.address}</Address>
              </InfoWrapper>
              <IconButton title="Ver disponibilidade" onClick={() => handleShowCalendar(catsitter.id)}>
                <CalendarMonth color="action" />
              </IconButton>
            </Header>
            <Description>{catsitter.jobDesc}</Description>
            <Footer>
              <Price>R$ {catsitter.price.toFixed(2)}</Price>
              <Rating>
                {[...Array(catsitterIndex + 1)].map((_, index) => (
                  <Star width={20} height={20} key={index} />
                ))}
              </Rating>
            </Footer>
            {eventsToShow.length > 0 && <CalendarPopup events={eventsToShow} onClose={() => setEventsToShow([])} />}
            <Button
              variant="filled"
              fullWidth
              size="md"
              onClick={() => navigate(`${RouterPaths.CREATE_BOOKING}/${catsitter.id}`)}
            >
              Contratar
            </Button>
          </SitterCard>
        ))}
      </CardsList>
    </OwnerHomeContainer>
  )
}

export { OwnerHomeScreen }
