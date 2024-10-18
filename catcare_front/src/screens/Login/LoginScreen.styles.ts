import styled from 'styled-components'

export const LoginContainer = styled.div`
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

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const InputLabel = styled.label`
  ${({ theme }) => theme.fonts.textMD}
  width: 100%;
`

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutralL3};

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.neutralL1};
  }
`

export const InfoText = styled.p`
  ${({ theme }) => theme.fonts.textMD}
  color: ${({ theme }) => theme.colors.neutralSecondary};
`
