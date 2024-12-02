import styled from 'styled-components'
import Star from '@assets/star.svg?react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CatSitter2 } from '@/domain/models/CatSitter'
import { Booking } from '@/domain/models/Booking'
import { Button } from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { mockedCatSitters } from './utils'
import { CalendarMonth } from '@mui/icons-material'
import { CalendarPopup, CalendarEvent } from '@/components/CalendarPopup'

function OwnerHomeScreen() {
  const navigate = useNavigate()
  const { getAuthTokenFromStorage, authState } = useContext(AuthContext)

  const [catSitters, setCatSitters] = useState<CatSitter2[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [eventsToShow, setEventsToShow] = useState<CalendarEvent[]>([])

  useEffect(() => {
    // const fetchCatSitters = async () => {
    //   const response = await axios.get<CatSitter[]>(
    //     `${import.meta.env.VITE_CATCARE_SERVER_URL}/catsitter/get-catsitters`,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${getAuthTokenFromStorage()}`
    //       }
    //     }
    //   )

    //   if (response.status < 200 || response.status >= 300) {
    //     toast.error('Não foi possível buscar os catsitters.')
    //     return
    //   }

    //   setCatSitters(response.data)
    // }

    // fetchCatSitters()

    // const catsitterBookings = bookings.filter((booking) => booking.requestedId === catsitterId)
    // const events: CatSitterCalendar['events'] = []

    // catsitterBookings.forEach((booking) => {
    //   booking.visits.forEach((visit) => {
    //     events.push({
    //       title: `Visita ${visit.id}`,
    //       start: new Date(visit.visitDate),
    //       end: new Date(visit.visitDate)
    //     })
    //   })
    // })
    // Do the same for each catsitter
    mockedCatSitters.forEach((catsitter) => {
      const events: CalendarEvent[] = []
      catsitter.bookings.forEach((booking) => {
        booking.visits.forEach((visit) => {
          events.push({
            title: `Visita ${visit.id}`,
            start: new Date(visit.visitDate),
            end: new Date(visit.visitDate)
          })
        })
      })
      setCatSitters((prev) => [...prev, { ...catsitter, events }])
    })

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

const OwnerHomeContainer = styled.div`
  padding: 8px 4px;
`

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SitterCard = styled.div`
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

const InfoWrapper = styled.span``

const Name = styled.p`
  ${({ theme }) => theme.fonts.infoMD}
`

const Address = styled.p`
  ${({ theme }) => theme.fonts.textSM}
`

const Description = styled.div`
  height: 600px;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.neutralL4};
  border-radius: 8px;
  padding: 6px;
  ${({ theme }) => theme.fonts.textMD}
`

const Footer = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`

const Price = styled.p`
  ${({ theme }) => theme.fonts.infoMD}
`

const Rating = styled.span``

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`
