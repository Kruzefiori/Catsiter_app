import styled from 'styled-components'
import { Button } from '@/components/Button/Button'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '@/context'
import { toast } from 'react-toastify'

interface CatSitter {
  id: number
  name: string
  jobDesc: string
  price: number
}

function SitterHomeScreen() {
  const mockedCardInfo = [1, 2, 3, 4, 5]
  const { getAuthTokenFromStorage } = useContext(AuthContext)

  const [catSitters, setCatSitters] = useState<CatSitter[]>([])

  useEffect(() => {
    const fetchCatSitters = async () => {
      const response = await axios.get<CatSitter[]>(
        `${import.meta.env.VITE_CATCARE_SERVER_URL}/catsitter/get-catsitters`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthTokenFromStorage()}`
          }
        }
      )

      if (response.status < 200 || response.status >= 300) {
        toast.error('Não foi possível buscar os catsitters.')
        return
      }

      setCatSitters(response.data)
    }

    fetchCatSitters()
  }, [])

  return (
    <SitterHomeContainer>
      <CardsList>
        {mockedCardInfo.map((info) => (
          <Booking key={info}>
            <Header>
              <Name>Nome Catsitter</Name>
              <button>Mais opções</button>
            </Header>
            <CatDescription>Localização abrev.</CatDescription>
            <Price>Preço</Price>
            {[...Array(info)].map((_, index) => (
              <Visit key={index}>Do dia tal até o dia tal</Visit>
            ))}
            <Footer>
              <Button variant="filled" size="sm" fullWidth>
                Aceitar
              </Button>
              <Button variant="filled" size="sm" fullWidth>
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

const CatDescription = styled.p``
const Price = styled.p``
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
