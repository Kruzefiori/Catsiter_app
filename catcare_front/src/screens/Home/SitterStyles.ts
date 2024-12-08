import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import styled from 'styled-components'

export const SitterHomeContainer = styled.div`
  padding: 8px 4px;
  height: 100%;

  & > h1 {
    margin-bottom: 16px;
    text-align: center;
    ${({ theme }) => theme.fonts.titleLG}
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 70px;
  margin-bottom: 16px;
`
