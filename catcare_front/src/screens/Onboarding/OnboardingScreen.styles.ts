import { Radio } from '@mui/joy'
import styled from 'styled-components'

export const OnboardingContainer = styled.div`
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
`

export const InputLabel = styled.label`
  ${({ theme }) => theme.fonts.textLG}
  color: ${({ theme }) => theme.colors.secondary};
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
