import styled from 'styled-components'
import Star from '@assets/star.svg?react'

function OwnerHomeScreen() {
  const cardInfo = [1, 2, 3, 4, 5]
  return (
    <OwnerHomeContainer>
      <CardsList>
        {cardInfo.reverse().map((info) => (
          <SitterCard key={info}>
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
                {[...Array(info)].map((_, index) => (
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
