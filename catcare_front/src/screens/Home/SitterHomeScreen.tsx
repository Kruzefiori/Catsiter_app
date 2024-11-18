import styled from 'styled-components'
import Star from '@assets/star.svg?react'
import { Button } from '@/components/Button/Button'

function SitterHomeScreen() {
  const cardInfo = [1, 2, 3, 4, 5]
  return (
    <SitterHomeContainer>
      <CardsList>
        {cardInfo.map((info) => (
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