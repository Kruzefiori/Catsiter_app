import styled from 'styled-components'
import Star from '@assets/star.svg?react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CatSitter } from '@/domain/models/CatSitter'
import { Booking } from '@/domain/models/Booking'
import { Button } from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'

function OwnerHomeScreen() {
  const navigate = useNavigate()
  const { getAuthTokenFromStorage, authState } = useContext(AuthContext)

  const [catSitters, setCatSitters] = useState<CatSitter[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  // useEffect(() => {
  //   const fetchCatSitters = async () => {
  //     const response = await axios.get<CatSitter[]>(
  //       `${import.meta.env.VITE_CATCARE_SERVER_URL}/catsitter/get-catsitters`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${getAuthTokenFromStorage()}`
  //         }
  //       }
  //     )

  //     if (response.status < 200 || response.status >= 300) {
  //       toast.error('Não foi possível buscar os catsitters.')
  //       return
  //     }

  //     setCatSitters(response.data)
  //   }

  //   fetchCatSitters()
  // }, [])

  useEffect(() => {
    const fetchBookings = async () => {
      const pendingBookingsResponse = await axios.get<Booking[]>(
        `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requester?userId=${
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
        toast.error('Não foi possível buscar os bookings.')
        return
      }

      const acceptedBookingsResponse = await axios.get<Booking[]>(
        `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requester?userId=${
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
        toast.error('Não foi possível buscar os bookings.')
        return
      }

      const rejectedBookingsResponse = await axios.get<Booking[]>(
        `${import.meta.env.VITE_CATCARE_SERVER_URL}/booking/get-bookings-requester?userId=${
          authState.user.id
        }&status=REJECTED`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthTokenFromStorage()}`
          }
        }
      )

      if (rejectedBookingsResponse.status < 200 || rejectedBookingsResponse.status >= 300) {
        toast.error('Não foi possível buscar os bookings.')
        return
      }

      setBookings([...pendingBookingsResponse.data, ...acceptedBookingsResponse.data, ...rejectedBookingsResponse.data])
    }

    fetchBookings()
  }, [])

  return (
    <OwnerHomeContainer>
      <Button variant="filled" fullWidth onClick={() => navigate(RouterPaths.CREATE_BOOKING)}>
        Criar um booking
      </Button>
      <CardsList>
        {catSitters.map((catsitter, catsitterIndex) => (
          <SitterCard key={catsitter.id}>
            <Header>
              <InfoWrapper>
                <Name>Nome Catsitter</Name>
                <Address>Localização abrev.</Address>
              </InfoWrapper>
              <button>Mais opções</button>
            </Header>
            <Description>Descrição</Description>
            <Footer>
              <Price>Preço</Price>
              <Rating>
                {[...Array(catsitterIndex)].map((_, index) => (
                  <Star width={20} height={20} key={index} />
                ))}
              </Rating>
            </Footer>
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

const Name = styled.p``

const Address = styled.p``

const Description = styled.div`
  height: 600px;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.neutralL4};
  border: 1px solid ${({ theme }) => theme.colors.neutralSecondary};
  border-radius: 8px;
  padding: 6px;
`

const Footer = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`

const Price = styled.p``

const Rating = styled.span``
