interface OnboardingScreenProps {}

function OnboardingScreen(props: OnboardingScreenProps) {
  const {} = props
  return (
    <OnboardingContainer>
      <Header>
        <Title>Vamos completar o seu cadastro!</Title>
        <Subtitle>Preencha mais algumas informaçẽs sobre você para continuarmos</Subtitle>
      </Header>
      <Body>
        <InputWrapper>
          <label htmlFor="name">Seu nome</label>
          <input type="text" placeholder="Como podemos te chamar?" />
        </InputWrapper>
        <InputWrapper>
          <p>Você é uma pessoa tutora, catsitter ou ambas?</p>
          <input type="checkbox" id="owner" name="userType" /> <label htmlFor="owner">Tutora</label>
          <input type="checkbox" id="sitter" name="userType" /> <label htmlFor="sitter">Catsitter</label>
        </InputWrapper>
        <Button type="submit" variant="filled">
          Entrar
        </Button>
      </Body>
    </OnboardingContainer>
  )
}

export { OnboardingScreen }

import { Button } from '@/components/Button/Button'
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

export const InputWrapper = styled.div`
  width: 100%;
  gap: 8px;
`
