import { Button } from '@/components/Button/Button'
import {
  OnboardingContainer,
  Header,
  Title,
  Subtitle,
  Body,
  TypeOptions,
  Label,
  WarningMessage
} from './OnboardingScreen.styles'

import { SelectButton } from './OnboardingScreen.styles'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'

function OnboardingScreen() {
  const navigate = useNavigate()
  const [userType, setUserType] = useState<'owner' | 'sitter'>(null)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (userType !== null) setShowWarning(false)
  }, [userType])

  const handleNextStep = useCallback(() => {
    if (userType === 'owner') navigate(RouterPaths.CAT_ONBOARDING)
    else if (userType === 'sitter') navigate(RouterPaths.SITTER_ONBOARDING)
    else setShowWarning(true)
  }, [userType])

  return (
    <OnboardingContainer>
      <Header>
        <Title>Vamos completar o seu cadastro!</Title>
        <Subtitle>Preencha mais algumas informações sobre você para continuarmos</Subtitle>
      </Header>
      <Body>
        <Label>O que melhor descreve você?</Label>
        <TypeOptions>
          <SelectButton isActive={userType === 'owner'} onClick={() => setUserType('owner')}>
            Tutor(a)
          </SelectButton>
          <SelectButton isActive={userType === 'sitter'} onClick={() => setUserType('sitter')}>
            Catsitter
          </SelectButton>
        </TypeOptions>
        {showWarning && <WarningMessage>Escolha uma das opções acima</WarningMessage>}
      </Body>
      <Button variant="filled" onClick={handleNextStep}>
        Continuar
      </Button>
    </OnboardingContainer>
  )
}

export { OnboardingScreen }
