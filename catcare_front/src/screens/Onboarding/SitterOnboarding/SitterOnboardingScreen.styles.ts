import { TextField } from '@mui/material'
import styled from 'styled-components'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export const SitterOnboardingContainer = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  gap: 24px;
`

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

export const AddressItemGroup = styled.div`
  display: flex;
  gap: 16px;
`

export const Label = styled.label`
  ${({ theme }) => theme.fonts.textLG}
  color: ${({ theme }) => theme.colors.secondary};
`

export const WarningMessage = styled.p`
  ${({ theme }) => theme.fonts.textSM}
  color: ${({ theme }) => theme.colors.notification};
`

export const DescriptionField = styled(TextField).attrs(({}) => ({}))``

export const ErrorMessage = styled.p`
  ${({ theme }) => theme.fonts.textSM}
  color: ${({ theme }) => theme.colors.error};
`
