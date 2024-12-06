import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import styled from 'styled-components'

export const SitterHomeContainer = styled.div`
  padding: 8px 4px;
`

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const BookingCard = styled.div`
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

export const Name = styled.p`
  ${({ theme }) => theme.fonts.textMD}
`

export const Notes = styled.p``
export const DateInfo = styled.p`
  ${({ theme }) => theme.fonts.titleSM}
  text-align: center;
`
export const Address = styled.p`
  ${({ theme }) => theme.fonts.textMD}
`
export const Visit = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL1};
  border-radius: 6px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Footer = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 6px;
  gap: 50px;
`

export const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:focus {
    outline: none;
  }
`

export const VisitWrapper = styled(Accordion)`
  border: 1px solid ${({ theme }) => theme.colors.neutralL1};
  border-radius: 8px;
`

export const VisitSummary = styled(AccordionSummary)`
  ${({ theme }) => theme.fonts.titleXS}
  color: ${({ theme }) => theme.colors.secondary};
  & > * {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const VisitItem = styled(AccordionDetails).attrs({
  sx: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '8px 8px 16px 8px'
  }
})``

export const Info = styled.p`
  ${({ theme }) => theme.fonts.textMD}
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Details = styled.div`
  width: 100%;
  min-height: 50px;
  height: auto;
  background-color: ${({ theme }) => theme.colors.neutralL4};
  border-radius: 6px;
  padding: 12px;
  ${({ theme }) => theme.fonts.textSM}

  i {
    color: ${({ theme }) => theme.colors.neutralL1};
  }
`
