import { getStateColor } from '@/utils/getStateColor'
import { Checkbox, Radio } from '@mui/joy'
import styled from 'styled-components'

export const CatOnboardingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
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

interface SelectButtonProps {
  isActive: boolean
}

export const SelectButton = styled.span<SelectButtonProps>`
  border: 1px solid transparent;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary : theme.colors.neutralL5)};
  color: ${({ theme }) => theme.colors.neutralL5};
  width: 200px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => getStateColor(theme.colors.secondary, 'hover')};
  }
`
