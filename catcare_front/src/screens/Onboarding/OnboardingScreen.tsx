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
import catCareIcon from '@assets/cat-care.png'
import catOwnerIcon from '@assets/cat-owner.png'

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
      setUserType(type)
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
        <Label>Escolha a opção que melhor te define:</Label>
        <TypeOptions>
          <SelectButton
            isActive={userType === 'owner'}
            onClick={() => handleChangeUserType('owner')}
            buttonColor="#16b7e8"
          >
            <img src={catOwnerIcon} width={50} height={50} alt="Dono de gato" />
            Tutor(a)
          </SelectButton>
          <SelectButton
            isActive={userType === 'sitter'}
            onClick={() => handleChangeUserType('sitter')}
            buttonColor="#784ee1"
          >
            <img src={catCareIcon} width={50} height={50} alt="Catsitter" />
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
