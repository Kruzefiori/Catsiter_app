import styled from 'styled-components'

export const OwnerHomeContainer = styled.div`
  padding: 8px 4px;
`

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const SitterCard = styled.div`
  background-color: ${({ theme }) => theme.colors.neutralTertiary};
  border: 2px solid ${({ theme }) => theme.colors.neutralL2};
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px;
  border-radius: 8px;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const InfoWrapper = styled.span``

export const Name = styled.p`
  ${({ theme }) => theme.fonts.infoMD}
`

export const Address = styled.p`
  ${({ theme }) => theme.fonts.textSM}
`

export const Description = styled.div`
  height: 600px;
  width: 100%;
  min-height: 100px;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.neutralL4};
  border-radius: 8px;
  padding: 16px 8px;
  ${({ theme }) => theme.fonts.textSM}
`

export const Footer = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 6px;
`

export const Price = styled.p`
  ${({ theme }) => theme.fonts.infoMD}
`

export const Rating = styled.span``

export const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`
