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
  border: 1px solid ${({ theme }) => theme.colors.neutralL1};
  border-radius: 8px;
  padding: 8px;
  height: 70px;
  /* Sombra interna */
  box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.6);
`
