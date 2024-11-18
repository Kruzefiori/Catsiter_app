import { AccordionDetails, AccordionSummary } from '@mui/material'
import styled from 'styled-components'

export const BookingScreenContainer = styled.div``

export const VisitsContainer = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const BookingDetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.neutralL3};
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  margin: 16px 0;
`

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.h1}
`

export const Subtitle = styled.h2`
  ${({ theme }) => theme.fonts.titleMD}
  color: ${({ theme }) => theme.colors.neutralL0};
`

export const BookingSubtitle = styled.h3`
  ${({ theme }) => theme.fonts.titleMD}
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
`

export const VisitSummary = styled(AccordionSummary)`
  ${({ theme }) => theme.fonts.titleXS}
  color: ${({ theme }) => theme.colors.secondary};
`

export const VisitItem = styled(AccordionDetails).attrs({
  sx: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px'
  }
})``

export const PeriodWrapper = styled.div`
  display: flex;
  gap: 4px;
  max-width: 100%;
`

export const Label = styled.label`
  ${({ theme }) => theme.fonts.labelMD}
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;

  input,
  textarea {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.neutralL1};

    &:focus {
      border-color: ${({ theme }) => theme.colors.neutralL0};
    }
  }

  textarea {
    min-height: 100px;
    resize: none;
  }
`
