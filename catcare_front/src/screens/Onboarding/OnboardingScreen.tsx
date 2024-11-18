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
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '@/router/RouterPathsMapper'

type UserType = 'owner' | 'sitter'

function OnboardingScreen() {
  const navigate = useNavigate()

  const [userType, setUserType] = useState<UserType>(null)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (userType) setShowWarning(false)
  }, [userType])

  const handleChangeUserType = useCallback(
    (type: UserType) => {
      setUserType((prev) => (prev === type ? null : type))
    },
    [userType]
  )

  const handleNextStep = useCallback(() => {
    if (!userType) {
      setShowWarning(true)
      return
    }
    // TODO: salvar no backend se o usuário for catsitter
    if (userType === 'sitter') navigate(RouterPaths.SITTER_ONBOARDING)
    else navigate(RouterPaths.OWNER_ONBOARDING)
  }, [userType])

  return (
    <OnboardingContainer>
      <Header>
        <Title>Vamos completar o seu cadastro!</Title>
        <Subtitle>Preencha mais algumas informações sobre você para continuarmos</Subtitle>
      </Header>
      <Body>
        <Label>Você é catsitter também ou apenas tutor(a)?</Label>
        <TypeOptions>
          <SelectButton isActive={userType === 'owner'} onClick={() => handleChangeUserType('owner')}>
            Tutor(a)
          </SelectButton>
          <SelectButton isActive={userType === 'sitter'} onClick={() => handleChangeUserType('sitter')}>
            Catsitter
          </SelectButton>
        </TypeOptions>
        {showWarning && <WarningMessage>Escolha ao menos uma das opções acima</WarningMessage>}
      </Body>
      <Button variant="filled" fullWidth onClick={handleNextStep}>
        Continuar
      </Button>
    </OnboardingContainer>
  )
}

export { OnboardingScreen }
