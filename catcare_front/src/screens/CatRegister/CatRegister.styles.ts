import { Checkbox, Radio } from '@mui/joy'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import styled from 'styled-components'

export const CatRegisterContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 24px;
`

export const CatWrapper = styled(Accordion)`
  border: 1px solid ${({ theme }) => theme.colors.neutralL1};
  border-radius: 8px;
  width: 100%;
`

export const CatSummary = styled(AccordionSummary)`
  ${({ theme }) => theme.fonts.titleXS}
  color: ${({ theme }) => theme.colors.secondary};
  & > * {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const CatItem = styled(AccordionDetails).attrs({
  sx: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '8px 8px 16px 8px'
  }
})``

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  text-align: left;
`

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.h1}
`

export const Subtitle = styled.h2`
  ${({ theme }) => theme.fonts.titleMD}
  color: ${({ theme }) => theme.colors.neutralL0};
`

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`

export const InputGroup = styled.span`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;

  & > :first-child {
    flex: 2;
  }

  & > :last-child {
    flex: 1;
  }
`

export const PillGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
`

export const CheckboxPill = styled(Checkbox).attrs(({ theme }) => ({
  slotProps: {
    action: ({ checked }) => ({
      sx: checked
        ? {
            border: '1px solid',
            borderColor: 'transparent',
            borderRadius: 40,
            bgcolor: theme.colors.secondary,
            ':hover': { bgcolor: `${theme.colors.secondary}E9` }
          }
        : {
            border: '1px solid',
            borderColor: theme.colors.neutralL2,
            borderRadius: 40,
            ':hover': { bgcolor: `${theme.colors.neutralL4}E9` }
          }
    })
  }
}))`
  text-align: center;
  text-transform: capitalize;
  height: 30px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RadioButton = styled(Radio).attrs(({ theme }) => ({
  sx: {
    textAlign: 'center',
    borderRadius: 8
  },
  slotProps: {
    label: ({ checked }) => ({
      sx: { color: checked ? theme.colors.neutralL5 : theme.colors.secondary }
    }),
    action: ({ checked }) => ({
      sx: () => ({
        ...(checked
          ? {
              border: '1px solid',
              borderColor: 'transparent',
              borderRadius: 8,
              bgcolor: theme.colors.secondary,
              ':hover': { bgcolor: `${theme.colors.secondary}E9` }
            }
          : {
              border: '1px solid',
              borderColor: theme.colors.neutralL2,
              borderRadius: 8,
              ':hover': { bgcolor: `${theme.colors.neutralL4}E9` }
            })
      })
    })
  }
}))``

export const InputLabel = styled.label`
  ${({ theme }) => theme.fonts.textLG}
  color: ${({ theme }) => theme.colors.secondary};
`
