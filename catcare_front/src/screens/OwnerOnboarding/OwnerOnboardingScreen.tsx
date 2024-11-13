import { Form, Header, Label, OwnerOnboardingContainer, Subtitle, Title } from './OwnerOnboardingScreen.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useBehaviorSubject } from '@/hooks/useBehaviorSubject'
import { AuthState, AuthStateProps } from '@/states/AuthState'
import { useCallback } from 'react'
import { RouterPaths } from '@/router/RouterPathsMapper'
import { Button } from '@/components/Button/Button'

type OwnerSchema = z.infer<typeof ownerSchema>

const ownerSchema = z.object({
  jobDesc: z.string().min(1, 'Preencha esse campo')
})

function OwnerOnboardingScreen() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<OwnerSchema>({
    resolver: zodResolver(ownerSchema)
  })
  const navigate = useNavigate()

  const authState = useBehaviorSubject<AuthStateProps>(AuthState)

  const handleFinish = useCallback((data: OwnerSchema) => {
    console.log(data, authState.user.id)

    navigate(RouterPaths.HOME)
  }, [])
  return (
    <OwnerOnboardingContainer>
      <Header>
        <Title>Nos conte mais sobre você!</Title>
        <Subtitle>Precisamos de mais algumas informações para finalizarmos o seu cadastro</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit(handleFinish)}>
        <Button type="submit" variant="filled">
          Finalizar
        </Button>
      </Form>
    </OwnerOnboardingContainer>
  )
  Header
}

export { OwnerOnboardingScreen }
